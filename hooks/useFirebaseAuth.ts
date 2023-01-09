import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import firebase, { auth } from '../firebaseConfig'
import { animateScroll as scroll } from 'react-scroll'

export const useFirebaseAuth = () => {
  //const { createUserMutation } = useAppMutate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rightPasswordFormat, setRightPasswordFormat] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 100 })
  }

  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithRedirect(provider)
  }

  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])
  const pwChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (
      e.target.value.match(
        /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-\/:-@[-`{-~])[!-~]{8,120}$/i
      )
    ) {
      setRightPasswordFormat(true)
    } else {
      setRightPasswordFormat(false)
    }
  }, [])
  const resetInput = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])
  const toggleMode = useCallback(() => {
    scrollToTop()
    setIsLogin(!isLogin)
  }, [isLogin])
  const authUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (isLogin) {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
          alert(e.message)
        }
        resetInput()
      } else {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password)
          await firebase.auth().currentUser.sendEmailVerification()
        } catch (e) {
          alert(e.message)
        }
        resetInput()
      }
    },
    [email, password, isLogin]
  )

  return {
    googleLogin,
    email,
    password,
    emailChange,
    pwChange,
    resetInput,
    isLogin,
    toggleMode,
    authUser,
    rightPasswordFormat,
  }
}
