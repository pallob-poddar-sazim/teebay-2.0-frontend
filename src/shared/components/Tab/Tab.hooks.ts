import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useTab = () => {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", value);

      return params.toString();
    },
    [searchParams],
  );

  const activeTab = searchParams.get("tab") || "bought";

  return { createQueryString, activeTab };
};
