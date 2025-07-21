import { CREATE_RENTAL } from "@/shared/graphql/mutations/rental";
import { useMutation } from "@apollo/client";
import { TPurchaseCreationFields, TRentalCreationFields } from "./ProductDetailsContainer.types";
import { CREATE_PURCHASE } from "@/shared/graphql/mutations/purchase";
import { handleResponse } from "./ProductDetailsContainer.helpers";

export const useCreateRental = () => {
  const [createRental] = useMutation(CREATE_RENTAL);

  const onCreateRental = async (values: TRentalCreationFields) => {
    try {
      const { data } = await createRental({
        variables: values,
      });

      handleResponse(data.createRental);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return { onCreateRental };
};

export const useCreatePurchase = () => {
  const [createPurchase] = useMutation(CREATE_PURCHASE);

  const onCreatePurchase = async (values: TPurchaseCreationFields) => {
    const { data } = await createPurchase({
      variables: values,
    });

    handleResponse(data.createPurchase);
  };

  return {
    onCreatePurchase,
  };
};
