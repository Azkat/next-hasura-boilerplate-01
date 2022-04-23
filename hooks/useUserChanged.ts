import { useEffect } from 'react'
import firebase from '../firebaseConfig'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import { useCreateUser } from '../hooks/useCreateUser'
import { useAppMutate } from '../hooks/useAppMutate'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

export let unSubMeta: () => void

export const useUserChanged = () => {
  const cookie = new Cookie()
  const router = useRouter()
  const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'
  const { createUserMutation } = useCreateUser()
  const { updateUserName } = useAppMutate()
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
          cookie.set('user_id', 'd524bb72-4fce-4622-9c08-62264943ff68', {
            path: '/',
          })
          router.push('/account')
        } else {
          const userRef = firebase
            .firestore()
            .collection('user_meta')
            .doc(user.uid)
          unSubMeta = userRef.onSnapshot(async () => {
            const tokenSnap = await user.getIdToken(true)
            const idTokenResultSnap = await user.getIdTokenResult()
            const hasuraClaimsSnap = await idTokenResultSnap.claims[
              HASURA_TOKEN_KEY
            ]
            if (hasuraClaimsSnap) {
              await cookie.set('token', tokenSnap, { path: '/' })
              router.push('/account')
            }
          })
          const param = {
            firebase_id: user.uid,
            email: user.email,
          }
          createUserMutation.mutate(param)
        }
      }
    })
    return () => {
      unSubUser()
    }
  }, [])
  return {}
}
