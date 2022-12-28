import '../styles/globals.css'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { AuthProvider } from '../lib/authProvider'
import { Hydrate } from 'react-query/hydration'
import UserChanged from '../components/UserChanged'
import AudioControl from '../components/AudioControl'
import Cookie from 'universal-cookie'
import { ReducerProvider } from '../reducer/reducer'
import NextNprogress from 'nextjs-progressbar'
import WebAudio from '../components/WebAudio'

const cookie = new Cookie()

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <ReducerProvider>
            <AuthProvider>
              <UserChanged />
              <NextNprogress
                color="#44ADED"
                startPosition={0.3}
                stopDelayMs={200}
                height={2}
                showOnShallow={true}
                options={{ showSpinner: false }}
              />

              <Component {...pageProps} />
              <AudioControl />
              <WebAudio />
            </AuthProvider>
          </ReducerProvider>
        </Provider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
