import React, { useEffect, useState } from 'react'
import { CogIcon } from '@heroicons/react/solid'
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
  const [noAvatarImage, setNoAvatarImage] = useState(false)
  const [userImageLoadComplete, setUserImageLoadComplete] = useState(false)

  console.log(props)

  useEffect(() => {
    if (router.pathname == '/account') {
      setSrc(
        `https://vmedia.droptune.net/user_icon/${cookie.get('user_id')}.jpg`
      )
      if (props.data != undefined) {
        setInitial(props.data.name.slice(0, 1).toUpperCase())
      }
    } else {
      setSrc(`https://vmedia.droptune.net/user_icon/${props.data.id}.jpg`)
      setInitial(props.data.name.slice(0, 1).toUpperCase())
    }
  }, [props])

  return (
    <div className="flex items-center p-4 pt-7 sm:items-start">
      {pagePath == '/user/[slug]' ? (
        <>
          {noAvatarImage ? (
            <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-32 sm:h-32 overflow-hidden rounded-full bg-gray-600 mr-4 ">
              <span className="text-2xl sm:text-5xl text-gray-300">
                {initial}
              </span>
            </div>
          ) : (
            <Image
              src={src}
              className="w-14 h-14 mr-4 rounded-full sm:w-32 sm:h-32 relative"
              layout="fill"
              objectFit="contain"
              onError={() => {
                //setUserIconSrc(`/noImageYet.png`)
                setNoAvatarImage(true)
                setUserImageLoadComplete(true)
              }}
              onLoadingComplete={(target) => {
                setUserImageLoadComplete(true)
              }}
              alt=""
            />
          )}
        </>
      ) : (
        <Link href="/account/changeProfileImage" className="contents">
          {noAvatarImage ? (
            <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-32 sm:h-32 overflow-hidden rounded-full bg-gray-600 mr-4 ">
              <span className=" text-gray-300">{initial}</span>
            </div>
          ) : (
            <Image
              src={src}
              className="w-14 h-14 mr-4 rounded-full sm:w-32 sm:h-32 relative"
              layout="fill"
              objectFit="contain"
              onError={() => {
                //setUserIconSrc(`/noImageYet.png`)
                setNoAvatarImage(true)
                setUserImageLoadComplete(true)
              }}
              onLoadingComplete={(target) => {
                setUserImageLoadComplete(true)
              }}
              alt=""
            />
          )}
        </Link>
      )}

      <div className="">
        <div className="font-light text-2xl sm:text-3xl">
          {props.status == 'success' ? props.data.name : ''}
        </div>
        {pagePath == '/user/[slug]' ? (
          ''
        ) : (
          <div className="mt-2">
            <Link href="/account/editprofile">
              <button className="btn btn-sm btn-outline text-sm">
                Edit Profile
              </button>
            </Link>
          </div>
        )}

        <div className="hidden sm:block">
          <UserInfomation data={props.data} status={props.status} />
        </div>
      </div>

      {pagePath == '/user/[slug]' ? (
        ''
      ) : (
        <div className="ml-auto">
          <Link href="/account/settings">
            <CogIcon className="h-5 w-5 cursor-pointer" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default AvatarName
