export type TApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
