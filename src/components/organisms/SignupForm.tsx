import { Controller, useForm } from "react-hook-form";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { SIGN_UP } from "../../graphql/mutations/users";
import { useMutation } from "@apollo/client";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import IUser from "../../interfaces/IUser";
import { useNavigate } from "react-router-dom";

interface ISignupResponse {
  success: boolean;
  message: string;
  data: IUser;
}

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [signUp, { loading, error }] = useMutation(SIGN_UP);
  const navigate = useNavigate();

  if (error) {
    toast.error(error.message);
  }

  const handleResponse = (data: ISignupResponse) => {
    if (data.success) {
      navigate("/signin");
    } else {
      toast.error(data.message, { theme: "colored" });
    }
  };

  const handlerOnSubmit = async () => {
    const formData = {
      name: getValues("firstName") + " " + getValues("lastName"),
      address: getValues("address"),
      email: getValues("email"),
      phone: getValues("phone"),
      password: getValues("password"),
      confirmPassword: getValues("confirmPassword"),
    };

    try {
      const { data } = await signUp({ variables: formData });

      handleResponse(data.signUp);
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
          name="firstName"
          control={control}
          rules={{
            required: "First name is required",
            maxLength: { value: 50, message: "Character limit exceeded" },
          }}
          render={({ field }) => (
            <Input
              placeholder="First name"
              autocomplete="on"
              field={field}
              error={errors.firstName && true}
            />
          )}
        />

        {errors.firstName && (
          <p className="text-sm text-red-500 my-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="lastName"
          control={control}
          rules={{
            required: "Last name is required",
            maxLength: { value: 50, message: "Character limit exceeded" },
          }}
          render={({ field }) => (
            <Input
              placeholder="Last name"
              autocomplete="on"
              field={field}
              error={errors.lastName && true}
            />
          )}
        />

        {errors.lastName && (
          <p className="text-sm text-red-500 my-1">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <Controller
          name="address"
          control={control}
          rules={{
            required: "Address is required",
            maxLength: { value: 100, message: "Character limit exceeded" },
          }}
          render={({ field }) => (
            <Input
              placeholder="Address"
              autocomplete="on"
              field={field}
              error={errors.address && true}
            />
          )}
        />

        {errors.address && (
          <p className="text-sm text-red-500 my-1">{errors.address.message}</p>
        )}
      </div>

      <div className="flex gap-5 items-start justify-between">
        <div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              maxLength: { value: 320, message: "Invalid email format" },
              pattern: {
                value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Input
                placeholder="Email"
                type="email"
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
            name="phone"
            control={control}
            rules={{
              required: "Phone is required",
              maxLength: { value: 20, message: "Character limit exceeded" },
            }}
            render={({ field }) => (
              <Input
                placeholder="Phone Number"
                autocomplete="on"
                field={field}
                error={errors.phone && true}
              />
            )}
          />

          {errors.phone && (
            <p className="text-sm text-red-500 my-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <Controller
          name="password"
          control={control}
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
            <Input
              placeholder="Password"
              type="password"
              autocomplete="on"
              includePasswordIcon
              field={field}
              error={errors.password && true}
            />
          )}
        />

        {errors.password && (
          <p className="text-sm text-red-500 my-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm Password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          }}
          render={({ field }) => (
            <Input
              placeholder="Confirm Password"
              type="password"
              includePasswordIcon
              field={field}
              error={errors.confirmPassword && true}
            />
          )}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-red-500 my-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="button-primary">
        {loading ? <BeatLoader color="white" size={8} /> : "SIGN UP"}
      </Button>
    </form>
  );
};

export default SignupForm;
