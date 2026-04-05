import Head from 'next/head'
import Logo from '@components/Logo'
import AuthStatus from '@components/AuthStatus'
import Footer from '@components/Footer'

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#01bf8f] p-4 text-white">
      <Head>
        <title>Login | twodoors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-8 mb-8 text-center">
        <Logo size="text-4xl sm:text-5xl md:text-6xl" />
      </div>

      <AuthStatus />

      <Footer />
    </div>
  )
}
