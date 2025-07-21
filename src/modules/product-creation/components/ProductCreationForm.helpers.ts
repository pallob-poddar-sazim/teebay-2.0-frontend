import { TProductCreationFormFields } from "./ProductCreationForm.types";

export const productCreationFormInitialValues: TProductCreationFormFields = {
  title: "",
  categoryIds: [],
  description: "",
  price: 0,
  rent: 0,
  rentOption: "",
};

export const stepValidationFields: Record<number, Array<keyof TProductCreationFormFields>> = {
  0: ["title"],
  1: ["categoryIds"],
  2: ["description"],
  3: ["price", "rent", "rentOption"],
};
