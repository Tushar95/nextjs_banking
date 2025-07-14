"use server";

import { plaidClient } from "@/lib/plaidClient";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { encryptId, parseStringify } from "../utils";
import { addFundingSource } from "./dwolla.actions";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "../server/appwrite";
import { ID } from "node-appwrite";
import { createBankAccount } from "./user.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export async function createLinkToken(user: User) {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: user.$id },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth", "transactions"] as Products[],
      country_codes: ["US"] as CountryCode[],
      language: "en",
    });
    if (response) {
      return parseStringify(response?.data?.link_token);
    }
  } catch (error) {
    console.error("Link Token Error:", error);
  }
}

export async function exchangePublicToken(public_token: string, user: User) {
  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    if (tokenResponse) {

      const access_token = parseStringify(tokenResponse?.data?.access_token);
      const itemId = parseStringify(tokenResponse.data.item_id);
      // Get account information from plaid
      const accountsResponse = await plaidClient.accountsGet({ access_token });
      const accounts = accountsResponse.data.accounts;
      // Select the first eligible account (can be filtered by subtype if needed)
      const selectedAccount = accounts[0];

      const processorTokenRequest: ProcessorTokenCreateRequest = {
        access_token: access_token,
        account_id: selectedAccount.account_id,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      };

      // Create a processor token
      const response = await plaidClient.processorTokenCreate(
        processorTokenRequest
      );
      const processor_token = response.data.processor_token;

      // Create a funcding source URL for the account using the Dwolla customer ID,
      // processor Token, and bank name
      const fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken: processor_token,
        bankName: selectedAccount.name,
      });

      if (!fundingSourceUrl) throw Error;

      console.log('FundingSource url created:', fundingSourceUrl);
      // Create a bank account using the userID, itemID, accountID, access token, funding source URL, and sharable ID
      await createBankAccount({
        userId: user.userId,
        bankId: itemId,
        accountId: selectedAccount.account_id,
        accessToken: access_token,
        fundingSourceUrl,
        shareableId: encryptId(selectedAccount.account_id),
      });

      revalidatePath("/");

      return parseStringify({
        publicTokenExchange: "complete",
      });
    }
  } catch (error) {
    console.error("Exchange Token Error:", error);
  }
}
