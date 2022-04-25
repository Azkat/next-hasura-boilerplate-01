import firebase from '../firebaseConfig'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [uid, setUid] = useState('')
  const [providerId, setProviderId] = useState('')
  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUid(user.uid)

        const data = user.providerData
        data.forEach((userinfo) => {
          setProviderId(userinfo.providerId)
          console.log(userinfo.providerId)
        })
      }
    })
    return () => {
      unSubUser()
    }
  }, [])
  return { uid, providerId }
}
