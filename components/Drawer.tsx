import { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '../hooks/useUser'
import { MenuIcon } from '@heroicons/react/solid'

interface Props {
  children: ReactNode
  title: string
  content: ReactNode
}

export const Drawer = (props) => {
  const { uid } = useUser()

  return (
    <div className="drawer bg-baseBody">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-baseNav">
          <div className="max-w-3xl mx-auto w-full flex">
            <div className="flex-none lg:hidden">
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
                  <Image
                    src="/logo.svg"
                    width={80}
                    height={31}
                    alt="Droptune"
                  />
                </Link>
              </h1>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <li>
                  <a>Navbar Item 1</a>
                </li>
                <li>
                  <a>Navbar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {props.content}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-baseNav">
          <Link href="/account">
            <li className="mb-4">
              <button className="btn btn-wide btn-primary">Log in</button>
            </li>
          </Link>
          <li className="mb-7">
            <button className="btn btn-wide btn-primary btn-outline">
              Sign up
            </button>
          </li>
          <li className="mb-4">About</li>
          <li className="mb-4">Terms</li>
          <li className="mb-4">Privacy</li>
        </ul>
      </div>
    </div>
  )
}
