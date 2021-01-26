import React, { useEffect, useState } from 'react'
import { getPostsForUser, getUserAdditionalData } from '../firebase/utils'

import Post from '../components/Post'
import PrivateRoute from './_private'
import SignIn from './signin'
import { useAuth } from '../hooks/'

const Posts = () => {
  const { user, logout } = useAuth()

  if (!user) {
    return <SignIn />
  }

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const addUserToPost = async (post) => {
    const userData = await getUserAdditionalData(post.data.userId)
    const user = userData.data()
    console.log(userData, user, post)
    return { post, user }
  }

  const getPosts = async () => {
    // Array of user id that user is following
    const posts = []
    const postsForUser = await getPostsForUser(user.following)

    for (let i = 0; i < postsForUser.length; i++) {
      const finalPost = await addUserToPost(postsForUser[i])
      posts.push(finalPost)
    }

    setPosts(posts)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getPosts()
  }, [user])

  console.log(posts)

  return (
    <PrivateRoute>
      <main className="container pt-20 space-y-6 py-6 max-w-xl mx-auto h-full">
        {loading
          ? 'Loading...'
          : !posts.length
          ? 'Follow someone or post something to see posts'
          : posts.map((post) => <Post user={post.user} id={post.post.id} post={post.post.data} />)}
      </main>
    </PrivateRoute>
  )
}

export default Posts
