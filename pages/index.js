import Head from 'next/head'
import Link from 'next/link'
import Logo from '@components/Logo'
import Footer from '@components/Footer'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#01bf8f] p-4 text-white">
      <Head>
        <title>twodoors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute top-8 right-8">
        {user ? (
          <button 
            onClick={logout}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-sm font-bold border border-white/20"
          >
            Sign Out
          </button>
        ) : (
          <Link 
            href="/login" 
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-sm font-bold border border-white/20"
          >
            Sign In
          </Link>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Logo size="text-5xl sm:text-7xl md:text-8xl" />
        {user && (
          <p className="text-xl font-medium tracking-tight animate-pulse">
            Welcome, <span className="font-bold">{user.displayName || user.email.split('@')[0]}</span>
          </p>
        )}
      </div>

      <div className="absolute bottom-0 w-full px-4">
        <Footer />
      </div>
    </div>
  )
}
