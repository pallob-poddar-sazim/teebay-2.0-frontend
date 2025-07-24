"use client";

import IProduct from "@/interfaces/IProduct";
import Card from "../organisms/Card";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "@/graphql/queries/products";
import { useApolloClient } from "@apollo/client";
import IPurchase from "@/interfaces/IPurchase";
import IRental from "@/interfaces/IRental";
import { GET_SELECTED_PRODUCT } from "@/graphql/queries/products";
import { useRouter } from "next/navigation";

const AllProducts = () => {
  const { data: productData } = useQuery(GET_ALL_PRODUCTS, {
    fetchPolicy: "network-only",
  });
  const client = useApolloClient();
  const router = useRouter();

  const products: IProduct[] = productData?.getAllProducts?.data || [];

  const handleCardClick = (product: IProduct | IPurchase | IRental) => {
    client.writeQuery({
      query: GET_SELECTED_PRODUCT,
      data: { selectedProduct: product },
    });

    router.push(`/products/${product.id}`);
  };

  return (
    <>
      <div className="mx-auto max-w-4/5 md:max-w-3/5">
        <h1 className="text-3xl text-jet-black text-center m-8">
          ALL PRODUCTS
        </h1>
        <div className="flex flex-col gap-6">
          {products.map((product: IProduct) => (
            <Card
              key={product.id}
              product={product}
              onCardClick={(product: IProduct) => handleCardClick(product)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
