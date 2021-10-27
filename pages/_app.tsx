import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayOut } from '../components/layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayOut>
      <Head>
        <title>Spoof Poster</title>
        <meta name="description" content="Spoof Poster is a mock of a social media platform being created as a dev project by Arnab Roy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </LayOut>
  )
}
export default MyApp
