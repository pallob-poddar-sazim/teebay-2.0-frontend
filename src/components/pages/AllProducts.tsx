import IProduct from "../../interfaces/IProduct";
import CardList from "../templates/CardList";
import { GET_ALL_PRODUCTS } from "../../graphql/queries/products";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/products";
import { useNavigate } from "react-router-dom";
import IPurchase from "../../interfaces/Ipurchase";
import IRental from "../../interfaces/IRental";

const AllProducts = () => {
  const { data: productData } = useQuery(GET_ALL_PRODUCTS, {
    fetchPolicy: "network-only",
  });
  const products: IProduct[] = productData?.getAllProducts?.data || [];

  const client = useApolloClient();
  const navigate = useNavigate();

  const handleCardClick = (product: IProduct | IPurchase | IRental) => {
    client.writeQuery({
      query: GET_SELECTED_PRODUCT,
      data: { selectedProduct: product },
    });

    navigate(`/products/${product.id}`);
  };

  return (
    <CardList
      title="ALL PRODUCTS"
      products={products}
      onCardClick={handleCardClick}
    />
  );
};

export default AllProducts;
