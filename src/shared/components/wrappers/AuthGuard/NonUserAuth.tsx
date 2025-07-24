"use client";

import { useQuery } from "@apollo/client";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function NonUserAuth(props: Props) {
  const router = useRouter();
  const { data: user, loading } = useQuery(GET_LOCAL_USER);

  useEffect(() => {
    if (!loading && user?.localUser?.id) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return !user?.localUser?.id ? <>{props.children}</> : null;
}
