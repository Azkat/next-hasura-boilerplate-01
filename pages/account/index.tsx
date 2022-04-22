import React, { Component } from 'react'
import { Layout } from '../../components/Layout'
import { Auth } from '../../components/Auth'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import Link from 'next/link'
import Cookie from 'universal-cookie'
import firebase from '../../firebaseConfig'
import { unSubMeta } from '../../hooks/useUserChanged'
import { useRouter } from 'next/router'

const cookie = new Cookie()

export default function UserList(props) {
  const router = useRouter()

  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    await firebase.auth().signOut()
    cookie.remove('token')
    router.push('/')
  }

  return (
    <Layout title="Account">
      <div className="cursor-pointer" onClick={logout}>
        Logout
      </div>
    </Layout>
  )
}
