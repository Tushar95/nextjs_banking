import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionTable from "./TransactionTable";
import { Pagination } from "./Pagination";

function RecentTransactions({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  // const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransaction = transactions.slice(
    indexOfLastTransaction - rowsPerPage,
    indexOfLastTransaction
  );
  return (
    <section className="recent-transactions">
      <header className="flex-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View All
        </Link>
      </header>

      <Tabs defaultValue={accounts[0].appwriteItemId} className="w-full">
        <TabsList>
          {accounts.map((account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account: Account) => (
          <TabsContent
            key={account.id}
            value={account.appwriteItemId}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />

            <TransactionTable transactions={currentTransaction} />

            {totalPages > 1 && (<div className="my-4 w-full"><Pagination totalPages={totalPages} page={page} /></div>)}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export default RecentTransactions;
