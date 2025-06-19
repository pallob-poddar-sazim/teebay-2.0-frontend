"use client";

import { Controller, useForm } from "react-hook-form";
import IProduct from "@/interfaces/IProduct";
import Input from "../atoms/Input";
import MultiSelect from "../molecules/MultiSelect";
import { GET_ALL_CATEGORIES } from "@/graphql/queries/categories";
import { useQuery, useMutation } from "@apollo/client";
import TextArea from "../atoms/TextArea";
import Select from "../molecules/Select";
import Button from "../atoms/Button";
import { BeatLoader } from "react-spinners";
import { UPDATE_PRODUCT } from "@/graphql/mutations/products";
import { GET_LOCAL_USER } from "@/graphql/queries/users";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GET_SELECTED_PRODUCT } from "@/graphql/queries/products";

interface IProductResponse {
  success: boolean;
  message: string;
  data: IProduct;
}

type FormData = {
  title: string;
  categoryIds: string[];
  description: string;
  price: number;
  rent: number;
  rentOption: string;
};

const ProductUpdateForm = () => {
  const { data: ProductDetails } = useQuery(GET_SELECTED_PRODUCT);
  const product: IProduct = ProductDetails?.selectedProduct;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: product?.title,
      categoryIds: product?.categories?.map((category) => category.id),
      description: product?.description,
      price: product?.price,
      rent: product?.rent,
      rentOption: product?.rentOption,
    },
  });
  const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);
  const { data: user } = useQuery(GET_LOCAL_USER);
  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  const categoryOptions = categoryData?.getAllCategories?.data || [];

  const rentOptions = [
    { value: "", label: "Select an option" },
    { value: "hr", label: "per hr" },
    { value: "day", label: "per day" },
  ];

  const handleResponse = (data: IProductResponse) => {
    if (data.success) {
      router.push("/dashboard");
    } else {
      toast.error(data.message, { theme: "colored" });
    }
  };

  const handlerOnSubmit = async (formData: FormData) => {
    try {
      const variables = {
        id: product?.id,
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        rent: Number(formData.rent),
        rentOption: formData.rentOption,
        categoryIds: formData.categoryIds,
        sellerId: user?.localUser.id,
      };

      const { data } = await updateProduct({
        variables: variables,
        fetchPolicy: "network-only",
      });
      handleResponse(data.updateProduct);
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlerOnSubmit)}
      className="flex flex-col gap-5"
    >
      <div>
        <label>Title</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <Input field={field} type="text" error={errors.title && true} />
          )}
        />

        {errors.title && (
          <p className="text-sm text-red-500 my-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label>Categories</label>
        <Controller
          name="categoryIds"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <MultiSelect
              options={categoryOptions}
              placeholder="Select a category"
              onChange={(selected) => {
                field.onChange(selected);
                setValue(
                  "categoryIds",
                  selected.map((option) => option.id)
                );
              }}
              defaultSelected={product?.categories}
              error={errors.categoryIds && true}
            />
          )}
        />

        {errors.categoryIds && (
          <p className="text-red-500 text-sm my-1">
            {errors.categoryIds.message}
          </p>
        )}
      </div>

      <div>
        <label>Description</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextArea
              rows={8}
              field={field}
              error={errors.description && true}
            />
          )}
        />

        {errors.description && (
          <p className="text-red-500 text-sm my-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex gap-5 items-center justify-between">
        <div>
          <label>Price</label>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            }}
            render={({ field }) => (
              <Input field={field} type="number" placeholder="Purchase price" />
            )}
          />

          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label>Rent</label>
          <Controller
            name="rent"
            control={control}
            rules={{ min: { value: 0, message: "Rent must be positive" } }}
            render={({ field }) => <Input field={field} type="number" />}
          />

          {errors.rent && (
            <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>
          )}
        </div>

        <div>
          <label>Rent Option</label>
          <Controller
            name="rentOption"
            control={control}
            rules={{ required: "Rent option is required" }}
            render={({ field }) => (
              <Select options={rentOptions} field={field} />
            )}
          />

          {errors.rentOption && (
            <p className="text-red-500 text-sm mt-1">
              {errors.rentOption.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" variant="button-primary">
        {loading ? <BeatLoader color="white" size={8} /> : "Submit"}
      </Button>
    </form>
  );
};

export default ProductUpdateForm;
