import React, { useEffect } from 'react'
import { GraphQLClient, gql } from 'graphql-request'
import Cookie from 'universal-cookie'
const cookie = new Cookie()

export default async function loginCookie(firebase_id) {
  let graphQLClient: GraphQLClient
  const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
  const client = new GraphQLClient(endpoint)

  const requestHeaders = {
    authorization: `Bearer ${cookie.get('token')}`,
  }

  const query = gql`
    query MyQuery($firebase_id: String!) {
      users(where: { firebase_id: { _eq: $firebase_id } }) {
        id
        name
      }
    }
  `
  const variables = {
    firebase_id: firebase_id,
  }

  const data = await client.request(query, variables, requestHeaders)
  cookie.set('user_id', data.users[0].id, {
    path: '/',
  })
}
