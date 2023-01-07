import { useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import Cookies from 'universal-cookie'
import { useAppMutate } from '../hooks/useAppMutate'
import firebase, { auth } from '../firebaseConfig'

export const DeleteUser = (props) => {
  const cookie = new Cookies()
  const now = new Date()
  const { deleteAccountMutation, deleteUserProfileMutation } = useAppMutate()
  const [password, setPassword] = useState('')
  const [providerId, setProviderId] = useState('')

  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
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

  const passwordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const deleteAccountParam = {
    id: cookie.get('user_id'),
  }

  const deleteFirestoreDocument = async (id) => {
    await firebase.firestore().collection('user_meta').doc(id).delete()
  }

  const deleteAccount = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      //console.log('deleteAccount発火 :' + Date.now())
      e.preventDefault()
      const user = await firebase.auth().currentUser
      const credential = await firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      )
      user.reauthenticateWithCredential(credential).then(() => {
        user
          .delete()
          .then(() => {
            cookie.remove('token')
            cookie.remove('user_id')
            cookie.remove('token_expire')
            deleteUser()
          })
          .catch((error) => {})
      })
    },
    [password]
  )

  const reauthenticate = () => {
    const user = firebase.auth().currentUser
    firebase
      .auth()
      .currentUser.reauthenticateWithRedirect(
        new firebase.auth.GoogleAuthProvider()
      )
  }

  const deleteGoogleAccount = () => {
    const now = new Date()
    const expireTimestamp = cookie.get('token_expire')
    const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'
    const user = firebase.auth().currentUser
    deleteFirestoreDocument(user.uid)
    user
      .delete()
      .then(() => {
        deleteUser()
        cookie.remove('token')
        cookie.remove('user_id')
        cookie.remove('token_expire')
      })
      .catch((error) => {
        alert('Reauthenticate before delete account')
      })
  }

  const deleteUser = () => {
    deleteAccountMutation.mutate(deleteAccountParam, {
      onError: (res) => {},
      onSuccess: (res) => {},
    })
  }

  if (providerId == 'password') {
    return (
      <>
        <div className="flex  text-red-700 mt-8">
          Delete Account (All your data completely remove)
        </div>
        <form onSubmit={deleteAccount}>
          <input
            type="password"
            placeholder="enter password"
            className="my-3 px-3 py-1 border border-gray-300"
            value={password}
            onChange={passwordChange}
          />
          <button
            disabled={!password}
            type="submit"
            className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
          >
            DELETE ACCOUNT
          </button>
        </form>
      </>
    )
  } else if (providerId == 'google.com') {
    return (
      <>
        <div className="flex float-right ml-4 text-red-700 mt-24">
          Delete Account (All your data completely remove)
        </div>

        <div
          onClick={reauthenticate}
          className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none cursor-pointer"
        >
          Reauthenticate
        </div>

        <div
          onClick={deleteGoogleAccount}
          className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none cursor-pointer"
        >
          DELETE ACCOUNT !
        </div>
      </>
    )
  }
}
