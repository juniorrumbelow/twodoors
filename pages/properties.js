import React from "react";
import Head from "next/head";
import Navbar from "@components/Navbar";
import PropertyCard from "@components/PropertyCard";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Properties({ properties }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Our Properties | Two Doors</title>
      </Head>

      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Available Properties
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Browse our latest selection of premium properties fetched directly
            from our XML feed.
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No properties found in the database. Try running the ingest API
            first!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch properties from Firestore
    const propertiesRef = collection(db, "properties");
    const q = query(propertiesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const properties = querySnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        // Firestore timestamps need to be converted to strings for Next.js props
        createdAt: doc.data().createdAt || null,
      }))
      .sort((a, b) => {
        if (a.isBoosted && !b.isBoosted) return -1;
        if (!a.isBoosted && b.isBoosted) return 1;
        return 0;
      });

    return {
      props: {
        properties: JSON.parse(JSON.stringify(properties)),
      },
    };
  } catch (error) {
    console.error("Error fetching properties from Firestore:", error);
    return {
      props: {
        properties: [],
      },
    };
  }
}
