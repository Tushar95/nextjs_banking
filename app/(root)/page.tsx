import RightSideBar from "@/components/RightSideBar";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

function Dashboard() {
  const loggedIn = {
    firstName: "Tushar",
    lastName: "Coder",
    email: 'tushar@gmail.com'
  };
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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.3}
          />
        </header>
        RECENT Transactions

      </div>
      <RightSideBar 
      user={loggedIn}
      transactions={[]}
      banks={[{},{}]}
      />
    </section>
  );
}

export default Dashboard;
