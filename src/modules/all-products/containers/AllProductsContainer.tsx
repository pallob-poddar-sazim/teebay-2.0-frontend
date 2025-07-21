"use client";

import { IProduct } from "@/shared/typedefs";
import Card from "@/shared/components/Card";
import { useRouter } from "next/navigation";
import { useSelectApolloClientProduct } from "@/shared/hooks/useSelectApolloClientProduct";
import { useGetProducts } from "../hooks";

const AllProductsContainer = () => {
  const { products } = useGetProducts();
  const { selectApolloClientProduct } = useSelectApolloClientProduct();
  const router = useRouter();

  const handleCardClick = (product: IProduct) => {
    selectApolloClientProduct(product);
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="mx-auto max-w-4/5 md:max-w-3/5">
      <h1 className="text-3xl text-jet-black text-center m-8">ALL PRODUCTS</h1>
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsContainer;
