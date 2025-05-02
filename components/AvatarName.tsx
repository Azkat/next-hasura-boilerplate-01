import React, { useEffect, useState } from 'react'
import { CogIcon } from '@heroicons/react/solid'
import { PencilIcon } from '@heroicons/react/solid'
import UserInfomation from './UserInfomation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

const AvatarName = (props) => {
  const router = useRouter()
  const pagePath = router.pathname
  const [src, setSrc] = useState(``)
  const [initial, setInitial] = useState(``)
  const [noAvatarImage, setNoAvatarImage] = useState(true)
  const [userImageLoadComplete, setUserImageLoadComplete] = useState(false)

  useEffect(() => {
    if (router.pathname == '/account') {
      setSrc(
        `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}user_icon/${cookie.get(
          'user_id'
        )}.jpg`
      )
      if (props.data != undefined) {
        setInitial(props.data.name.slice(0, 1).toUpperCase())
      }
    } else {
      setSrc(
        `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}user_icon/${props.data.id}.jpg`
      )
      setInitial(props.data.name.slice(0, 1).toUpperCase())
    }
  }, [props])

  return (
    <div className="flex flex-col items-center justify-center p-4 pt-7 rounded-2xl bg-backgroundGray border border-stone-800">
      {pagePath == '/user/[slug]' ? (
        <div className="w-14 h-14 rounded-full sm:w-20 sm:h-20 relative">
          <Image
            src={src}
            className="w-14 h-14 mr-4 rounded-full sm:w-20 sm:h-20 absolute"
            layout="fill"
            objectFit="contain"
            onError={() => {
              //setUserIconSrc(`/noImageYet.png`)
              setNoAvatarImage(true)
              setUserImageLoadComplete(true)
            }}
            onLoadingComplete={(target) => {
              setNoAvatarImage(false)
              setUserImageLoadComplete(true)
            }}
            alt=""
          />
          {noAvatarImage && (
            <div className="absolute inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 overflow-hidden rounded-full bg-gray-600">
              <span className="text-xl sm:text-2xl text-gray-300">
                {initial}
              </span>
            </div>
          )}
        </div>
      ) : (
        <Link href="/account/changeProfileImage" className="contents">
          <div className="w-14 h-14 rounded-full sm:w-20 sm:h-20 relative">
            <Image
              src={src}
              className="w-14 h-14 rounded-full sm:w-20 sm:h-20 absolute"
              layout="fill"
              objectFit="contain"
              onError={() => {
                //setUserIconSrc(`/noImageYet.png`)
                setNoAvatarImage(true)
                setUserImageLoadComplete(true)
              }}
              onLoadingComplete={(target) => {
                setNoAvatarImage(false)
                setUserImageLoadComplete(true)
              }}
              alt=""
            />
            {noAvatarImage && (
              <div className="absolute inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 overflow-hidden rounded-full bg-gray-600">
                <span className="text-xl sm:text-2xl text-gray-300">
                  {initial}
                </span>
              </div>
            )}
          </div>
        </Link>
      )}

      <div className="flex flex-col items-center mt-2">
        <div className="text-xl sm:text-xl font-bold">
          {props.status == 'success' ? props.data.name : ''}
        </div>

        <div className="sm:block">
          <UserInfomation data={props.data} status={props.status} />
        </div>
      </div>

      {pagePath == '/user/[slug]' ? (
        ''
      ) : (
        <div className="flex flex-row gap-2 mt-2 w-full">
          <Link href="/account/editprofile" className="flex-1">
            <button className="btn btn-sm btn-outline text-sm w-full flex items-center justify-center">
              <PencilIcon className="h-5 w-5 mr-1" />
              Edit Profile
            </button>
          </Link>
          <Link href="/account/settings" className="flex-1">
            <button className="btn btn-sm btn-outline text-sm w-full flex items-center justify-center">
              <CogIcon className="h-5 w-5 mr-1" />
              Account Setting
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default AvatarName
