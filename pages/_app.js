import '@styles/globals.css'
import Head from 'next/head'
import { AuthProvider } from '../context/AuthContext'
import { FavouritesProvider } from '../context/FavouritesContext'

function Application({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <Head>
          <link rel="icon" href="/favicon.png" type="image/png" />
        </Head>
        <Component {...pageProps} />
      </FavouritesProvider>
    </AuthProvider>
  )
}

export default Application
