import React from 'react'
import { CogIcon } from '@heroicons/react/solid'
import UserInfomation from './UserInfomation'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AvatarName = (props) => {
  const router = useRouter()
  const pagePath = router.pathname

  return (
    <div className="flex items-center p-4 pt-7 sm:items-start">
      <img
        className="w-14 h-14 mr-4 rounded-full sm:w-32 sm:h-32"
        src="https://placeimg.com/192/192/people"
        alt=""
      />
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
