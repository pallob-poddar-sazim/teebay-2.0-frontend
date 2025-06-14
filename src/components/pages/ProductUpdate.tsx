import { useQuery } from "@apollo/client";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/products";
import ProductUpdateLayout from "../templates/ProductUpdateLayout";

const ProductUpdate = () => {
  const { data } = useQuery(GET_SELECTED_PRODUCT);

  return <ProductUpdateLayout product={data?.selectedProduct} />;
};

export default ProductUpdate;
