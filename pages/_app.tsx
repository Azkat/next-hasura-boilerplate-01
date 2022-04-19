import '../styles/globals.css'
import { useState } from 'react'
import { useUserChanged } from '../hooks/useUserChanged'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
