import { GET_SELECTED_PRODUCT } from "@/shared/graphql/queries/products";
import { IProduct } from "@/shared/typedefs";
import { useApolloClient } from "@apollo/client";

export const useSelectApolloClientProduct = () => {
  const client = useApolloClient();

  const selectApolloClientProduct = (product: IProduct) => {
    client.writeQuery({
      query: GET_SELECTED_PRODUCT,
      data: { selectedProduct: product },
    });
  };

  return { selectApolloClientProduct };
};
