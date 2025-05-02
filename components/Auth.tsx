import Link from 'next/link'
import {
  ChevronDoubleRightIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/solid'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import firebase from '../firebaseConfig'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormEvent } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from 'react'

interface IFormInput {
  email: string
  password: string
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const Auth = () => {
  const user = firebase.auth().currentUser
  const {
    isLogin,
    email,
    password,
    rightPasswordFormat,
    emailChange,
    pwChange,
    authUser,
    toggleMode,
  } = useFirebaseAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()

  const [verified, setVerified] = useState(false)

  const handleRecaptcha = (token) => {
    setVerified(!!token)
  }

  const emailRules = {
    required: 'Required',
    maxLength: { value: 2000, message: `Up to 2000 characters` },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Type Email Address',
    },
  }

  const passwordRules = {
    required: 'Required',
    minLength: { value: 8, message: `More than 8 characters` },
    maxLength: { value: 120, message: `Up to 120 characters` },
    pattern: {
      value: /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-\/:-@[-`{-~])[!-~]{8,120}$/i,
      message:
        'Contains at least one each of half-width alphanumeric characters and symbols',
    },
  }

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
            {...register('email', emailRules)}
            value={email}
            onChange={emailChange}
          />
          <div className="text-red-500">
            {errors.email && errors.email.message}
          </div>
        </div>

        <div className="form-control w-full  mt-6">
          <input
            className="text-input-1 text-base"
            placeholder="Password"
            type="password"
            {...register('password', passwordRules)}
            value={password}
            onChange={pwChange}
          />
          <div className="text-gray-500 pl-2">
            Contains at least one each of half-width alphanumeric characters and
            symbols.
          </div>
          <div className="text-red-500">
            {errors.password && errors.password.message}
          </div>
        </div>
        <div className=" mt-6">
          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={handleRecaptcha}
            theme="dark"
          />
          <div className="w-full flex justify-center">
            <button
              className="disabled:bg-gray-600 btn btn-wide btn-primary px-4 py-1 mt-6 mx-auto"
              disabled={
                !email || !password || !rightPasswordFormat || !verified
              }
              type="submit"
            >
              {isLogin ? 'Login' : 'Singup'}
            </button>
          </div>
        </div>
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
