import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import Navbar from "@components/Navbar";
import PropertyCard from "@components/PropertyCard";
import Footer from "@components/Footer";
import { useAuth } from "../context/AuthContext";
import { useFavourites } from "../context/FavouritesContext";

export default function FavouritesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { favouriteIds } = useFavourites();
  const [properties, setProperties] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user || !db) return;
    if (favouriteIds.size === 0) {
      setProperties([]);
      setFetching(false);
      return;
    }

    const ids = [...favouriteIds];
    setFetching(true);

    Promise.all(
      ids.map((id) => getDoc(doc(db, "properties", id)))
    ).then((snaps) => {
      const found = snaps
        .filter((s) => s.exists())
        .map((s) => {
          const data = s.data();
          return {
            ...data,
            id: s.id,
            createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
          };
        });
      setProperties(found);
      setFetching(false);
    });
  }, [user, favouriteIds]);

  if (authLoading || (!user && !authLoading)) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Saved Properties | Twodoors</title>
      </Head>

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Saved Properties
          </h1>
          <p className="mt-1 text-gray-500 text-sm font-medium">
            {fetching
              ? "Loading…"
              : favouriteIds.size === 0
              ? "You haven't saved any properties yet."
              : `${properties.length} saved propert${properties.length === 1 ? "y" : "ies"}`}
          </p>
        </div>

        {fetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-[#f13053]/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#f13053]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-2">No saved properties</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              Tap the heart icon on any property to save it here for later.
            </p>
            <button
              onClick={() => router.push("/search")}
              className="px-6 py-2.5 bg-[#f13053] text-white text-sm font-bold rounded-full hover:bg-[#d42847] transition-colors"
            >
              Browse properties
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
