import Navbar from '../components/Navbar'
import Post from '../components/Post'
import PrivateRoute from './_private'
import React from 'react'
import SignIn from './signin'
import { fetcher } from '../utils/'
import { useAuth } from '../hooks/'
import useSWR from 'swr'

const Posts = () => {
  const { user, logout } = useAuth()

  if (!user) {
    return <SignIn />
  }

  // const { data, error } = useSWR(user ? ['/api/getFood', user.token] : null, fetcher)

  const posts = [1, 2, 3]

  return (
    <PrivateRoute>
      <main className="container pt-20 space-y-6 py-6 max-w-xl mx-auto h-full">
        {posts.map((post) => (
          <Post />
        ))}
      </main>
    </PrivateRoute>
  )
}

export default Posts
