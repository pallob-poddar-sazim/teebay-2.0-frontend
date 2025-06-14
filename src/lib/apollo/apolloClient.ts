import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const httpLink = createHttpLink({ uri: process.env.NEXT_PUBLIC_SERVER_URL });

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export const initializeApolloCache = async () => {
  try {
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
      trigger: "write",
    });
  } catch (error) {
    console.error("Error initializing cache persistence:", error);
  }
};

export default client;
