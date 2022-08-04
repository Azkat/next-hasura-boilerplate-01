import { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '../hooks/useUser'
import { MenuIcon } from '@heroicons/react/solid'

interface Props {
  children: ReactNode
  title: string
}

export const Header = () => {
  const { uid } = useUser()

  return <header className="flex justify-around w-full"></header>
}
