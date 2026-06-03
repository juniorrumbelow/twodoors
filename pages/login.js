import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Logo from '@components/Logo';
import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading && user) {
      router.push('/search');
    }
  }, [user, authLoading, router]);

  return (
    <div className="min-h-screen bg-[#f5f1ea] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Log in | twodoors</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="text-4xl" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">Log in to save properties and manage your alerts.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 rounded-2xl sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
