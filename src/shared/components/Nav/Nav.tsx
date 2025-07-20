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
    <nav className="flex justify-end gap-4 mx-6 my-4">
      <Link href={`/users/${user.localUser?.id}/products/history`} className="text-blue">
        <Button>TRANSACTIONS</Button>
      </Link>
      <Link href={"/products"} className="text-blue">
        <Button>ALL PRODUCTS</Button>
      </Link>
      <Link href={"/products/creation"} className="text-blue">
        <Button>ADD PRODUCT</Button>
      </Link>
      <Link href={"/products/bulk-creation"} className="text-blue">
        <Button>BULK CREATE</Button>
      </Link>
      <Button variant={"destructive"} onClick={signout}>
        LOGOUT
      </Button>
    </nav>
  );
};

export default Nav;
