"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import MultiSelect from "@/shared/components/MultiSelect";
import Select from "@/shared/components/Select";
import { GET_ALL_CATEGORIES } from "@/shared/graphql/queries/categories";
import { useQuery } from "@apollo/client";
import { BeatLoader } from "react-spinners";
import { Input } from "@/shared/components/shadui/input";
import { Textarea } from "@/shared/components/shadui/textarea";
import { Button } from "@/shared/components/shadui/button";
import { useProductCreationForm } from "./ProductCreationForm.hooks";
import { rentOptions } from "@/shared/constants/app.constants";
import { stepValidationFields } from "./ProductCreationForm.helpers";
import SummaryPage from "./SummaryPage";

const ProductCreationForm = () => {
  const { form, onSubmit } = useProductCreationForm();
  const [step, setStep] = useState(0);
  const { data: categoryData } = useQuery(GET_ALL_CATEGORIES, {
    fetchPolicy: "network-only",
  });

  const formValues = form.watch();
  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;
  const categories = categoryData?.getAllCategories?.data || [];

  const nextStep = async () => {
    const currentStepFields = stepValidationFields[step];
    const isValid = await form.trigger(currentStepFields);

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="space-y-4">
      {step === 0 && (
        <div className="space-y-2">
          <p className="text-2xl font-medium text-jet-black text-center">
            Select a title for your product
          </p>
          <Controller
            name="title"
            control={form.control}
            rules={{ required: "Title is required" }}
            render={({ field }) => <Input {...field} type="text" />}
          />

          {errors.title && <p className="text-sm text-red-500 my-1">{errors.title.message}</p>}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-2">
          <p className="text-2xl font-medium text-jet-black text-center">Select Categories</p>
          <Controller
            name="categoryIds"
            control={form.control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <MultiSelect
                options={categories}
                placeholder="Select a category"
                onChange={(selected) => {
                  field.onChange(selected);
                  form.setValue(
                    "categoryIds",
                    selected.map((option) => option.id),
                  );
                }}
                error={errors.categoryIds && true}
              />
            )}
          />

          {errors.categoryIds && (
            <p className="text-red-500 text-sm my-1">{errors.categoryIds.message}</p>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <p className="text-2xl font-medium text-jet-black text-center">Select Description</p>
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
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-2xl font-medium text-jet-black text-center">Select Price</p>
            <Controller
              name="price"
              control={form.control}
              rules={{
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Purchase price"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex gap-8">
            <div className="space-y-2 w-1/2">
              <label className="block text-sm font-medium">Rent</label>
              <Controller
                name="rent"
                control={form.control}
                rules={{ min: { value: 0, message: "Rent must be positive" } }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {errors.rent && (
                      <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2 w-1/2">
              <label className="block text-sm font-medium">Rent Option</label>
              <Controller
                name="rentOption"
                control={form.control}
                rules={{ required: "Rent option is required" }}
                render={({ field }) => (
                  <div>
                    <Select options={rentOptions} field={field} />
                    {errors.rentOption && (
                      <p className="text-red-500 text-sm mt-1">{errors.rentOption.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      )}

      {step === 4 && <SummaryPage formValues={formValues} categories={categories} />}

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <Button type="button" onClick={prevStep}>
            Back
          </Button>
        )}

        {step < 4 && (
          <Button type="button" onClick={nextStep} className="ml-auto">
            Next
          </Button>
        )}
        {step === 4 && (
          <Button type="submit" onClick={onSubmit}>
            {isSubmitting ? <BeatLoader color="white" size={8} /> : "Submit"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCreationForm;
