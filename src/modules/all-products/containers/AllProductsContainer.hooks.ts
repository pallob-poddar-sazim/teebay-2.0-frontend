import { GET_ALL_PRODUCTS } from "@/shared/graphql/queries/products";
import { IProduct } from "@/shared/typedefs";
import { useQuery } from "@apollo/client";

export const useGetProducts = () => {
  const { data: productData } = useQuery(GET_ALL_PRODUCTS, {
    fetchPolicy: "network-only",
  });

  const products: IProduct[] = productData?.getAllProducts?.data || [];

  return {
    products,
  };
};
