import Link from 'next/link'
import Logo from './Logo'
import React from 'react'

interface INavbar {
  logout: any
  userName: string
}

const Navbar = ({ userName, logout }: INavbar) => (
  <nav className="fixed w-full border-b px-4 py-2 bg-white">
    <div className="container max-w-screen-lg	 mx-auto flex flex-wrap items-center justify-between">
      <Logo />

      <div className="relative hidden sm:block text-gray-500">
        <input
          className="search-bar max-w-xs text-sm border rounded-sm bg-gray-200 px-4 py-1 text-center outline-none focus:border-gray-400"
          type="search"
          placeholder="Search"
        />
        <i className="fa fa-search absolute top-0 left-0 ml-12 mt-1"></i>
      </div>

      <div className="flex space-x-4 items-center">
        <Link href="/add-post">
          <div className="cursor-pointer bg-white p-1 rounded-full text-gray-400">
            <img className="mx-auto h-5 w-auto" src="./icons/add.svg" alt="Logo" />
          </div>
        </Link>
        <button onClick={() => logout()} className="bg-white p-1 rounded-full text-gray-400">
          <img className="mx-auto h-4 w-auto" src="./icons/logout.svg" alt="Logo" />
        </button>
        <div
          className="font-bold text-white text-sm rounded-full bg-gray-900 flex items-center justify-center font-mono ring-2 ring-gray-900 ring-offset-2"
          style={{ height: '20px', width: '20px' }}
        >
          {userName && userName.slice(0, 1)}
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar
