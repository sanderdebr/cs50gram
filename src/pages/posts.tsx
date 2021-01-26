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
    const following = ['jLenHFQaBcQqSdnhjVg7SpSbz6P2']
    const postsForUser = await getPostsForUser(following)

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
  }, [])

  return (
    <PrivateRoute>
      <main className="container pt-20 space-y-6 py-6 max-w-xl mx-auto h-full">
        {loading && 'Loading...'}
        {!loading && !posts.length
          ? 'Follow someone or post something to see posts'
          : posts.map((post) => <Post user={post.user} id={post.post.id} post={post.post.data} />)}
      </main>
    </PrivateRoute>
  )
}

export default Posts
