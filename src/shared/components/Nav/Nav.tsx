"use client";

import Link from "next/link";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { useQuery } from "@apollo/client";
import { Button } from "../shadui/button";
import { useSignout } from "@/shared/hooks/useSignout";

const Nav = () => {
  const { data: user } = useQuery(GET_LOCAL_USER);
  const { signout } = useSignout();

  return (
    <nav className="flex justify-end gap-4 mx-6 mt-4 mb-8">
      <Link href={`/`} className="text-blue">
        <Button variant={"ghost"}>DASHBOARD</Button>
      </Link>
      <Link href={"/products"} className="text-blue">
        <Button variant={"ghost"}>ALL PRODUCTS</Button>
      </Link>
      <Link href={"/products/creation"} className="text-blue">
        <Button variant={"ghost"}>ADD PRODUCT</Button>
      </Link>
      <Link href={"/products/bulk-creation"} className="text-blue">
        <Button variant={"ghost"}>BULK CREATE</Button>
      </Link>
      <Link href={`/users/${user.localUser?.id}/products/history`} className="text-blue">
        <Button variant={"ghost"}>TRANSACTIONS</Button>
      </Link>
      <Button variant={"ghost"} onClick={signout} className="text-destructive">
        LOGOUT
      </Button>
    </nav>
  );
};

export default Nav;
