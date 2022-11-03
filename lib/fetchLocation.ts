import {
  LocationQuery,
  LocationQueryVariables,
} from "generated/graphql";
import { gql } from "graphql-tag";
import client from "./client";
import { isDefined } from "./utils";

const query = gql`
  query location($id: [ID!]!) {
    locationsByIds(ids: $id) {
      name
      residents {
        id
        name
        image
        status
        species
        gender
        created
      }
    }
  }
`;

const fetchLocation = async (id: number) => {
  const response = await client
    .query<LocationQuery, LocationQueryVariables>(query, {
      id: String(id),
    })
    .toPromise();

  const locationById = response.data?.locationsByIds;
  if (!locationById || locationById.length === 0) {
    throw new Error(`could not find location with id ${id}`);
  }

  if (locationById.length > 1) {
    throw new Error(`found more than one location with id ${id}`);
  }

  const location = locationById[0];
  if (!location) {
    throw new Error(`location with id ${id} is null`);
  }

  return {
    ...location,
    residents: location.residents.filter(isDefined),
  };
};

export default fetchLocation;
