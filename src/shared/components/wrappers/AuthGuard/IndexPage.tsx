"use client";

import { useQuery } from "@apollo/client";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "@/app/(userAuth)/dashboard/page";
import Signin from "@/app/(nonUserAuth)/signin/page";

export default function IndexPage() {
  const router = useRouter();
  const { data: user } = useQuery(GET_LOCAL_USER);

  useEffect(() => {
    router.prefetch("/dashboard");
    router.prefetch("/signin");
  }, [router]);

  return user?.localUser?.id ? <Dashboard /> : <Signin />;
}
