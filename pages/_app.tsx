import '../styles/globals.css'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useUserChanged } from '../hooks/useUserChanged'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { Hydrate } from 'react-query/hydration'

function MyApp({ Component, pageProps }: AppProps) {
  const {} = useUserChanged()
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
          <Component {...pageProps} />
        </Provider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
