"use client";
import React from "react";
import Countup from "react-countup";

function CountupWrapper({ amount }: { amount: number }) {
  return (
    <Countup duration={2.75} decimals={2} decimal="," prefix="$" end={amount} />
  );
}

export default CountupWrapper;
