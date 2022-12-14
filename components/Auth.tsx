import Link from 'next/link'
import {
  ChevronDoubleRightIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/solid'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import firebase from '../firebaseConfig'

export const Auth = () => {
  const user = firebase.auth().currentUser
  const {
    isLogin,
    email,
    password,
    emailChange,
    pwChange,
    authUser,
    toggleMode,
  } = useFirebaseAuth()
  return (
    <>
      <h2 className="header-h2 text-center">{isLogin ? 'Login' : 'Singup'}</h2>

      <form
        onSubmit={authUser}
        className="mt-4 flex justify-center items-center flex-col"
      >
        <div className="form-control w-full  mt-6">
          <input
            className="text-input-1"
            placeholder="Email"
            type="text"
            value={email}
            onChange={emailChange}
          />
        </div>

        <div className="form-control w-full  mt-6">
          <input
            className="text-input-1"
            placeholder="Password"
            type="password"
            value={password}
            onChange={pwChange}
          />
        </div>
        <button
          className="disabled:bg-gray-600 btn btn-wide btn-primary px-4 py-1 mt-6"
          disabled={!email || !password}
          type="submit"
        >
          {isLogin ? 'Login' : 'Singup'}
        </button>
      </form>

      <div className="mt-20 flex justify-center items-center flex-col">
        <div
          className="btn btn-wide px-4 py-1 mt-6 cursor-pointer outline"
          onClick={toggleMode}
        >
          <ChevronDoubleRightIcon className="h-4 w-4  text-gray-100 opacity-80 cursor-pointer mr-2" />
          <span>{isLogin ? 'Signup' : 'Login'}</span>
        </div>
      </div>
    </>
  )
}
