import { useEffect } from 'react'
import firebase from '../firebaseConfig'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import { useCreateUser } from '../hooks/useCreateUser'
import { useQueryUserByFirebaseId } from './useQueryUserByFirebaseId'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

export let unSubMeta: () => void
const cookie = new Cookie()

/* const storeUserIdCookie = async (firebase_id) => {
  const user = await firebase.auth().currentUser
  const { status, data } = useQueryUserByFirebaseId(firebase_id)
  console.log(data)
} */
const { getUserByFirebaseId } = useQueryUserByFirebaseId()

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

        if (hasuraClaims) {
          cookie.set('token', token, { path: '/' })
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
              createUser(param)
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
