import { useMutation } from "@apollo/client";
import { SIGN_UP } from "@/shared/graphql/mutations/users";
import { IUser } from "@/shared/typedefs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TSignupFormFields } from "./SignupForm.types";
import { signupFormInitialValues } from "./SignupForm.helpers";
import { TApiResponse } from "@/shared/typedefs";

export const useSignupForm = () => {
  const form = useForm({
    mode: "onChange",
    defaultValues: signupFormInitialValues,
  });
  const [signUp] = useMutation(SIGN_UP);
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/signin");
  }, [router]);

  const handleResponse = (data: TApiResponse<IUser>) => {
    if (data.success) {
      router.push("/signin");
    } else {
      toast.error(data.message, { theme: "colored" });
    }
  };

  const handlerOnSubmit = async (values: TSignupFormFields) => {
    try {
      const { firstName, lastName, ...rest } = values;
      const formattedValues = {
        ...rest,
        name: `${firstName} ${lastName}`,
      };

      const { data } = await signUp({ variables: formattedValues });

      handleResponse(data.signUp);
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handlerOnSubmit),
  };
};
