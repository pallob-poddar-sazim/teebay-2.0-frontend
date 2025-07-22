"use client";

import { useQuery } from "@apollo/client";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { data, loading } = useQuery(GET_LOCAL_USER);

  useEffect(() => {
    router.prefetch("/dashboard");
    router.prefetch("/signin");
  }, [router]);

  useEffect(() => {
    if (loading) return;

    const isLoggedIn = !!data?.localUser?.id;
    const targetRoute = isLoggedIn ? "/dashboard" : "/signin";

    router.replace(targetRoute);
  }, [loading, data, router]);

  return null;
}
