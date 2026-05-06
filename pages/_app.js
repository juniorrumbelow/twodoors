import '@styles/globals.css'
import { AuthProvider } from '../context/AuthContext'
import { FavouritesProvider } from '../context/FavouritesContext'

function Application({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <Component {...pageProps} />
      </FavouritesProvider>
    </AuthProvider>
  )
}

export default Application
