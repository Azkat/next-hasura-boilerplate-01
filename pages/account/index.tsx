import React, { Fragment, useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../lib/authProvider'
import { Post } from '../../types/types'
import { Layout } from '../../components/Layout'
import Cookie from 'universal-cookie'
import firebase from '../../firebaseConfig'
import { unSubMeta } from '../../hooks/useUserChanged'
import { useRouter } from 'next/router'
import { useUpdateFirebaseEmail } from '../../hooks/useUpdateFirebaseEmail'
import AvatarName from '../../components/AvatarName'
import UserInfomation from '../../components/UserInfomation'
import { PlusSmIcon } from '@heroicons/react/solid'
import { useQueryUserById } from '../../hooks/useQueryUserById'
import Link from 'next/link'
import { QueryClient, useQueryClient } from 'react-query'
import dynamic from 'next/dynamic'
import ModalBase from '../../components/ModalBase'

const cookie = new Cookie()

export default function Account(props) {
  const router = useRouter()
  const {
    uid,
    providerId,
    email,
    emailChange,
    updateEmail,
    password,
    passwordChange,
  } = useUpdateFirebaseEmail()
  const queryClient = useQueryClient()
  const postsData = queryClient.getQueryData<Post[]>('posts')
  const [isUser, setIsUser] = useState(false)
  const { status, data } = useQueryUserById(cookie.get('user_id'))
  const { currentUser } = useContext(AuthContext)
  !currentUser ? router.replace('/login') : ''

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

  const DynamicUserPostList = dynamic(
    () => import('../../components/UserPostList'),
    {
      //loading: () => 'Loading...',
    }
  )

  if (!isUser) {
    return <></>
  } else {
    return (
      <Layout title="Account">
        <div className="bg-backgroundGray mt-4 sm:rounded-2xl pb-8">
          <ModalBase aspath={router.asPath} />
          <AvatarName data={data} status={status} />
          <div className="block sm:hidden">
            <UserInfomation data={data} status={status} />
          </div>

          <div className="px-4 mb-6">
            <Link href="/account/createPost">
              <button className="btn btn-block bg-gradient-to-r from-teal-300 to-violet-700 text-white">
                <PlusSmIcon className="h-5 w-5" />
                New Post
              </button>
            </Link>
          </div>

          {data ? <DynamicUserPostList data={data} path={'account'} /> : ''}
        </div>
      </Layout>
    )
  }
}
