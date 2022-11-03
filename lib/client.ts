import { createClient } from "@urql/core";

const client = createClient({
  url: "https://rickandmortyapi.com/graphql",
});

export default client;
