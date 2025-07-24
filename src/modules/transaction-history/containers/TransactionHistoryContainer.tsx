"use client";

import Card from "@/shared/components/Card";
import { useTransactionHistory } from "./TransactionHistoryContainer.hooks";

const TransactionHistoryContainer = () => {
  const { products } = useTransactionHistory();

  return (
    <div className="mx-auto max-w-4/5 md:max-w-3/5">
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TransactionHistoryContainer;
