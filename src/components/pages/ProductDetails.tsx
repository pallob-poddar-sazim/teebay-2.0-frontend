import { useState } from "react";
import ProductDetailsLayout from "../templates/ProductDetailsLayout";
import { toast } from "react-toastify";
import Modal from "../organisms/Modal";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/products";
import { CREATE_RENTAL } from "../../graphql/mutations/rental";
import { GET_LOCAL_USER } from "../../graphql/queries/users";
import { CREATE_PURCHASE } from "../../graphql/mutations/purchase";

const ProductDetails = () => {
  const { data: productData } = useQuery(GET_SELECTED_PRODUCT);
  const [modalVariant, setModalVariant] = useState<"buy" | "rent" | null>(null);
  const [createRental, { error: rentalError }] = useMutation(CREATE_RENTAL);
  const [createPurchase, { error: purchaseError }] =
    useMutation(CREATE_PURCHASE);
  const { data: user } = useQuery(GET_LOCAL_USER);

  if (rentalError) {
    toast.error(rentalError.message);
  }

  if (purchaseError) {
    toast.error(purchaseError.message);
  }

  const handleConfirm = async (rentStartDate?: Date, rentEndDate?: Date) => {
    try {
      if (modalVariant === "rent") {
        const { data } = await createRental({
          variables: {
            productId: productData.selectedProduct.id,
            borrowerId: user.localUser.id,
            rentStartDate: rentStartDate,
            rentEndDate: rentEndDate,
          },
        });
        if (data.createRental.success) {
          toast.success(data.createRental.message, { theme: "colored" });
        } else {
          toast.error(data.createRental.message, { theme: "colored" });
        }
      } else if (modalVariant === "buy") {
        const { data } = await createPurchase({
          variables: {
            productId: productData.selectedProduct.id,
            buyerId: user.localUser.id,
          },
        });
        if (data.createPurchase.success) {
          toast.success(data.createPurchase.message, { theme: "colored" });
        } else {
          toast.error(data.createPurchase.message, { theme: "colored" });
        }
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
    setModalVariant(null);
  };

  const handleClose = () => {
    setModalVariant(null);
  };

  const handleRent = async () => {
    setModalVariant("rent");
  };

  const handleBuy = async () => {
    setModalVariant("buy");
  };

  return (
    <>
      {modalVariant && (
        <Modal
          variant={modalVariant}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      )}
      <ProductDetailsLayout
        product={productData?.selectedProduct}
        handleRent={handleRent}
        handleBuy={handleBuy}
      />
    </>
  );
};

export default ProductDetails;
