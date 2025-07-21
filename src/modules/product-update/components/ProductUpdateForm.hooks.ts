import { IProduct, TApiResponse } from "@/shared/typedefs";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { TProductUpdateFormFields } from "./ProductUpdateForm.types";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { UPDATE_PRODUCT } from "@/shared/graphql/mutations/products";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getProductUpdateFormInitialValues } from "./ProductUpdateForm.helpers";

export const useProductUpdateForm = (product: IProduct) => {
  const router = useRouter();
  const { data: user } = useQuery(GET_LOCAL_USER);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const form = useForm({
    defaultValues: getProductUpdateFormInitialValues(product),
  });
  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  const handleResponse = (data: TApiResponse<IProduct>) => {
    if (data.success) {
      router.push("/dashboard");
    } else {
      toast.error(data.message, { theme: "colored" });
    }
  };

  const handlerOnSubmit = async (values: TProductUpdateFormFields) => {
    try {
      const variables = {
        id: product?.id,
        ...values,
        sellerId: user?.localUser.id,
      };

      const { data } = await updateProduct({
        variables: variables,
        fetchPolicy: "network-only",
      });

      handleResponse(data.updateProduct);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handlerOnSubmit),
  };
};
