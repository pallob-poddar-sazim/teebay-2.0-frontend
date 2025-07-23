"use client";

import { IProduct } from "@/shared/typedefs";
import Card from "@/shared/components/Card";
import { useState } from "react";
import Modal from "@/shared/components/Modal/Modal";
import { useDeleteProduct, useGetProductsBySeller } from "./ProductsBySellerContainer.hooks";
import { UUID } from "crypto";
import { useSelectApolloClientProduct } from "@/shared/hooks/useSelectApolloClientProduct";
import { useRouter } from "next/navigation";

const ProductsBySellerContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<UUID>();
  const { products } = useGetProductsBySeller();
  const { onConfirm } = useDeleteProduct(deleteProductId);
  const { selectApolloClientProduct } = useSelectApolloClientProduct();
  const router = useRouter();

  const handleConfirm = async () => {
    await onConfirm();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: UUID) => {
    setDeleteProductId(id);
    setIsModalOpen(true);
  };

  const handleCardClick = (product: IProduct) => {
    selectApolloClientProduct(product);
    router.push(`/products/${product.id}/update`);
  };

  return (
    <>
      {isModalOpen && (
        <Modal variant="delete" onConfirm={handleConfirm} onClose={() => setIsModalOpen(false)} />
      )}
      <div className="mx-auto max-w-4/5 md:max-w-3/5">
        <h1 className="text-3xl text-jet-black text-center m-8">MY PRODUCTS</h1>
        <div className="flex flex-col gap-6">
          {products.map((product: IProduct) => (
            <Card
              key={product.id}
              product={product}
              onDelete={() => handleDelete(product.id)}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsBySellerContainer;
