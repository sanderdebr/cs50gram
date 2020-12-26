import '../index.css'

import { AppProps } from 'next/app'
import { FirebaseProvider } from '../firebase/context'
import Head from 'next/head'

const CS50Gram: React.FC<null> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>CS50Gram</title>
    </Head>
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  </>
)

export default CS50Gram
