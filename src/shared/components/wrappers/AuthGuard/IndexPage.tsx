"use client";

import { useQuery } from "@apollo/client";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const router = useRouter();
  const { data: user } = useQuery(GET_LOCAL_USER);

  useEffect(() => {
    router.prefetch("/dashboard");
    router.prefetch("/signin");
  }, [router]);

  return user?.localUser?.id ? router.push("/dashboard") : router.push("/signin");
}
