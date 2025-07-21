export type TOption = {
  id: string;
  name: string;
};

export type TMultiSelectProps = {
  placeholder: string;
  options: TOption[];
  onChange: (selected: TOption[]) => void;
  error?: boolean;
  defaultSelected?: TOption[];
};
