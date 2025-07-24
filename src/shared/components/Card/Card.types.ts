import { IProduct } from "@/shared/typedefs";

export type TCardProps = {
  product: IProduct;
  onDelete?: (id: string) => void;
  onCardClick?: (product: IProduct) => void;
};