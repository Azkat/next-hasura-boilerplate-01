import { useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react'
import firebase, { auth } from '../firebaseConfig'
import { useQueryUserById } from './useQueryUserById'
import Cookie from 'universal-cookie'
import { useAppMutate } from './useAppMutate'

const cookie = new Cookie()

export const useUpdateFirebaseEmail = () => {
  const [uid, setUid] = useState('')
  const [providerId, setProviderId] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { updateUserProfileEmailMutaion } = useAppMutate()

  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUid(user.uid)
        setCurrentEmail(user.email)
        setEmail(user.email)

        const data = user.providerData
        data.forEach((userinfo) => {
          setProviderId(userinfo.providerId)
        })
      }
    })
    return () => {
      unSubUser()
    }
  }, [])

  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const passwordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const { status, data } = useQueryUserById(cookie.get('user_id'))

  const updateEmail = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const user = await firebase.auth().currentUser
      const credential = await firebase.auth.EmailAuthProvider.credential(
        currentEmail,
        password
      )
      user.reauthenticateWithCredential(credential).then(() => {
        user
          .updateEmail(email)
          .then(() => {
            const param = {
              id: data.profile_id,
              email: user.email,
            }
            updateUserProfileEmailMutaion.mutate(param)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    },
    [email, password]
  )

  return {
    uid,
    email,
    providerId,
    emailChange,
    updateEmail,
    password,
    passwordChange,
  }
}
