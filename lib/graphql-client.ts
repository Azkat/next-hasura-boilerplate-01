import { GraphQLClient } from 'graphql-request'

console.log('hasura key : ' + process.env.NEXT_PUBLIC_HASURA_KEY)
console.log('hasura endpoint : ' + process.env.NEXT_PUBLIC_HASURA_ENDPOINT)

export const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_ENDPOINT || '',
  {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY || '',
    },
  }
)
