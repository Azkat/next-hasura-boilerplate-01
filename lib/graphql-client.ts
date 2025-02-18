import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_ENDPOINT || '',
  {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY || '',
    },
  }
) 