import React, { Component, useContext, useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { fetchPostById } from '../../hooks/useQueryPostById'
import { QueryClient, useQueryClient } from 'react-query'
import { Post } from '../../types/types'
import Link from 'next/link'
import { dehydrate } from 'react-query/hydration'
import { LikeButton } from '../../components/LikeButton'
import { PlayIcon } from '@heroicons/react/solid'
import { Store } from '../../reducer/reducer'
import { formatDistance, format } from 'date-fns'
import Image from 'next/image'
import DropdownPostmenu from '../../components/DropdownPostmenu'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post>('post')
  const { state, dispatch } = useContext(Store)
  const [userIconSrc, setUserIconSrc] = useState(
    `https://vmedia.droptune.net/user_icon/${data.user.id}.jpg`
  )
  const [audioHost, setAudioHost] = useState(``)
  const [imageHost, setImageHost] = useState(``)

  useEffect(() => {
    if (data.audio_url) {
      const audioUrlText = new URL(data.audio_url)
      setAudioHost(audioUrlText.host)
    }
    if (data.image_url) {
      const imageUrlText = new URL(data.image_url)
      setImageHost(imageUrlText.host)
    }
  }, [])

  return (
    <Layout title={data.title}>
      <div className="bg-backgroundGray mt-8 mb-4 sm:rounded-lg">
        <p className="font-normal my-3" key={data.id}>
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
              <DropdownPostmenu id={data.id} />
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
          <div className="flex items-center p-4 pt-4">
            <div className="text-lg dark:text-white font-bold">
              {data.title}
            </div>
          </div>
          <div className="flex items-center p-4 pt-2 w-full ">
            <div className="text-sm dark:text-white ">{data.description}</div>
          </div>
          <div className="p-4 pt-2 ">
            <a href={data.audio_url} target="_blank" rel="noreferrer">
              <div className="text-sm text-gray-500 break-all">{audioHost}</div>
            </a>
            <a href={data.image_url} target="_blank" rel="noreferrer">
              <div className="text-sm text-gray-500 break-all">{imageHost}</div>
            </a>
          </div>
          <div className="flex items-center p-4 pt-12">
            <div className="text-xs text-gray-500">
              {formatDistance(Date.parse(data.created_at), new Date(), {
                addSuffix: true,
              })}
            </div>
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
