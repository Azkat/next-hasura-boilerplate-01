import React, { useRef, useState, useEffect, useContext } from 'react'
import { Store } from '../reducer/reducer'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'
import Image from 'next/image'
import { Post } from '../types/types'
import { useQueryPostById } from '../hooks/useQueryPostById'
import { formatDistance, format } from 'date-fns'

const ModalPost = (props) => {
  const [userIconSrc, setUserIconSrc] = useState(``)
  const [audioHost, setAudioHost] = useState(``)
  const [imageHost, setImageHost] = useState(``)
  const { status, data }: any = useQueryPostById(props.id)

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
    console.log(audioHost)
  }, [status])

  return (
    <div className="bg-backgroundGray sm:rounded-lg flex h-full">
      <div className="bg-black w-4/6  relative">
        <Image
          src={`https://vmedia.droptune.net/post_image/${props.id}.jpg`}
          layout="fill"
          objectFit="contain"
          alt=""
        />
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
            <a href={data.audio_url} target="_blank">
              <div className="text-sm text-gray-500 break-all">{audioHost}</div>
            </a>
            <a href={data.image_url} target="_blank">
              <div className="text-sm text-gray-500 break-all">{imageHost}</div>
            </a>
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
        <div className="w-[496px]">&nbsp;</div>
      )}
    </div>
  )
}

export default ModalPost
