"use client";

import { Controller } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { Input } from "@/shared/components/shadui/input";
import { Button } from "@/shared/components/shadui/button";
import { useSigninForm } from "./SigninForm.hooks";

const SigninForm = () => {
  const { form, onSubmit } = useSigninForm();
  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <form className="flex flex-col gap-5 my-5" onSubmit={onSubmit}>
      <div>
        <Controller
          name="email"
          control={form.control}
          rules={{
            required: "Email is required",
            maxLength: {
              value: 320,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <Input type="email" placeholder="Email" autoComplete="on" {...field} />
          )}
        />
        {errors.email && <p className="text-sm text-red-500 my-1">{errors.email.message}</p>}
      </div>

      <div>
        <Controller
          name="password"
          control={form.control}
          rules={{
            required: "Password is required",
            maxLength: {
              value: 20,
              message: "Character limit exceeded",
            },
          }}
          render={({ field }) => (
            <Input type="password" placeholder="Password" autoComplete="on" {...field} />
          )}
        />
        {errors.password && <p className="text-sm text-red-500 my-1">{errors.password.message}</p>}
      </div>

      <Button type="submit">
        {isSubmitting ? <BeatLoader color="white" size={8} /> : "SIGN IN"}
      </Button>
    </form>
  );
};

export default SigninForm;
