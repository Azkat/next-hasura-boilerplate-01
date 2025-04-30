import { ReactNode, useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '../hooks/useUser'
import { MenuIcon } from '@heroicons/react/solid'
import { UserCircleIcon } from '@heroicons/react/solid'
import { PlayIcon } from '@heroicons/react/solid'
import { AuthContext } from '../lib/authProvider'
import DropdownHeaderMenu from './DropdownHeaderMenu'

interface Props {
  children: ReactNode
  title: string
  content: ReactNode
}

export const Navbar = (props) => {
  const { uid } = useUser()
  const [login, setLogin] = useState('loading')
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    setLogin(uid)
  }, [uid])

  return (
    <div className="navbar bg-baseNav ">
      <div className="max-w-xl mx-auto w-full ">
        <div className="navbar-start">
          <DropdownHeaderMenu />
          {/* <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="navbar-center">
          <Link href="/">
            {/* <Image src={`/logo.svg`} width="50" height="35" alt="Droptune" /> */}
            <img src="/logo.png" alt="Droptune" width="50" height="35" />

            {/* <span className="normal-case text-3xl font-bold  duration-200  opacity-95 hover:opacity-80 active:opacity-60">
              Droptune
            </span> */}
          </Link>
        </div>
        <div className="navbar-end flex">
          {/* <Link href="/account">
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
          </Link> */}
        </div>
      </div>
    </div>
  )
}
