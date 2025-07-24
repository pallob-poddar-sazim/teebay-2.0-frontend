import { IPurchase, IRental, TApiResponse } from "@/shared/typedefs";
import { toast } from "react-toastify";

export const handleResponse = (data: TApiResponse<IRental | IPurchase>) => {
  if (data.success) toast.success(data.message, { theme: "colored" });
  else toast.error(data.message, { theme: "colored" });
};
