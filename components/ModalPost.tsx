import React, { useRef, useState, useEffect, useContext } from 'react'
import { Store } from '../reducer/reducer'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'
import Image from 'next/image'
import { PlayIcon } from '@heroicons/react/solid'
import { useQueryPostById } from '../hooks/useQueryPostById'
import { formatDistance, format } from 'date-fns'
import { useRouter } from 'next/router'
import PlayButton from '../components/PlayButton'
import { LinkIcon } from '@heroicons/react/solid'

const ModalPost = (props) => {
  const [userIconSrc, setUserIconSrc] = useState(``)
  const [visualFormat, setVisualFormat] = useState(``)
  const [audioHost, setAudioHost] = useState(``)
  const [imageHost, setImageHost] = useState(``)
  const [closePath, setClosePath] = useState(``)
  const [noAvatarImage, setNoAvatarImage] = useState(false)
  const [initial, setInitial] = useState(``)
  const { state, dispatch } = useContext(Store)
  const { status, data }: any = useQueryPostById(props.id)
  const router = useRouter()

  const videoRef = useRef(null)

  useEffect(() => {
    if (props.path == 'user') {
      setClosePath('user/' + data.user.id)
    }
    if (status == 'success') {
      setUserIconSrc(
        `https://vmedia.droptune.net/user_icon/${data.user.id}.jpg`
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

  return (
    <div className="bg-backgroundGray hidden sm:flex sm:rounded-lg  h-full">
      <div className="bg-black w-4/6  relative">
        <Image
          src={`https://vmedia.droptune.net/post_image/${props.id}.jpg`}
          layout="fill"
          objectFit="contain"
          alt=""
        />
        {visualFormat == 'Video' &&
        state.audioPlay &&
        state.playingId == props.id ? (
          <video
            ref={videoRef}
            playsInline
            autoPlay
            loop
            muted
            src={`https://vmedia.droptune.net/video/${props.id}.mp4`}
            className="w-full video "
          ></video>
        ) : (
          ''
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 absolute top-4 left-4 cursor-pointer"
          onClick={() => router.push(props.aspath.split('?')[0])}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <div className="playbutton absolute h-10 w-10">
          <PlayButton post={data} control={false} />
        </div>
        <div className="likebutton absolute h-8 w-8">
          <LikeButton
            post={props}
            currentUser={props.currentUser}
            big={true}
            control={false}
          />
        </div>
      </div>
      {status == 'success' ? (
        <div className="w-2/6 relative">
          <div className="flex items-center p-4 pt-3">
            <div className="w-8 h-8 mr-2  relative">
              <Link
                href={'/user/' + data.user.id}
                className="contents"
                scroll={false}
              >
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
              {/* <Link href="/account/settings">
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
              </Link> */}
            </div>
          </div>
          <div className="flex items-center p-4 pt-2">
            <div className="text-lg dark:text-white">{data.title}</div>
          </div>
          <div className="flex items-center p-4 pt-2 w-full ">
            <div className="text-sm dark:text-white ">{data.description}</div>
          </div>
          <div className="p-4 pt-2 ">
            {audioHost ? (
              <a
                href={data.audio_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center"
              >
                <div className="h-4 w-4 mr-1 ">
                  <LinkIcon className="h-full w-full  text-gray-100 opacity-80 cursor-pointer" />
                </div>
                <div className="text-sm text-gray-500 break-all">
                  {audioHost}
                </div>
              </a>
            ) : (
              ''
            )}

            {imageHost ? (
              <a
                href={data.image_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center"
              >
                <div className="h-4 w-4 mr-1 ">
                  <LinkIcon className="h-full w-full  text-gray-100 opacity-80 cursor-pointer" />
                </div>
                <div className="text-sm text-gray-500 break-all">
                  {imageHost}
                </div>
              </a>
            ) : (
              ''
            )}
          </div>
          <div className="flex items-center p-4 pt-2  absolute bottom-0">
            <div className="text-sm text-gray-500">
              {formatDistance(Date.parse(data.created_at), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-2/6 relative">
          <div className="flex items-center p-4 pt-3 animate-pulse">
            <div className="w-100% h-8 mr-2  relative ">
              <div className="rounded-full bg-slate-700 h-8 w-100%"></div>
            </div>
            <div className="w-40">
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
          <div className="flex items-center p-4 animate-pulse">
            <div className="w-full">
              <div className="h-2 bg-slate-700 rounded "></div>
              <div className="h-2 bg-slate-700 rounded mt-4"></div>
              <div className="h-2 bg-slate-700 rounded mt-4"></div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .likebutton {
          bottom: 40px;
          right: 16px;
        }
        .playbutton {
          bottom: 40px;
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
      `}</style>
    </div>
  )
}

export default ModalPost
