"use client";

import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useApolloClient } from "@apollo/client";
import { GET_LOCAL_USER } from "@/graphql/queries/users";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Nav = () => {
  const client = useApolloClient();
  const { data: user } = useQuery(GET_LOCAL_USER);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/signin");
  }, [router]);

  const handleSignOut = () => {
    client.writeQuery({ query: GET_LOCAL_USER, data: { localUser: null } });
    router.push("/signin");
  };

  return (
    <nav className="flex justify-end gap-4 mx-6 my-4">
      <Link
        href={`/users/${user.localUser?.id}/products/history`}
        className="text-blue"
      >
        <Button text="TRANSACTIONS" variant="button-primary" />
      </Link>
      <Link href={"/products"} className="text-blue">
        <Button text="ALL PRODUCTS" variant="button-primary" />
      </Link>
      <Link href={"/products/creation"} className="text-blue">
        <Button text="ADD PRODUCT" variant="button-primary" />
      </Link>
      <Link href={"/products/bulk-creation"} className="text-blue">
        <Button text="BULK CREATE" variant="button-primary" />
      </Link>
      <Button
        text="LOGOUT"
        variant="button-secondary"
        onClick={handleSignOut}
      />
    </nav>
  );
};

export default Nav;
