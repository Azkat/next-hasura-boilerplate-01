import firebase from 'firebase/app'
import { createContext, useEffect, useState, VFC, ReactNode } from 'react'
import { auth, db } from '../firebaseConfig'
export type User = firebase.User

type AuthContextProps = {
  currentUser: User | null | undefined
  signInCheck: boolean
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  signInCheck: false,
})

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  )

  const [signInCheck, setSignInCheck] = useState(false)

  // ログイン状態を確認する
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user)
        setSignInCheck(true)
      } else {
        setSignInCheck(true)
      }
    })
  })

  if (signInCheck) {
    return (
      <AuthContext.Provider value={{ currentUser, signInCheck }}>
        {children}
      </AuthContext.Provider>
    )
  } else {
    return
  }
}

export { AuthContext, AuthProvider }
