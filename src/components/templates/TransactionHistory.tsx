"use client";

import IProduct from "@/interfaces/IProduct";
import Card from "../organisms/Card";
import { useQuery } from "@apollo/client";
import { GET_PURCHASES_BY_USER_ID } from "@/graphql/queries/purchases";
import { GET_RENTALS_BY_USER_ID } from "@/graphql/queries/rentals";
import IPurchase from "@/interfaces/IPurchase";
import { GET_LOCAL_USER } from "@/graphql/queries/users";
import IRental from "@/interfaces/IRental";
import { useSearchParams } from "next/navigation";

const TransactionHistory = () => {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "bought";

  const { data: user } = useQuery(GET_LOCAL_USER);
  const { data: purchaseData } = useQuery(GET_PURCHASES_BY_USER_ID, {
    variables: { userId: user?.localUser.id },
    skip: !user?.localUser.id,
  });
  const { data: rentalData } = useQuery(GET_RENTALS_BY_USER_ID, {
    variables: { userId: user?.localUser.id },
  });

  const purchases: IPurchase[] = purchaseData?.getPurchasesByUserId?.data || [];
  const rentals: IRental[] = rentalData?.getRentalsByUserId?.data || [];

  const boughtProducts = purchases
    .filter((purchase) => purchase.buyer.id === user.localUser.id)
    .map((purchase) => purchase.product);
  const soldProducts = purchases
    .filter((purchase) => purchase.product.seller.id === user.localUser.id)
    .map((purchase) => purchase.product);
  const borrowedProducts = rentals
    .filter((rental) => rental.borrower.id === user.localUser.id)
    .map((rental) => rental.product);
  const lentProducts = rentals
    .filter((rental) => rental.product.seller.id === user.localUser.id)
    .map((rental) => rental.product);

  const products =
    activeTab === "bought"
      ? boughtProducts
      : activeTab === "sold"
      ? soldProducts
      : activeTab === "borrowed"
      ? borrowedProducts
      : lentProducts;

  return (
    <>
      <div className="mx-auto max-w-4/5 md:max-w-3/5">
        <div className="flex flex-col gap-6">
          {products.map((product: IProduct) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
