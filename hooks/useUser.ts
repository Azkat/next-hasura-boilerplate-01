import firebase from '../firebaseConfig'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [uid, setUid] = useState('')
  const [providerId, setProviderId] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUid(user.uid)
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
  return { uid, email, providerId }
}
