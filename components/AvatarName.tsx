import React from 'react'
import { CogIcon } from '@heroicons/react/solid'
import UserInfomation from './UserInfomation'
import Link from 'next/link'

const AvatarName = (props) => {
  return (
    <div className="flex items-center p-4 pt-7 sm:items-start">
      <img
        className="w-14 h-14 mr-4 rounded-full sm:w-32 sm:h-32"
        src="https://placeimg.com/192/192/people"
        alt=""
      />
      <div className="">
        <div className="font-light text-2xl sm:text-3xl">solardo_823</div>
        <Link href="/account/editprofile">
          <a className="text-sm text-secondary">Edit Profile</a>
        </Link>
        <div className="hidden sm:block">
          <UserInfomation />
        </div>
      </div>
      <div className="ml-auto">
        <Link href="/account/settings">
          <CogIcon className="h-5 w-5 cursor-pointer" />
        </Link>
      </div>
    </div>
  )
}

export default AvatarName
