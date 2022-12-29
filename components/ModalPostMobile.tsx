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

const ModalPostMobile = (props) => {
  const [userIconSrc, setUserIconSrc] = useState(``)
  const [audioHost, setAudioHost] = useState(``)
  const [imageHost, setImageHost] = useState(``)
  const { status, data }: any = useQueryPostById(props.id)
  const router = useRouter()

  useEffect(() => {
    if (status == 'success') {
      setUserIconSrc(
        `https://vmedia.droptune.net/user_icon/${data.user.id}.jpg`
      )
      if (data.audio_url) {
        const audioUrlText = new URL(data.audio_url)
        setAudioHost(audioUrlText.host)
      }
      if (data.image_url) {
        const imageUrlText = new URL(data.image_url)
        setImageHost(imageUrlText.host)
      }
    }
  }, [status])

  return (
    <>
      <div className="bg-backgroundGray mb-4 ">
        <div className="h-11 px-4 relative bg-baseBody border-b border-border">
          <ChevronLeftIcon
            className="h-8 w-8 text-gray-100 opacity-80 absolute left-4 top-1/2 -translate-y-1/2"
            onClick={() => router.push(props.aspath.split('?')[0])}
          />
          <div className="justify-center items-center flex h-full">Post</div>
        </div>

        <p className="my-3">
          {status == 'success' ? (
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
          <div className="bg-cover bg-center w-full relative h-vw sm:max-h-[calc(544px)]">
            <Image
              src={`https://vmedia.droptune.net/post_image/${props.id}.jpg`}
              layout="fill"
              objectFit="contain"
              alt=""
            />
            <div className="playbutton absolute">
              <PlayButton post={data} control={false} />
            </div>
            <div className="likebutton absolute h-8 w-8">
              <LikeButton post={props} currentUser={props.currentUser} />
            </div>
          </div>

          <div className="p-4 pt-3">
            {status == 'success' ? (
              <>
                <Link className="font-bold " href={'/post/' + data.id}>
                  {data.title}
                </Link>
                <div className="flex items-center pt-2 w-full ">
                  <div className="text-sm dark:text-white ">
                    {data.description}
                  </div>
                </div>
                <div className="pt-2 ">
                  <a href={data.audio_url} target="_blank" rel="noreferrer">
                    <div className="text-sm text-gray-500 break-all">
                      {audioHost}
                    </div>
                  </a>
                  <a href={data.image_url} target="_blank" rel="noreferrer">
                    <div className="text-sm text-gray-500 break-all">
                      {imageHost}
                    </div>
                  </a>
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
        `}</style>
      </div>
    </>
  )
}

export default ModalPostMobile
