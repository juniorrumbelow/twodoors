import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@components/Navbar";
import PropertyCard from "@components/PropertyCard";
import { db } from "../../../../lib/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Link from "next/link";
import { extractAgentIdFromSlug } from "../../../../utils/formatters";

const TABS = [
  { key: "sales", label: "For Sale", dept: "Residential Sales" },
  { key: "lettings", label: "To Let", dept: "Residential Lettings" },
];

export default function AgentDetail({ agent, properties }) {
  const [activeTab, setActiveTab] = useState("sales");

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Agent Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            We couldn't find an agent with that profile.
          </p>
          <Link
            href="/search"
            className="text-[#f13053] font-bold hover:underline"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const activeTabDept = TABS.find((t) => t.key === activeTab)?.dept;
  const visibleProperties = properties.filter(
    (p) => p.department === activeTabDept,
  );

  const salesCount = properties.filter(
    (p) => p.department === "Residential Sales",
  ).length;
  const lettingsCount = properties.filter(
    (p) => p.department === "Residential Lettings",
  ).length;

  const counts = { sales: salesCount, lettings: lettingsCount };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{agent.name} | TwoDoors Properties</title>
      </Head>

      <Navbar />

      {/* Agent Profile Banner */}
      <div className="bg-white border-b border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            {agent.logo ? (
              <img
                src={agent.logo}
                alt={agent.name}
                className="w-32 h-32 rounded-full border-4 border-gray-50 shadow-md object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-gray-50 shadow-md bg-[#f13053]/10 flex items-center justify-center">
                <span className="text-[#f13053] text-5xl font-black">
                  {agent.name?.charAt(0) || "A"}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {agent.name}
              {agent.branchName && (
                <span className="block text-2xl text-gray-500 font-medium mt-1">
                  {agent.branchName} Branch
                </span>
              )}
            </h1>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-600 font-medium">
              {agent.phone && (
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#f13053]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a href={`tel:${agent.phone.replace(/\s+/g, '')}`} className="hover:underline">
                    {agent.phone}
                  </a>
                </div>
              )}
              {agent.email && (
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#f13053]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a href={`mailto:${agent.email}`} className="hover:underline">
                    {agent.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            {agent.website && (
              <a
                href={agent.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-48 bg-white text-gray-900 border border-gray-200 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-center block"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs + Properties */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Tab bar */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${
                  activeTab === tab.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.key
                      ? "bg-[#f13053]/10 text-[#f13053]"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Property grid */}
        {visibleProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No properties listed
            </h3>
            <p className="text-gray-500">
              This agent has no{" "}
              {activeTab === "sales"
                ? "properties for sale"
                : "rental properties"}{" "}
              right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const id = extractAgentIdFromSlug(slug);

  if (!id) {
    return { notFound: true };
  }

  try {
    const agentRef = doc(db, "agents", id);
    const agentSnap = await getDoc(agentRef);

    if (!agentSnap.exists()) {
      return { notFound: true };
    }

    const agentData = agentSnap.data();

    const propertiesRef = collection(db, "properties");
    const q = query(propertiesRef, where("agentId", "==", id));
    const querySnapshot = await getDocs(q);

    const properties = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return {
      props: {
        agent: JSON.parse(JSON.stringify(agentData)),
        properties: JSON.parse(JSON.stringify(properties)),
      },
    };
  } catch (error) {
    console.error("Error fetching agent details:", error);
    return {
      props: {
        agent: null,
        properties: [],
      },
    };
  }
}
