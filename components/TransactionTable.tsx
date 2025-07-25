import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import Image from "next/image";
import { transactionCategoryStyles } from "@/constants";

function TransactionTable({ transactions }: TransactionTableProps) {
  const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
      transactionCategoryStyles[
        category as keyof typeof transactionCategoryStyles
      ] || transactionCategoryStyles.default;
    return (
      <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
        <div className={cn("size-2 rounded-full", backgroundColor)} />
        <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
      </div>
    );
  };
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-black-2 text-slate-100">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const status = getTransactionStatus(new Date(transaction.date));
          const amount = formatAmount(transaction.amount);
          const isDebit = transaction.type === "debit";
          const isCredit = transaction.type === "credit";
          return (
            <TableRow
              key={transaction.id}
              className={`${
                isDebit || amount[0] == "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"
              } !hover:bg-none !border-b-DEFAULT`}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  {transaction.image && <Image
                    src={transaction.image}
                    width={36}
                    height={36}
                    alt="merchantLogo"
                    className="rounded-full"
                  />}
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(transaction.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={`${
                  isDebit || amount[0] === "-"
                    ? "text-[#f04438]"
                    : "text-[#039855]"
                } pl-2 pr-10 font-semibold`}
              >
                <div>
                  <h1>{isDebit ? `-${amount}` : amount}</h1>
                </div>
              </TableCell>
              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className="min-w-[32] pl-2 pr-10">
                {formatDateTime(new Date(transaction.date)).dateTime}
              </TableCell>
              <TableCell className="min-w-[24] pl-2 pr-10">
                {transaction.paymentChannel}
              </TableCell>
              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadge category={transaction.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default TransactionTable;
