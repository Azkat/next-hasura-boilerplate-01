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
import { Store } from '../reducer/reducer'

const cookie = new Cookie()

function DropdownHeaderMenu(props) {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)
  const { state, dispatch } = useContext(Store)

  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    await firebase.auth().signOut()
    cookie.remove('token')
    cookie.remove('user_id')
    cookie.remove('token_expire')
    dispatch({
      type: 'setAlert',
      payload: { text: 'Logged out', type: 'info' },
    })
    router.push('/')
    router.reload()
  }

  return (
    <div className="dropdown dropdown-end relative">
      <Menu>
        <Menu.Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 hover:opacity-60 duration-200"
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
              <ul className="dropdown-content menu p-2  bg-baseBody rounded-box w-52 font-normal border border-borderLow shadow-xl">
                {(() => {
                  if (currentUser == undefined) {
                    return (
                      <li>
                        <Link href="/account">
                          <UserCircleIcon className="h-8 w-8  text-gray-100 opacity-80 cursor-pointer" />
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
                          <a onClick={logout}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-8 h-8  text-gray-100 opacity-80 cursor-pointer"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Logout
                          </a>
                        </li>
                      </>
                    )
                  }
                })()}

                <li>
                  <a className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8  text-gray-500 opacity-80 cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Close
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
