import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/plaid.actions";
import { useRouter } from "next/navigation";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import Image from "next/image";

function PlaidLink({ user, variant }: PlaidLinkProps) {
  const [linkToken, setLinkToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = async () => {
      const linkTokenCreated = await createLinkToken(user);
      if (linkTokenCreated) {
        setLinkToken(linkTokenCreated);
      } else {
        throw Error("Link token creation failed");
      }
    };
    token();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken(public_token, user);
      router.push("/");
    },
    [user]
  );

  const plaidPreConfig: PlaidLinkOptions = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(plaidPreConfig);
  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={() => open()}
          variant="ghost"
          className="plaidlink-ghost"
        >
          <Image
            src="/icons/connect-bank.svg"
            height={24}
            width={24}
            alt="connect bank"
          />
          <p className="hidden xl:block text-[16px] font-semibold text-black-2">Connect Bank</p>
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidlink-default">
          <Image
            src="/icons/connect-bank.svg"
            height={24}
            width={24}
            alt="connect bank"
          />
          <p className="text-[16px] font-semibold text-black-2">Connect Bank</p>
        </Button>
      )}
    </>
  );
}

export default PlaidLink;
