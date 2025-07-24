"use client";

import { Controller } from "react-hook-form";
import MultiSelect from "@/shared/components/MultiSelect";
import { GET_ALL_CATEGORIES } from "@/shared/graphql/queries/categories";
import { useQuery } from "@apollo/client";
import Select from "@/shared/components/Select";
import { BeatLoader } from "react-spinners";
import { Input } from "@/shared/components/shadui/input";
import { Button } from "@/shared/components/shadui/button";
import { useProductUpdateForm } from "./ProductUpdateForm.hooks";
import { GET_SELECTED_PRODUCT } from "@/shared/graphql/queries/products";
import { IProduct } from "@/shared/typedefs";
import { rentOptions } from "./ProductUpdateForm.helpers";
import { Textarea } from "@/shared/components/shadui/textarea";

const ProductUpdateForm = () => {
  const { data: ProductDetails } = useQuery(GET_SELECTED_PRODUCT);
  const product: IProduct = ProductDetails?.selectedProduct;
  const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);
  const { form, onSubmit } = useProductUpdateForm(product);

  const categoryOptions = categoryData?.getAllCategories?.data || [];
  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div>
        <label>Title</label>
        <Controller
          name="title"
          control={form.control}
          rules={{ required: "Title is required" }}
          render={({ field }) => <Input {...field} type="text" />}
        />

        {errors.title && <p className="text-sm text-red-500 my-1">{errors.title.message}</p>}
      </div>

      <div>
        <label>Categories</label>
        <Controller
          name="categoryIds"
          control={form.control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <MultiSelect
              options={categoryOptions}
              placeholder="Select a category"
              onChange={(selected) => {
                field.onChange(selected);
                form.setValue(
                  "categoryIds",
                  selected.map((option) => option.id),
                );
              }}
              defaultSelected={product?.categories}
              error={errors.categoryIds && true}
            />
          )}
        />

        {errors.categoryIds && (
          <p className="text-red-500 text-sm my-1">{errors.categoryIds.message}</p>
        )}
      </div>

      <div>
        <label>Description</label>
        <Controller
          name="description"
          control={form.control}
          rules={{ required: "Description is required" }}
          render={({ field }) => <Textarea rows={8} {...field} />}
        />

        {errors.description && (
          <p className="text-red-500 text-sm my-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-5 items-center justify-between">
        <div>
          <label>Price</label>
          <Controller
            name="price"
            control={form.control}
            rules={{
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            }}
            render={({ field }) => <Input {...field} type="number" placeholder="Purchase price" />}
          />

          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label>Rent</label>
          <Controller
            name="rent"
            control={form.control}
            rules={{ min: { value: 0, message: "Rent must be positive" } }}
            render={({ field }) => <Input {...field} type="number" />}
          />

          {errors.rent && <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>}
        </div>

        <div>
          <label>Rent Option</label>
          <Controller
            name="rentOption"
            control={form.control}
            rules={{ required: "Rent option is required" }}
            render={({ field }) => <Select options={rentOptions} field={field} />}
          />

          {errors.rentOption && (
            <p className="text-red-500 text-sm mt-1">{errors.rentOption.message}</p>
          )}
        </div>
      </div>

      <Button type="submit">
        {isSubmitting ? <BeatLoader color="white" size={8} /> : "Submit"}
      </Button>
    </form>
  );
};

export default ProductUpdateForm;
