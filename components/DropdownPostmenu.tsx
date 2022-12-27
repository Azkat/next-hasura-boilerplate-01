import { Menu } from '@headlessui/react'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function DropdownPostmenu(props) {
  const router = useRouter()

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
            className="w-6 h-6"
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
                    onCopy={() => alert('Link URL copied.')}
                  >
                    <div>Copy link</div>
                  </CopyToClipboard>
                </li>
                <li>
                  <a onClick={close}>Cancel</a>
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
