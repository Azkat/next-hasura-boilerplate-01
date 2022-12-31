import { Menu } from '@headlessui/react'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { AuthContext } from '../lib/authProvider'
import Link from 'next/link'
import { UserCircleIcon } from '@heroicons/react/solid'
import firebase from '../firebaseConfig'
import { unSubMeta } from '../hooks/useUserChanged'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

function DropdownHeaderMenu(props) {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)

  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    await firebase.auth().signOut()
    cookie.remove('token')
    cookie.remove('user_id')
    cookie.remove('token_expire')
    router.push('/')
  }

  return (
    <div className="dropdown dropdown-end relative">
      <Menu>
        <Menu.Button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </Menu.Button>
        <Menu.Items className="absolute top-[32px] left-[210px] ">
          <Menu.Item>
            {({ active }) => (
              <ul className="dropdown-content menu p-2 shadow bg-baseBody rounded w-52 font-normal border border-borderLow shadow-xl">
                {(() => {
                  if (currentUser == undefined) {
                    return (
                      <li>
                        <Link href="/account">
                          <>Login</>
                        </Link>
                      </li>
                    )
                  } else {
                    return (
                      <>
                        <li>
                          <Link href="/account">
                            <UserCircleIcon className="h-8 w-8  text-gray-100 opacity-80 cursor-pointer" />
                            Account
                          </Link>
                        </li>
                        <li>
                          <Link href="/account/settings">Settings</Link>
                        </li>
                        <li>
                          <a onClick={logout}>Logout</a>
                        </li>
                      </>
                    )
                  }
                })()}

                <li>
                  <a onClick={close} className="text-gray-500">
                    Cancel
                  </a>
                </li>
              </ul>
            )}
          </Menu.Item>
          {/* <Menu.Item disabled>
            <span className="opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item> */}
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default DropdownHeaderMenu
