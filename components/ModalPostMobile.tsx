import React, { useRef, useState, useEffect, useContext } from 'react'
import { Store } from '../reducer/reducer'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'
import Image from 'next/image'
import { Post } from '../types/types'
import { PlayIcon } from '@heroicons/react/solid'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useQueryPostById } from '../hooks/useQueryPostById'
import { formatDistance, format } from 'date-fns'
import { useRouter } from 'next/router'
import DropdownPostmenu from './DropdownPostmenu'
import PlayButton from '../components/PlayButton'
import { LinkIcon } from '@heroicons/react/solid'

const ModalPostMobile = (props) => {
  const [userIconSrc, setUserIconSrc] = useState(``)
  const [visualFormat, setVisualFormat] = useState(``)
  const [audioHost, setAudioHost] = useState(``)
  const [imageHost, setImageHost] = useState(``)
  const [noAvatarImage, setNoAvatarImage] = useState(false)
  const [initial, setInitial] = useState(``)
  const [videoPlayed, setVideoPlayed] = useState(false)
  const { status, data }: any = useQueryPostById(props.id)
  const { state, dispatch } = useContext(Store)
  const router = useRouter()
  const [imageSize, setImageSize] = useState({
    width: 1,
    height: 1,
  })

  const videoRef = useRef(null)

  useEffect(() => {
    if (status == 'success') {
      setUserIconSrc(
        `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}user_icon/${data.user.id}.jpg`
      )
      setVisualFormat(data.visual_format)
      if (data.audio_url) {
        const audioUrlText = new URL(data.audio_url)
        setAudioHost(audioUrlText.host)
      }
      if (data.image_url) {
        const imageUrlText = new URL(data.image_url)
        setImageHost(imageUrlText.host)
      }
      setInitial(data.user.name.slice(0, 1).toUpperCase())
    }
  }, [status])

  useEffect(() => {
    if (visualFormat == 'Video') {
      if (state.audioPlay && state.playingId == props.id) {
        videoPlayed && videoRef.current?.play()
        setVideoPlayed(true)
      } else if (videoPlayed) {
        videoRef.current?.pause()
      }
    }
  }, [state.audioPlay, visualFormat, state.playingId])

  return (
    <>
      <div className="bg-backgroundGray mb-4 pb-40 break-words">
        <div className="h-11 px-4 relative bg-baseBody border-b border-border">
          <ChevronLeftIcon
            className="h-8 w-8 text-gray-100 opacity-80 absolute left-4 top-1/2 -translate-y-1/2"
            onClick={() => router.push(props.aspath.split('?')[0])}
          />
          <div className="justify-center items-center flex h-full">Post</div>
        </div>

        <p className="my-3 wrap-anywhere">
          {status == 'success' ? (
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
          ) : (
            <div className="flex items-center p-4 pt-3 animate-pulse">
              <div className="w-8 h-8 mr-2  relative ">
                <div className="rounded-full bg-slate-700 h-8 w-8"></div>
              </div>
              <div className="w-40">
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          )}

          {visualFormat != 'None' && (
            <div className="bg-cover bg-center w-full relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}post_image/${props.id}.jpg`}
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
              {visualFormat == 'Video' && videoPlayed ? (
                <video
                  ref={videoRef}
                  id="video"
                  playsInline
                  autoPlay
                  loop
                  muted
                  src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}video/${props.id}.mp4`}
                  className="w-full video "
                ></video>
              ) : (
                ''
              )}
              <div className="playbutton absolute h-10 w-10">
                <PlayButton post={data} control={false} />
              </div>
              <div className="likebutton absolute h-8 w-8 overflow-hidden">
                <LikeButton
                  post={props}
                  currentUser={props.currentUser}
                  control={false}
                />
              </div>
            </div>
          )}

          <div className="p-4 pt-3">
            {status == 'success' ? (
              <>
                <div className="flex items-center pt-4">
                  {visualFormat == 'None' && (
                    <div className="playbutton ml-[-4px] mr-4 h-10 w-10">
                      <PlayButton post={data} control={false} />
                    </div>
                  )}
                  <Link
                    className="font-bold text-lg dark:text-white"
                    href={'/post/' + data.id}
                  >
                    {data.title}
                  </Link>
                  {visualFormat == 'None' && (
                    <div className="likebutton  h-8 w-8 ml-auto">
                      <LikeButton
                        post={props}
                        currentUser={props.currentUser}
                        control={false}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center pt-2 w-full ">
                  <div className="text-sm dark:text-white ">
                    {data.description}
                  </div>
                </div>
                <div className="pt-8 flex flex-col gap-1">
                  {data.audio_url && (
                    <a
                      href={data.audio_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center"
                    >
                      <div className="h-4 w-4 mr-1">
                        <LinkIcon className="h-full w-full  text-gray-100 opacity-80 cursor-pointer" />
                      </div>
                      <div className="text-sm text-gray-500 break-all">
                        {audioHost}
                      </div>
                    </a>
                  )}
                  {data.image_url && (
                    <a
                      href={data.image_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center"
                    >
                      <div className="h-4 w-4 mr-1">
                        <LinkIcon className="h-full w-full  text-gray-100 opacity-80 cursor-pointer" />
                      </div>
                      <div className="text-sm text-gray-500 break-all">
                        {imageHost}
                      </div>
                    </a>
                  )}
                </div>
                <div className="flex items-center pt-8">
                  <div className="text-xs text-gray-500">
                    {formatDistance(Date.parse(data.created_at), new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center pt-4 animate-pulse">
                <div className="w-full">
                  <div className="h-2 bg-slate-700 rounded "></div>
                  <div className="h-2 bg-slate-700 rounded mt-4"></div>
                  <div className="h-2 bg-slate-700 rounded mt-4"></div>
                </div>
              </div>
            )}
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
          .video {
            object-fit: contain;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
          }
          .wrap-anywhere {
            overflow-wrap: anywhere;
          }
        `}</style>
      </div>
    </>
  )
}

export default ModalPostMobile
