import { useEffect, useState } from 'react'
import firebase from '../firebaseConfig'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import { useCreateUser } from '../hooks/useCreateUser'
import { useQueryUserByFirebaseId } from './useQueryUserByFirebaseId'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GraphQLClient, gql, request } from 'graphql-request'
import loginCookie from './useLoginCookie'
import { User } from '../types/types'
import { GET_USER_BY_FIREBASEID } from '../queries/queries'
import { useQuery } from 'react-query'

export let unSubMeta: () => void
const cookie = new Cookie()

interface UserByIdRes {
  users: User
}

/* const storeUserIdCookie = async (firebase_id) => {
  const user = await firebase.auth().currentUser
  const { status, data } = useQueryUserByFirebaseId(firebase_id)
  console.log(data)
} */
//const { getUserByFirebaseId } = useQueryUserByFirebaseId()

async function testQuery(firebase_id) {
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
        profile_id
      }
    }
  `
  const variables = {
    firebase_id: firebase_id,
  }

  const data = await client.request(query, variables, requestHeaders)
  console.log(data)
  cookie.set('user_id', data.users[0].id, {
    path: '/',
  })
}

export const useUserChanged = async () => {
  const router = useRouter()
  const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'
  const { createUser } = useCreateUser()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      const alreadyToken = cookie.get('token')
      if (alreadyToken) {
        return
      }

      if (user) {
        const token = await user.getIdToken(true)
        const idTokenResult = await user.getIdTokenResult()
        const hasuraClaims = idTokenResult.claims[HASURA_TOKEN_KEY]

        const now: number = Date.now()
        const expireTimestamp: number = now + 1000 * 60 * 60
        await cookie.set('token_expire', expireTimestamp, { path: '/' })

        if (hasuraClaims) {
          await cookie.set('token', token, { path: '/' })
          await loginCookie(user.uid)
          console.log('login')
          //router.push('/account')
        } else {
          const userRef = firebase
            .firestore()
            .collection('user_meta')
            .doc(user.uid)
          unSubMeta = userRef.onSnapshot(async () => {
            const tokenSnap = await user.getIdToken(true)
            const idTokenResultSnap = await user.getIdTokenResult()
            const hasuraClaimsSnap = idTokenResultSnap.claims[HASURA_TOKEN_KEY]
            if (hasuraClaimsSnap) {
              cookie.set('token', tokenSnap, { path: '/' })
              const param = {
                firebase_id: user.uid,
                email: user.email,
              }
              await createUser(param)
              console.log('create user : ' + Date.now())
            }
          })
        }
      }
    })
    return () => {
      unSubUser()
    }
  }, [])
  return {}
}
