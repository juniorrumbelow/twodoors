import React from 'react'
import Link from 'next/link'

export default function Logo({ size = 'text-8xl' }) {
  return (
    <Link href="/" className="inline-block outline-none">
      <h1 className={`${size} font-bold tracking-tight cursor-pointer select-none transition-opacity flex items-baseline`}>
        <span className="text-gray-900">two</span>
        <span className="text-[#01bf8f]">doors</span>
      </h1>
    </Link>
  )
}
