import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/">
              <div className="hover:opacity-80 transition-opacity cursor-pointer">
                <Logo size="text-2xl" />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/search?channel=buy"
                className={`text-sm font-bold transition-colors ${router.pathname === '/search' && router.query.channel !== 'rent' ? 'text-[#01bf8f]' : 'text-gray-500 hover:text-[#01bf8f]'}`}
              >
                Buy
              </Link>
              <Link
                href="/search?channel=rent"
                className={`text-sm font-bold transition-colors ${router.pathname === '/search' && router.query.channel === 'rent' ? 'text-[#01bf8f]' : 'text-gray-500 hover:text-[#01bf8f]'}`}
              >
                Rent
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95 ${
                  isDropdownOpen
                    ? "bg-gray-900 text-white"
                    : user
                      ? "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100"
                      : "bg-[#01bf8f] text-white hover:bg-[#019e76]"
                }`}
              >
                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#01bf8f]/10 flex items-center justify-center text-[#01bf8f] text-[10px]">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    Account
                  </div>
                ) : (
                  "For Agents"
                )}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {user ? (
                    <>
                      <div className="px-4 py-2 mb-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Agency Portal
                        </p>
                      </div>
                      <Link
                        href="/agency/listings"
                        className="block px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#01bf8f] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Listings
                      </Link>
                      <Link
                        href="/agency/profile"
                        className="block px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#01bf8f] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Agency Profile
                      </Link>
                      <div className="my-2 border-t border-gray-50"></div>
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#01bf8f] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/agent/login"
                        className="block px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#01bf8f] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Agent Portal
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in border-t border-gray-100 bg-white">
          <div className="px-4 pt-3 pb-3 space-y-1">
            <Link
              href="/search?channel=buy"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${router.pathname === '/search' && router.query.channel !== 'rent' ? 'text-[#01bf8f] bg-[#01bf8f]/5' : 'text-gray-600 hover:text-[#01bf8f] hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Buy
            </Link>
            <Link
              href="/search?channel=rent"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${router.pathname === '/search' && router.query.channel === 'rent' ? 'text-[#01bf8f] bg-[#01bf8f]/5' : 'text-gray-600 hover:text-[#01bf8f] hover:bg-gray-50'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Rent
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-100">
            <div className="px-4 space-y-1">
              {user ? (
                <>
                  <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Account
                  </div>
                  <Link
                    href="/agency/listings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#01bf8f] hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    href="/agency/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#01bf8f] hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agency Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#01bf8f] hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/agent/login"
                    className="block px-3 py-2 mt-2 rounded-full bg-[#01bf8f] text-white text-center text-base font-bold hover:bg-[#019e76] transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agent Portal
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
