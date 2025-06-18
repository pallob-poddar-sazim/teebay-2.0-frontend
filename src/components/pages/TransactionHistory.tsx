import { useSearchParams } from "react-router-dom";
import Button from "../atoms/Button";
import CardList from "../templates/ProductsBySeller";
import { useQuery } from "@apollo/client";
import { GET_PURCHASES_BY_USER_ID } from "../../graphql/queries/purchases";
import { GET_RENTALS_BY_USER_ID } from "../../graphql/queries/rentals";
import IPurchase from "../../interfaces/Ipurchase";
import { GET_LOCAL_USER } from "../../graphql/queries/users";
import IRental from "../../interfaces/IRental";

const TransactionHistory = () => {
  const { data: user } = useQuery(GET_LOCAL_USER);
  const { data: purchaseData } = useQuery(GET_PURCHASES_BY_USER_ID, {
    variables: { userId: user?.localUser.id },
    skip: !user?.localUser.id,
  });
  const { data: rentalData } = useQuery(GET_RENTALS_BY_USER_ID, {
    variables: { userId: user?.localUser.id },
  });
  const [searchParams, setSearchParams] = useSearchParams();

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

  const activeTab = searchParams.get("tab") || "bought";

  return (
    <div>
      <div className="flex justify-around pt-4">
        {["bought", "sold", "borrowed", "lent"].map((tab) => (
          <Button
            key={tab}
            text={tab.charAt(0).toUpperCase() + tab.slice(1)}
            className={
              activeTab === tab
                ? "border-b-4 border-purple w-1/10"
                : "cursor-pointer w-1/10"
            }
            onClick={() => setSearchParams({ tab })}
          />
        ))}
      </div>

      <div className="mt-20">
        {activeTab === "bought" && <CardList products={boughtProducts} />}
        {activeTab === "sold" && <CardList products={soldProducts} />}
        {activeTab === "borrowed" && <CardList products={borrowedProducts} />}
        {activeTab === "lent" && <CardList products={lentProducts} />}
      </div>
    </div>
  );
};

export default TransactionHistory;
