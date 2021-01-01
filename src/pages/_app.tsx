import '../index.css'

import { AppProps } from 'next/app'
import { AuthProvider } from '../firebase/auth'
import Head from 'next/head'

const CS50Gram: React.FC<null> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>CS50Gram</title>
    </Head>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
)

export default CS50Gram
