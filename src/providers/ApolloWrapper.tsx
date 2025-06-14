"use client";

import React, { useEffect, useState } from "react";
import client, { initializeApolloCache } from "@/lib/apollo/apolloClient";
import { ApolloProvider } from "@apollo/client";

type Props = {
  children: React.ReactNode;
};

const ApolloWrapper = (props: Props) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initializeApolloCache().then(() => {
      setInitialized(true);
    });
  }, []);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloWrapper;
