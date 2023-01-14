import { Menu } from '@headlessui/react'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Store } from '../reducer/reducer'

function DropdownPostmenu(props) {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)

  const showAlert = () => {
    dispatch({
      type: 'setAlert',
      payload: { text: 'URL copied to clipboard!', type: 'success' },
    })
  }

  return (
    <div className="dropdown dropdown-end">
      <Menu>
        <Menu.Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:opacity-60 duration-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <ul className="dropdown-content menu p-2 shadow bg-baseBody rounded-box w-52 font-normal">
                <li>
                  <CopyToClipboard
                    text={`https://` + location.hostname + `/post/` + props.id}
                    onCopy={() => showAlert()}
                  >
                    <div className="ml-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                        <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                      </svg>
                      <div className="ml-1">Copy link</div>
                    </div>
                  </CopyToClipboard>
                </li>
                <li>
                  <a className="text-gray-500" onClick={close}>
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
                    <div>Close</div>
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

export default DropdownPostmenu
