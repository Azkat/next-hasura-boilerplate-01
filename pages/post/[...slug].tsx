import React, { Component, useContext, useState } from 'react'
import { Layout } from '../../components/Layout'
import { fetchPostById } from '../../hooks/useQueryPostById'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import Link from 'next/link'
import { dehydrate } from 'react-query/hydration'
import { LikeButton } from '../../components/LikeButton'
import { PlayIcon } from '@heroicons/react/solid'
import { Store } from '../../reducer/reducer'
import Image from 'next/image'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post>('post')
  const { state, dispatch } = useContext(Store)
  const [userIconSrc, setUserIconSrc] = useState(
    `https://vmedia.droptune.net/user_icon/${data.user.id}.jpg`
  )

  return (
    <Layout title={data.title}>
      <div className="bg-backgroundGray mt-8 mb-4 rounded-lg">
        <p className="font-bold my-3" key={data.id}>
          <div className="flex items-center p-4 pt-3">
            <div className="w-8 h-8 mr-2  relative">
              <Link href={'/user/' + data.user.id} className="contents">
                <Image
                  src={userIconSrc}
                  className="w-8 h-8 mr-2 rounded-full sm:w-8 sm:h-8"
                  layout="fill"
                  objectFit="contain"
                  onError={() => {
                    setUserIconSrc(`/noImageYet.png`)
                  }}
                  alt=""
                />
              </Link>
            </div>
            <div className="font-light dark:text-white">
              <Link href={'/user/' + data.user.id}>{data.user.name}</Link>
            </div>
            <div className="ml-auto">
              <Link href="/account/settings">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="bg-cover bg-center w-full relative h-vw sm:max-h-[calc(544px)]">
            <Image
              src={`https://vmedia.droptune.net/post_image/${data.id}.jpg`}
              layout="fill"
              objectFit="contain"
              alt=""
            />
            <div className="playbutton absolute">
              <PlayIcon className="h-8 w-8  text-gray-100 opacity-80" />
            </div>
            <div className="likebutton absolute">
              <LikeButton />
            </div>
          </div>
          <div className="p-4 pt-3">
            <Link href={'/post/' + data.id}>{data.title}</Link>
          </div>
        </p>

        <style jsx>{`
          .h-vw {
            height: 100vw;
          }
          .likebutton {
            bottom: 24px;
            right: 16px;
          }
          .playbutton {
            bottom: 24px;
            left: 16px;
          }
        `}</style>
      </div>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const post_id = await context.params.slug[0]
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('post', () => fetchPostById(post_id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
