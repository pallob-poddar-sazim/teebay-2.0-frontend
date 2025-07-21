"use client";

import ProductDetailsSection from "../components";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SELECTED_PRODUCT } from "@/shared/graphql/queries/products";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { GET_MESSAGES } from "@/shared/graphql/queries/messages";
import { toast } from "react-toastify";
import Modal from "@/shared/components/Modal";
import Chat from "@/shared/components/Chat";
import { Button } from "@/shared/components/shadui/button";
import { useCreatePurchase, useCreateRental } from "./ProductDetailsContainer.hooks";

const ProductDetailsContainer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { data: productData } = useQuery(GET_SELECTED_PRODUCT);
  const [modalVariant, setModalVariant] = useState<"buy" | "rent" | null>(null);
  const { data: user } = useQuery(GET_LOCAL_USER);
  const [isMessageButtonOpen] = useState(
    user.localUser?.id !== productData.selectedProduct.seller.id,
  );
  const { data: messages } = useQuery(GET_MESSAGES, {
    variables: {
      participantIds: [user.localUser?.id, productData.selectedProduct.seller.id],
    },
  });
  const { onCreateRental } = useCreateRental();
  const { onCreatePurchase } = useCreatePurchase();

  const handleConfirm = async (rentStartDate?: Date, rentEndDate?: Date) => {
    try {
      if (modalVariant === "rent") {
        if (rentStartDate && rentEndDate) {
          await onCreateRental({
            productId: productData.selectedProduct.id,
            borrowerId: user.localUser.id,
            rentStartDate,
            rentEndDate,
          });
        } else {
          toast.error("Please provide both start and end dates for rental.", { theme: "colored" });
        }
      } else if (modalVariant === "buy") {
        await onCreatePurchase({
          productId: productData.selectedProduct.id,
          buyerId: user.localUser.id,
        });
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
    setModalVariant(null);
  };

  return (
    <>
      {isChatOpen && (
        <Chat
          chatPartner={productData.selectedProduct.seller}
          messages={messages?.getMessages.data}
          onClose={() => setIsChatOpen(false)}
        />
      )}
      {modalVariant && (
        <Modal
          variant={modalVariant}
          onConfirm={handleConfirm}
          onClose={() => setModalVariant(null)}
        />
      )}
      <div className="max-w-4/5 mx-auto my-20">
        <ProductDetailsSection product={productData?.selectedProduct} />
        <div className="flex justify-end gap-6 mt-10">
          {isMessageButtonOpen && (
            <Button onClick={() => setIsChatOpen(!isChatOpen)}>Message</Button>
          )}
          <Button onClick={() => setModalVariant("rent")}>Rent</Button>
          <Button onClick={() => setModalVariant("buy")}>Buy</Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsContainer;
