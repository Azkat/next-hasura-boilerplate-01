import React, { useEffect, Component, useState } from 'react'
import { Layout } from '../../components/Layout'
import { fetchUserById, fetchUsers } from '../../hooks/useQueryUsers'
import { QueryClient, useQueryClient } from 'react-query'
import { User } from '../../types/types'
import Link from 'next/link'
import { dehydrate } from 'react-query/hydration'
import AvatarName from '../../components/AvatarName'
import UserInfomation from '../../components/UserInfomation'
import Image from 'next/image'
import ModalBase from '../../components/ModalBase'
import { useRouter } from 'next/router'
import { useUserAgent } from 'next-useragent'
import dynamic from 'next/dynamic'
import {
  useQueryUserLikes,
  useQueryUserLikesShow,
} from '../../hooks/useQueryPosts'
import ListSkelton from '../../components/ListSkelton'
import { useQuery } from 'react-query'

const Likes = (props) => {
  const userId = props.data.id
  const {
    data: likes = [],
    isLoading,
    error,
  } = useQuery(
    ['userLikes', userId],
    async () => {
      const res = await fetch(`/api/likes?userId=${userId}`)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      return data.data.likes
    },
    { enabled: !!userId }
  )

  const DynamicUserLikeList = dynamic(
    () => import('../../components/UserLikeList'),
    {}
  )

  return (
    <>
      {isLoading ? (
        <ListSkelton />
      ) : (
        <DynamicUserLikeList data={likes} user={props} path="user" />
      )}
    </>
  )
}

export default function UserList(props) {
  const { userData } = props
  const status = 'success'
  const router = useRouter()
  const [like, setLike] = useState(false)

  const DynamicUserPostList = dynamic(
    () => import('../../components/UserPostList'),
    {
      loading: () => <ListSkelton />,
    }
  )

  return (
    <Layout title={userData.name}>
      <div className="px-4">
        <div className="mt-4 rounded-2xl pb-8 min-h-[628px]">
          <ModalBase aspath={router.asPath} />

          <AvatarName data={userData} status={status} />

          <div className="hidden">
            <UserInfomation data={userData} status={status} />
          </div>
          <div className="flex justify-around px-[60px] pt-4 pb-4">
            <div className="tabs gap-10">
              <a
                className={`tab ${!like && 'tab-active'}`}
                onClick={() => setLike(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
                Posts
              </a>
              <a
                className={`tab ${like && 'tab-active'}`}
                onClick={() => setLike(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                Likes
              </a>
            </div>
          </div>
          {!like && <DynamicUserPostList data={userData} path={'user'} />}
          {like && <Likes data={userData} />}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const user_id = context.params.slug
  const userData = await fetchUserById(user_id)
  return {
    props: {
      userData,
    },
  }
}
