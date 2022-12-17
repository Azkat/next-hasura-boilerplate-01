import { ReactNode, useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '../hooks/useUser'
import { MenuIcon } from '@heroicons/react/solid'
import { UserCircleIcon } from '@heroicons/react/solid'
import { PlayIcon } from '@heroicons/react/solid'
import { AuthContext } from '../lib/authProvider'

interface Props {
  children: ReactNode
  title: string
  content: ReactNode
}

export const Drawer = (props) => {
  const { uid } = useUser()
  const [login, setLogin] = useState('loading')
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    setLogin(uid)
  }, [uid])

  return (
    <div className="drawer bg-baseBody">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-baseNav">
          <div className="max-w-3xl mx-auto w-full flex">
            <div className="flex-none ">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <h1 className="flex px-2 mx-2 items-center cursor-pointer">
                <Link href="/">
                  <div className="mt-2px">
                    <Image
                      src="/logo.svg"
                      width={120}
                      height={46}
                      alt="Droptune"
                    />
                  </div>
                </Link>
              </h1>
            </div>
            <div className="flex-none mr-2">
              <Link href="/account">
                {(() => {
                  if (currentUser == undefined) {
                    return (
                      <button className="btn btn-sm  btn-primary px-4 py-1">
                        Log in
                      </button>
                    )
                  } else {
                    return (
                      <UserCircleIcon className="h-8 w-8  text-gray-100 opacity-80 cursor-pointer" />
                    )
                  }
                })()}
              </Link>
            </div>
          </div>
        </div>
        {props.content}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 pt-12 overflow-y-auto w-80 bg-baseNav">
          <li className="mb-4">About</li>
          <li className="mb-4">Terms</li>
          <li className="mb-4">Privacy</li>
        </ul>
      </div>
      <style jsx>{`
        .mt-2px {
          margin-top: 9px !important;
        }
      `}</style>
    </div>
  )
}
