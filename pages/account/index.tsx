import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import Cookie from 'universal-cookie'
import firebase from '../../firebaseConfig'
import { unSubMeta } from '../../hooks/useUserChanged'
import { useRouter } from 'next/router'
import { useUpdateFirebaseEmail } from '../../hooks/useUpdateFirebaseEmail'
import UpdateEmail from '../../components/UpdateEmail'
import UpdateUserName from '../../components/UpdateUserName'
import { DeleteUser } from '../../components/DeleteUser'
import { Forms } from '../../components/Forms'
import { CropImage } from '../../components/imageCrop/CropImage'
import { ImageUploadTest } from '../../components/ImageUploadTest'
import { useQueryUserById } from '../../hooks/useQueryUserById'
import Link from 'next/link'

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
  const [isUser, setIsUser] = useState(false)

  const { status, data } = useQueryUserById(cookie.get('user_id'))

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
    cookie.remove('user_id')
    cookie.remove('token_expire')
    router.push('/login')
  }

  if (!isUser) {
    return <></>
  } else {
    return (
      <Layout title="Account">
        <CropImage />

        <Forms />

        <div className="cursor-pointer mt-16">
          <Link href="/account/createpost">create new post</Link>
        </div>
        <div className="cursor-pointer mt-16">
          <Link href="/account/posts">my posts</Link>
        </div>
        {providerId == 'password' ? <UpdateEmail /> : ''}
        <UpdateUserName data={data} status={status} />

        <ImageUploadTest />

        <div className="cursor-pointer mt-16" onClick={logout}>
          Logout
        </div>

        <DeleteUser />
      </Layout>
    )
  }
}
