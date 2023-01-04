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
                          <Link href="/account/settings">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-8 h-8  text-gray-100 opacity-80 cursor-pointer"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Settings
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
                                fill-rule="evenodd"
                                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                                clip-rule="evenodd"
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
                  <a onClick={close} className="text-gray-500">
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
