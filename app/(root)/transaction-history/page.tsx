import HeaderBox from "@/components/HeaderBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import React from "react";
import { formatAmount } from "@/lib/utils";
import TransactionTable from "@/components/TransactionTable";
import { Pagination } from "@/components/Pagination";

async function TransactionHistory({
  searchParams,
}: SearchParamProps) {
  const { id, page } = (await searchParams);
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });
  if (!accounts) return;

  const accountData = accounts?.data[0];
  const appwriteItemId = (id as string) || accountData?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });
  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
  const indexOfLastTransaction = currentPage * rowsPerPage;
  // const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransaction = account?.transactions.slice(
    indexOfLastTransaction - rowsPerPage,
    indexOfLastTransaction
  );
  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions"
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionTable transactions={currentTransaction} />
          {totalPages > 1 && (<div className="my-4 w-full"><Pagination totalPages={totalPages} page={currentPage} /></div>)}
        </section>
      </div>
    </div>
  );
}

export default TransactionHistory;
