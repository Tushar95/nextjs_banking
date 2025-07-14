import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

async function PaymentTransfer() {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.userId,
  });
  if (!accounts) return;

  const accountData = accounts?.data;
  return (
    <>
    {/* <div>Page</div> */}
    <section className="payment-transfer">
      Page
      <PaymentTransferForm accounts={accountData} />
    </section>
    </>
  );
}

export default PaymentTransfer;
