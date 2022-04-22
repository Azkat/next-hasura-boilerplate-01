import { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  children: ReactNode
  title: string
}

export const Layout = ({ children, title = 'Welcome to Nextjs' }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-mono ">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex justify-around w-full">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </header>
      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
      <footer className="w-full h-12 flex justify-center items-center border-t"></footer>
    </div>
  )
}
