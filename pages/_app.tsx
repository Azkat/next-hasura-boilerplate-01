import '../styles/globals.css'
import { useState } from 'react'
import { useUserChanged } from '../hooks/useUserChanged'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const {} = useUserChanged()

  return <Component {...pageProps} />
}

export default MyApp
