import { useForm } from "react-hook-form";
import { signinFormInitialValues } from "./SigninForm.helpers";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "@/shared/graphql/mutations/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IUser, TApiResponse } from "@/shared/typedefs";
import client from "@/lib/apollo/apolloClient";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { toast } from "react-toastify";
import { TSigninFormFields } from "./SigninForm.types";

export const useSigninForm = () => {
  const form = useForm({
    mode: "onChange",
    defaultValues: signinFormInitialValues,
  });
  const [signIn] = useMutation(SIGN_IN);
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  const handleResponse = (data: TApiResponse<IUser>) => {
    if (data.success) {
      client.writeQuery({
        query: GET_LOCAL_USER,
        data: { localUser: data.data },
      });
      router.push(`/dashboard`);
    } else {
      toast.error(data.message, { theme: "colored" });
    }
  };

  const handlerOnSubmit = async (values: TSigninFormFields) => {
    try {
      const { data } = await signIn({ variables: values });

      handleResponse(data.signIn);
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handlerOnSubmit),
  };
};
