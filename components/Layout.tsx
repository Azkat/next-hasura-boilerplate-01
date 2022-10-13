import { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Drawer } from './Drawer'
import { useUser } from '../hooks/useUser'

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
      <main className="flex flex-1 flex-col w-screen max-w-3xl mx-auto min-h-[calc(100vh-380px)] sm:max-w-[calc(544px)]">
        {children}
      </main>
      <footer className="w-full h-80 flex justify-center items-center bg-black"></footer>
    </div>
  )
}

export const Layout = ({ children, title = 'Welcome to Nextjs' }) => {
  const { uid } = useUser()

  return (
    <div
      id="postList"
      className="font-body flex flex-col justify-center min-h-screen text-white text-sm "
    >
      <Head>
        <title>{title}</title>
      </Head>

      <Drawer content={<Content>{children}</Content>} />
    </div>
  )
}
