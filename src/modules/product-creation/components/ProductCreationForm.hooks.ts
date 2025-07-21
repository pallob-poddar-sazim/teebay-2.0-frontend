import { useForm } from "react-hook-form";
import { productCreationFormInitialValues } from "./ProductCreationForm.helpers";
import { TProductCreationFormFields } from "./ProductCreationForm.types";
import { useMutation, useQuery } from "@apollo/client";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { CREATE_PRODUCT } from "@/shared/graphql/mutations/products";
import { IProduct, TApiResponse } from "@/shared/typedefs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useProductCreationForm = () => {
  const form = useForm({
    defaultValues: productCreationFormInitialValues,
  });
  const { data: user } = useQuery(GET_LOCAL_USER);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const router = useRouter();

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

  const handlerOnSubmit = async (values: TProductCreationFormFields) => {
    try {
      const variables = {
        ...values,
        sellerId: user?.localUser.id,
      };

      const { data } = await createProduct({ variables: variables });
      handleResponse(data.createProduct);
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handlerOnSubmit),
  };
};
