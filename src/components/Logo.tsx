import Link from 'next/link'
import React from 'react'

const Logo = ({ large = false }) =>
  large ? (
    <div className="flex flex-col space-y-2">
      <img className="mx-auto h-10 w-auto" src="/static/icons/logo.svg" alt="Logo" />
      <h2 className="text-center text-3xl font-pacifico text-gray-900">CS50Gram</h2>
    </div>
  ) : (
    <Link href="/">
      <div className="flex space-x-4 items-center cursor-pointer">
        <img className="mx-auto h-8 w-auto" src="/static/icons/logo.svg" alt="Logo" />
        <h2 className="text-center text-xl font-pacifico text-gray-900">CS50Gram</h2>
      </div>
    </Link>
  )

export default Logo
