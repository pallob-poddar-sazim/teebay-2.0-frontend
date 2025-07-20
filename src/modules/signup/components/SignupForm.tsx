"use client";

import { Controller } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useSignupForm } from "./SignupForm.hooks";
import { Button } from "@/shared/components/shadui/button";
import { Input } from "@/shared/components/shadui/input";
import { PasswordInput } from "@/shared/components/PasswordInput/PasswordInput";

const SignupForm = () => {
  const { form, onSubmit } = useSignupForm();
  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <form className="flex flex-col gap-5 my-5" onSubmit={onSubmit}>
      <div>
        <Controller
          name="firstName"
          control={form.control}
          rules={{
            required: "First name is required",
            maxLength: { value: 50, message: "Character limit exceeded" },
          }}
          render={({ field }) => <Input placeholder="First name" autoComplete="on" {...field} />}
        />

        {errors.firstName && (
          <p className="text-sm text-red-500 my-1">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <Controller
          name="lastName"
          control={form.control}
          rules={{
            required: "Last name is required",
            maxLength: { value: 50, message: "Character limit exceeded" },
          }}
          render={({ field }) => <Input placeholder="Last name" autoComplete="on" {...field} />}
        />

        {errors.lastName && <p className="text-sm text-red-500 my-1">{errors.lastName.message}</p>}
      </div>

      <div>
        <Controller
          name="address"
          control={form.control}
          rules={{
            required: "Address is required",
            maxLength: { value: 100, message: "Character limit exceeded" },
          }}
          render={({ field }) => <Input placeholder="Address" autoComplete="on" {...field} />}
        />

        {errors.address && <p className="text-sm text-red-500 my-1">{errors.address.message}</p>}
      </div>

      <div className="flex gap-5 items-start justify-between">
        <div>
          <Controller
            name="email"
            control={form.control}
            rules={{
              required: "Email is required",
              maxLength: { value: 320, message: "Invalid email format" },
              pattern: {
                value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Input placeholder="Email" type="email" autoComplete="on" {...field} />
            )}
          />

          {errors.email && <p className="text-sm text-red-500 my-1">{errors.email.message}</p>}
        </div>

        <div>
          <Controller
            name="phone"
            control={form.control}
            rules={{
              required: "Phone is required",
              maxLength: { value: 20, message: "Character limit exceeded" },
            }}
            render={({ field }) => (
              <Input placeholder="Phone Number" autoComplete="on" {...field} />
            )}
          />

          {errors.phone && <p className="text-sm text-red-500 my-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <Controller
          name="password"
          control={form.control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            maxLength: {
              value: 20,
              message: "Character limit exceeded",
            },
          }}
          render={({ field }) => (
            <PasswordInput placeholder="Password" autoComplete="on" {...field} />
          )}
        />

        {errors.password && <p className="text-sm text-red-500 my-1">{errors.password.message}</p>}
      </div>

      <div>
        <Controller
          name="confirmPassword"
          control={form.control}
          rules={{
            required: "Confirm Password is required",
            validate: (value) => value === form.watch("password") || "Passwords do not match",
          }}
          render={({ field }) => <PasswordInput placeholder="Confirm Password" {...field} />}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-red-500 my-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit">
        {isSubmitting ? <BeatLoader color="white" size={8} /> : "SIGN UP"}
      </Button>
    </form>
  );
};

export default SignupForm;
