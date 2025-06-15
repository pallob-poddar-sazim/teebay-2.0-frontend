"use client";

import { Controller, useForm } from "react-hook-form";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { SIGN_IN } from "@/graphql/mutations/users";
import { useMutation } from "@apollo/client";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import IUser from "@/interfaces/IUser";
import { GET_LOCAL_USER } from "@/graphql/queries/users";
import client from "@/lib/apollo/apolloClient";
import { useRouter } from "next/navigation";

interface ISigninResponse {
  success: boolean;
  message: string;
  data: IUser;
}

const SigninForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signIn, { loading, error }] = useMutation(SIGN_IN);
  const router = useRouter();

  if (error) {
    toast.error(error.message);
  }

  const handleResponse = (data: ISigninResponse) => {
    if (data.success) {
      client.writeQuery({
        query: GET_LOCAL_USER,
        data: { localUser: data.data },
      });
      router.push(`/users/${data.data.id}/products`);
    } else {
      toast.error(data.message, { theme: "colored" });
    }
  };

  const handlerOnSubmit = async () => {
    const formData = {
      email: getValues("email"),
      password: getValues("password"),
    };

    try {
      const { data } = await signIn({ variables: formData });

      handleResponse(data.signIn);
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return (
    <form
      className="flex flex-col gap-5 my-5"
      onSubmit={handleSubmit(handlerOnSubmit)}
    >
      <div>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            maxLength: {
              value: 320,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <Input
              type="email"
              placeholder="Email"
              autocomplete="on"
              field={field}
              error={errors.email && true}
            />
          )}
        />
        {errors.email && (
          <p className="text-sm text-red-500 my-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            maxLength: {
              value: 20,
              message: "Character limit exceeded",
            },
          }}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Password"
              autocomplete="on"
              field={field}
              error={errors.password && true}
            />
          )}
        />
        {errors.password && (
          <p className="text-sm text-red-500 my-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" variant="button-primary">
        {loading ? <BeatLoader color="white" size={8} /> : "SIGN IN"}
      </Button>
    </form>
  );
};

export default SigninForm;
