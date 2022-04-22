import firebase from '../firebaseConfig'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [uid, setUid] = useState('')
  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUid(user.uid)
      }
    })
    return () => {
      unSubUser()
    }
  }, [])
  return { uid }
}
