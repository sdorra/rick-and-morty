import { LocationsQuery } from "generated/graphql";
import { gql } from "graphql-tag";
import client from "./client";
import { isDefined } from "./utils";

const query = gql`
  query locations {
    locations {
      results {
        id
        name
      }
    }
  }
`;

const fetchLocations = async () => {
  const response = await client.query<LocationsQuery>(query, {}).toPromise();
  return response.data?.locations?.results?.filter(isDefined) || [];
};

export default fetchLocations;
