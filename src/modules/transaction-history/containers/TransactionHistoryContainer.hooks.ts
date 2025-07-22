import { useTab } from "@/shared/components/Tab/Tab.hooks";
import { GET_PURCHASES_BY_USER_ID } from "@/shared/graphql/queries/purchases";
import { GET_RENTALS_BY_USER_ID } from "@/shared/graphql/queries/rentals";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { IPurchase, IRental } from "@/shared/typedefs";
import { useQuery } from "@apollo/client";
<<<<<<< HEAD:src/components/templates/TransactionHistory.tsx
import { GET_PURCHASES_BY_USER_ID } from "@/graphql/queries/purchases";
import { GET_RENTALS_BY_USER_ID } from "@/graphql/queries/rentals";
import IPurchase from "@/interfaces/IPurchase";
import { GET_LOCAL_USER } from "@/graphql/queries/users";
import IRental from "@/interfaces/IRental";
import { useSearchParams } from "next/navigation";

const TransactionHistory = () => {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "bought";
=======
>>>>>>> refactor/bulk-creation:src/modules/transaction-history/containers/TransactionHistoryContainer.hooks.ts

export const useTransactionHistory = () => {
  const { activeTab } = useTab();
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

  return { products };
};
