import { IProduct } from "@/shared/typedefs";

export const getProductUpdateFormInitialValues = (product: IProduct) => ({
  title: product?.title,
  categoryIds: product?.categories?.map((category) => category.id),
  description: product?.description,
  price: product?.price,
  rent: product?.rent,
  rentOption: product?.rentOption,
});
