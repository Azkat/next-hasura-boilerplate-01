import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Auth } from '../../components/Auth'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import Link from 'next/link'
import Cookie from 'universal-cookie'
import firebase from '../../firebaseConfig'
import { unSubMeta } from '../../hooks/useUserChanged'
import { useRouter } from 'next/router'
import { useFirebaseEmailUpdate } from '../../hooks/useFirebaseEmailUpdate'
import UpdateEmail from '../../components/UpdateEmail'
import UpdateUserName from '../../components/UpdateUserName'

const cookie = new Cookie()

export default function UserList(props) {
  const router = useRouter()
  const {
    uid,
    providerId,
    email,
    emailChange,
    updateEmail,
    password,
    passwordChange,
  } = useFirebaseEmailUpdate()
  const [isUser, setIsUser] = useState(false)
  useEffect(() => {
    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsUser(true)
        return
      } else {
        router.push('/login')
      }
    })
    return () => {
      unSubUser()
    }
  }, [])

  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    await firebase.auth().signOut()
    cookie.remove('token')
    cookie.remove('id')
    cookie.remove('user_id')
    router.push('/login')
  }

  if (!isUser) {
    return <></>
  } else {
    return (
      <Layout title="Account">
        <div className="cursor-pointer" onClick={logout}>
          Logout
        </div>
        {providerId == 'password' ? <UpdateEmail /> : ''}
        {/* <UpdateUserName /> */}
      </Layout>
    )
  }
}
