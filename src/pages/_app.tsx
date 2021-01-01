import '../index.css'

import { AppProps } from 'next/app'
import Head from 'next/head'

const CS50Gram = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>CS50Gram</title>
    </Head>
    <Component {...pageProps} />
  </>
)

export default CS50Gram
