import { ICategory } from "@/shared/typedefs";

export type TProductCreationFormFields = {
  title: string;
  categoryIds: string[];
  description: string;
  price: number;
  rent: number;
  rentOption: string;
};

export type TSummaryPageProps = {
  formValues: TProductCreationFormFields;
  categories: ICategory[];
};
