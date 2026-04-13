import Head from 'next/head'
import Logo from '@components/Logo'
import AuthStatus from '@components/AuthStatus'
import Footer from '@components/Footer'

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white p-4 text-gray-900">
      <Head>
        <title>Login | whatsplanned</title>
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
