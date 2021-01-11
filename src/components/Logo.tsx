import React from 'react'

const Logo = ({ large = false }) =>
  large ? (
    <div className="flex flex-col space-y-2">
      <img className="mx-auto h-12 w-auto" src="./icons/logo.svg" alt="Logo" />
      <h2 className="text-center text-2xl font-oleo text-gray-900">CS50Gram</h2>
    </div>
  ) : (
    <div className="flex space-x-4 items-center">
      <img className="mx-auto h-8 w-auto" src="./icons/logo.svg" alt="Logo" />
      <h2 className="text-center text-xl font-oleo text-gray-900">CS50Gram</h2>
    </div>
  )

export default Logo
