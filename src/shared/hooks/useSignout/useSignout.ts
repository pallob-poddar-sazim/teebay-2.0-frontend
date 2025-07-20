import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSignout = () => {
  const client = useApolloClient();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/signin");
  }, [router]);

  const signout = () => {
    client.writeQuery({ query: GET_LOCAL_USER, data: { localUser: null } });
    router.push("/signin");
  };

  return { signout };
};
