import Link from 'next/link'
import Logo from './Logo'
import React from 'react'

interface INavbar {
  logout: any
  profilePicture: string
  userName: string
}

const Navbar = ({ userName, profilePicture = '', logout }: INavbar) => (
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
            <img className="mx-auto h-5 w-auto" src="/static/icons/add.svg" alt="Logo" />
          </div>
        </Link>
        <button onClick={() => logout()} className="bg-white p-1 rounded-full text-gray-400">
          <img className="mx-auto h-4 w-auto" src="/static/icons/logout.svg" alt="Logo" />
        </button>
        <Link href="/account">
          <div
            className="cursor-pointer font-bold text-white text-sm rounded-full bg-gray-600 flex items-center justify-center font-mono"
            style={{
              backgroundImage: `url(${profilePicture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '30px',
              width: '30px',
            }}
          >
            {!profilePicture && userName && userName.slice(0, 1)}
          </div>
        </Link>
      </div>
    </div>
  </nav>
)

export default Navbar
