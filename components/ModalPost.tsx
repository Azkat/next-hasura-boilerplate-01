import React, { useRef, useState, useEffect, useContext } from 'react'
import { Store } from '../reducer/reducer'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'
import Image from 'next/image'
import { Post } from '../types/types'
import { useQueryPostById } from '../hooks/useQueryPostById'

const ModalPost = (props) => {
  const [userIconSrc, setUserIconSrc] = useState(``)
  const { status, data }: any = useQueryPostById(props.id)

  useEffect(() => {
    if (status == 'success') {
      console.log(data)
      setUserIconSrc(
        `https://vmedia.droptune.net/user_icon/${data.user.id}.jpg`
      )
    }
  }, [status])

  return (
    <div className="bg-backgroundGray sm:rounded-lg flex h-full">
      <div className="bg-black w-full relative">
        <Image
          src={`https://vmedia.droptune.net/post_image/${props.id}.jpg`}
          layout="fill"
          objectFit="contain"
          alt=""
        />
      </div>
      {status == 'success' ? (
        <div className="w-[496px]">
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
        </div>
      ) : (
        <div className="w-[496px]">&nbsp;</div>
      )}
    </div>
  )
}

export default ModalPost
