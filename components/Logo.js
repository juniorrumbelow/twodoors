import React from 'react'
import Link from 'next/link'

export default function Logo({ size = 'text-8xl' }) {
  return (
    <Link href="/" className="inline-block outline-none">
      <h1 className={`${size} font-bold tracking-tight cursor-pointer select-none text-white transition-opacity`}>
        twodoors
      </h1>
    </Link>
  )
}
