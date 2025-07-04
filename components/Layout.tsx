import { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Drawer } from './Drawer'
import { Navbar } from './Navbar'
import { useUser } from '../hooks/useUser'
import { useRouter } from 'next/router'

interface Props {
  children: ReactNode
  title: string
  content?: ReactNode
}

const Content = ({ children }) => {
  const { uid } = useUser()

  return (
    <div className="">
      {/* {uid ? 'ログイン済み' : '未ログイン'} */}
      <main className="flex flex-1 flex-col w-screen py-4 max-w-3xl mx-auto min-h-[calc(100vh-240px)] {/*sm:max-w-[calc(544px)]*/} sm:max-w-xl pb-[120px]">
        {children}
      </main>
      <footer className="w-full h-60 flex justify-center items-center bg-black"></footer>
    </div>
  )
}

export const Layout = ({ children, title = 'Droptune' }) => {
  const { uid } = useUser()
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV
  const router = useRouter()

  return (
    <div
      id="postList"
      className="font-body flex flex-col justify-center  text-white text-sm bg-baseBody"
    >
      <Head>
        {router.pathname == '/' ? (
          <title>Droptune</title>
        ) : (
          <title>{title} - Droptune</title>
        )}
      </Head>

      <Navbar />

      <Content>{children}</Content>

      {/* <Drawer content={<Content>{children}</Content>} /> */}
    </div>
  )
}
