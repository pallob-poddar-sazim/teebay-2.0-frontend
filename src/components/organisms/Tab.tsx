"use client";

import Button from "@/components/atoms/Button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

const Tab = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = searchParams.get("tab") || "bought";

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex justify-around pt-4">
      {["bought", "sold", "borrowed", "lent"].map((tab) => (
        <Button
          key={tab}
          text={tab.charAt(0).toUpperCase() + tab.slice(1)}
          className={
            activeTab === tab
              ? "border-b-4 border-purple w-1/10"
              : "cursor-pointer w-1/10"
          }
          onClick={() => {
            router.push(pathname + "?" + createQueryString(tab));
          }}
        />
      ))}
    </div>
  );
};

export default Tab;
