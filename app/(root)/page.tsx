import RightSideBar from "@/components/RightSideBar";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";

async function Dashboard({ searchParams }: SearchParamProps) {
  const { id, page } = (await searchParams);
  console.log("Id received:", id);
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  console.log("LoggedIn user:", loggedIn);
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });
  if (!accounts) return;
  console.log("Accounts received", accounts);
  const accountData = accounts?.data[0];
  console.log("AccountData received:", accountData);
  const appwriteItemId = (id as string) || accountData?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and merge your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accounts?.data}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accounts?.data?.slice(0, 2)}
      />
    </section>
  );
}

export default Dashboard;
