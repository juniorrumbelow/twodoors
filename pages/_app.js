import '@styles/globals.css'
import Head from 'next/head'
import { AuthProvider } from '../context/AuthContext'
import { FavouritesProvider } from '../context/FavouritesContext'

function Application({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <Component {...pageProps} />
      </FavouritesProvider>
    </AuthProvider>
  )
}

export default Application
