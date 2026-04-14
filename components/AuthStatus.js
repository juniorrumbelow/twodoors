import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthStatus() {
  /*
  const { user, loginWithGoogle, logout, loginWithEmail, signupWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState(null);

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return isSigningUp 
          ? "This email is already in use or the credentials are invalid." 
          : "Incorrect email or password. Please try again or sign up.";
      case 'auth/user-not-found':
        return "No account found with this email. Please sign up instead.";
      case 'auth/wrong-password':
        return "Incorrect password. Please try again.";
      case 'auth/email-already-in-use':
        return "An account already exists with this email address.";
      case 'auth/weak-password':
        return "Password should be at least 6 characters long.";
      case 'auth/invalid-email':
        return "Please enter a valid email address.";
      case 'auth/popup-closed-by-user':
        return "The login window was closed before completing.";
      case 'auth/configuration-not-found':
        return "Authentication is not configured correctly on the server. Please contact support.";
      case 'auth/too-many-requests':
        return "Too many unsuccessful attempts. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSigningUp) {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 text-gray-900 shadow-xl animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-3">
          {user.photoURL && (
            <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border border-gray-100" />
          )}
          <div>
            <p className="font-bold">{user.displayName || user.email}</p>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Connected</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all text-sm font-bold border border-red-200 active:scale-95"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl border border-gray-100 shadow-2xl text-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">
        {isSigningUp ? 'Create your account' : 'Welcome back'}
      </h2>
      
      <div className="space-y-4 mb-8">
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-gray-700 rounded-xl font-bold border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 transition-all outline-none shadow-sm active:scale-[0.98]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt=""/>
          {isSigningUp ? 'Sign up with Google' : 'Continue with Google'}
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
          <span className="bg-white px-3 text-gray-400">Or with email</span>
        </div>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-5">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#01bf8f] focus:bg-white placeholder-gray-400 text-gray-900 outline-none transition-all font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" name="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#01bf8f] focus:bg-white placeholder-gray-400 text-gray-900 outline-none transition-all font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div key={error} className="p-3 bg-red-50 border border-red-100 rounded-xl animate-in shake-in duration-200">
            <p className="text-red-600 text-xs text-center font-bold">{error}</p>
          </div>
        )}
        <button
          type="submit"
          className={`w-full py-4 px-4 rounded-xl font-bold text-lg transition-all shadow-xl outline-none focus:ring-4 ${
            isSigningUp 
              ? 'bg-gray-900 hover:bg-black text-white shadow-gray-900/20 focus:ring-gray-900/50' 
              : 'bg-[#01bf8f] hover:bg-[#01a67d] text-white shadow-[#01bf8f]/20 focus:ring-[#01bf8f]/50'
          }`}
        >
          {isSigningUp ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500 font-medium">
        {isSigningUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSigningUp(!isSigningUp)}
          className="text-[#01bf8f] hover:text-[#01a67d] font-bold transition-all px-1"
        >
          {isSigningUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
  */
  return null;
}
