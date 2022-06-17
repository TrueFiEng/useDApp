import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const NewComponent: any = Component
  return <NewComponent {...pageProps} />
}

export default MyApp
