import { ICategory } from "@/shared/typedefs";

export type TMultiSelectProps = {
  placeholder: string;
  options: ICategory[];
  onChange: (selected: ICategory[]) => void;
  error?: boolean;
  defaultSelected?: ICategory[];
};
