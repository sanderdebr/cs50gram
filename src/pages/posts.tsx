import Navbar from '../components/Navbar'
import React from 'react'
import SignIn from './signin'
import { fetcher } from '../utils/'
import { useAuth } from '../hooks/useAuth'
import useSWR from 'swr'

const Posts = () => {
  const { user, logout } = useAuth()

  if (!user) {
    return <SignIn />
  }

  const { data, error } = useSWR(user ? ['/api/getFood', user.token] : null, fetcher)

  return (
    <div className="bg-gray-50 h-full">
      <Navbar userName={user.name} logout={logout} />
      <main className="container max-w-screen-lg	p-4 mx-auto h-full bg-white">cntent</main>
    </div>
  )
}

export default Posts
