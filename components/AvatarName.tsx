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

  useEffect(() => {
    router.pathname == '/account'
      ? setSrc(
          `https://vmedia.droptune.net/user_icon/${cookie.get('user_id')}.jpg`
        )
      : setSrc(`https://vmedia.droptune.net/user_icon/${props.data.id}.jpg`)
  }, [props])

  return (
    <div className="flex items-center p-4 pt-7 sm:items-start">
      {pagePath == '/user/[slug]' ? (
        <img
          className="w-14 h-14 mr-4 rounded-full sm:w-32 sm:h-32"
          src={src}
          alt=""
          onError={() => {
            setSrc(`/noImageYet.png`)
          }}
        />
      ) : (
        <Link href="/account/changeProfileImage" className="contents">
          <img
            className="w-14 h-14 mr-4 rounded-full sm:w-32 sm:h-32 cursor-pointer"
            src={src}
            onError={() => {
              setSrc(`/noImageYet.png`)
            }}
            alt=""
          />
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
