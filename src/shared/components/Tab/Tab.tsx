"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "../shadui/button";
import { useTab } from "./Tab.hooks";

const Tab = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString, activeTab } = useTab();

  return (
    <div className="flex justify-around pt-4">
      {["bought", "sold", "borrowed", "lent"].map((tab) => (
        <Button
          key={tab}
          variant={"ghost"}
          onClick={() => {
            router.push(pathname + "?" + createQueryString(tab));
          }}
          className={`w-1/10 rounded-none ${activeTab === tab && "border-b-4 border-primary"}`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default Tab;
