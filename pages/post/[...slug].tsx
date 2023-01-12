import React, {
  Component,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
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
import PlayButton from '../../components/PlayButton'
import { AuthContext } from '../../lib/authProvider'

export default function UserList(props) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Post>('post')
  const { state, dispatch } = useContext(Store)
  const [userIconSrc, setUserIconSrc] = useState(
    `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}user_icon/${data.user.id}.jpg`
  )
  const [audioHost, setAudioHost] = useState(``)
  const [imageHost, setImageHost] = useState(``)
  const [imageSize, setImageSize] = useState({
    width: 1,
    height: 1,
  })
  const [noAvatarImage, setNoAvatarImage] = useState(false)
  const [initial, setInitial] = useState(``)
  const { currentUser } = useContext(AuthContext)
  const videoRef = useRef(null)

  useEffect(() => {
    if (data.audio_url) {
      const audioUrlText = new URL(data.audio_url)
      setAudioHost(audioUrlText.host)
    }
    if (data.image_url) {
      const imageUrlText = new URL(data.image_url)
      setImageHost(imageUrlText.host)
    }
    setInitial(data.user.name.slice(0, 1).toUpperCase())
  }, [])

  return (
    <Layout title={data.title}>
      <div className="bg-backgroundGray mt-0 mb-4 sm:rounded-lg sm:mt-8">
        <p className="font-normal my-3" key={data.id}>
          <div className="flex items-center p-4 pt-3">
            <div className="w-8 h-8 mr-2  relative">
              <Link href={'/user/' + data.user.id} className="contents">
                {noAvatarImage ? (
                  <div className="relative inline-flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 overflow-hidden rounded-full bg-gray-600 mr-4 ">
                    <span className="text-md sm:text-md text-gray-300">
                      {initial}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={userIconSrc}
                    className="w-8 h-8 mr-4 rounded-full sm:w-8 sm:h-8 relative"
                    layout="fill"
                    objectFit="contain"
                    onError={() => {
                      setNoAvatarImage(true)
                    }}
                    onLoadingComplete={(target) => {}}
                    alt=""
                  />
                )}
              </Link>
            </div>
            <div className="font-light dark:text-white">
              <Link href={'/user/' + data.user.id}>{data.user.name}</Link>
            </div>
            <div className="ml-auto">
              <DropdownPostmenu id={data.id} />
            </div>
          </div>
          <div className="bg-cover bg-center w-full relative ">
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}post_image/${data.id}.jpg`}
              layout="responsive"
              objectFit="contain"
              alt=""
              onLoadingComplete={(target) => {
                setImageSize({
                  width: target.naturalWidth,
                  height: target.naturalHeight,
                })
              }}
              width={imageSize.width}
              height={imageSize.height}
            />
            {data.visual_format == 'Video' &&
            state.audioPlay &&
            state.playingId == data.id ? (
              <div className="w-full h-full flex items-center">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  loop
                  muted
                  src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}video/${data.id}.mp4`}
                  className="w-full absolute top-0 left-0"
                ></video>
              </div>
            ) : (
              ''
            )}
            <div className="playbutton absolute h-10 w-10">
              <PlayButton post={data} control={false} />
            </div>
            <div className="likebutton absolute h-8 w-8">
              <LikeButton post={data} currentUser={currentUser} />
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
