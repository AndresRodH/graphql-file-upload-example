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

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjcyOTY3NjFBOUFBMTU1RjhENTYwRTMwMUQzNEU3NDNBMjM2N0EzNEUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJjcFoyR3BxaFZmalZZT01CMDA1ME9pTm5vMDQifQ.eyJuYmYiOjE1NzEyNDQ5MTcsImV4cCI6MTU3MTI0ODUxNywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoidGVzdGluZ19vYXV0aCIsInN1YiI6IjI3NmM0Y2M5LTFlM2ItNDNlMi05OGM1LTEzNTEzOGMwNDE2OSIsImF1dGhfdGltZSI6MTU3MTI0NDkxNywiaWRwIjoibG9jYWwiLCJ1c2VySWQiOiIyNzZjNGNjOS0xZTNiLTQzZTItOThjNS0xMzUxMzhjMDQxNjkiLCJuYW1lIjoiYW5kcmVzaXNoIiwiZW1haWwiOiI4MjMwZGE4ZmMyNWE2OWIyNGYyNWY4NjRmYjRAcm9uaW5zZXJ2aWNlcy5pbyIsImVtYWlsX3ZlcmlmaWVkIjoiRmFsc2UiLCJzY29wZSI6WyJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiY3VzdG9tIl0sImluc3RhbmNlcyI6e30sInJvbGUiOlsiVVNFUiJdfQ.fdImnn2RazMGFfE5aEOdZb6VBON_7UuhfD22u8nPrquj97jZAe1Honz7XlHg5bk2wJmb5xHuIEVyXvSWubrv2_219tjTard7FD-aTsTbR4F4VDHn5v_UzAXV4eaj4d8kqA-EBDj0OA86-WbY13g7bpKLpsi5WCsdMUqwikeQm0z61syqxXxNbykMb8Ks3okD9qigc2H87D-RDVLHvtFvvRzIHAgY6fUwi5JiCHb7ELFYf5Y04Zfc2ZwbeUGVZZElQcHpv1iXAJQRsrBLNB7g9OQPtH00BeSfs_IWAtK3Ku17Prh6hUk5a-J59wqaVS53g8WNiAk4iffwkKU4nyX0wG5-97W60XNyN1aOs12jNmCvDKb_gSewSkU-c4hYt0-gKN2Ndg298rQWr5tot1X2PnL4Jou-D4iGI84yznh32ny7VltLTqXrN4QoWYhEr4hjGcUFaV8mpAoBOCKZmCMQR-1SrKmCdzERlkn6wy_BwXBhgrZZ_puB6EbggvN7lveMo6LJU7CwmO0GmgLhdAf0qCtzntJ7xzlJb6eIlVJ4jT-wLVEROETMxId_CUA1C8FjqlzSswdbf-6NciTvDzGJG8IPbRRe3PLbECKwb7UYu-QfYEb5Myxq33AyuHuNHKiAjf8xjpAlmNDX8IoX0zKdzUtDb9FvO0oInbaBhtVPXAo`
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
      uri: "http://localhost:1337/ronin/gql"
    })
  ]),
  cache: new InMemoryCache()
});

export default client;
