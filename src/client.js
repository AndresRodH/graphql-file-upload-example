import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";

export function createClient({ token, endpoint }) {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : undefined
      }
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([
      authLink,
      // Report errors to console in a user friendly format
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      createUploadLink({
        uri: endpoint
      })
    ]),
    cache: new InMemoryCache()
  });

  return client;
}
