import React, { useState } from 'react'
import { Router, useRouter } from 'next/router'

import NewPost from '../components/NewPost'
import PrivateRoute from './_private'
import { addPostToFirestore } from '../firebase/utils'
import { useAuth } from '../hooks'

const addPost = () => {
  const { user } = useAuth()
  const router = useRouter()

  const [comment, setComment] = useState('')
  const [error, setError] = useState(null)

  const test = {
    dateTime: new Date(),
    userId: user?.id,
    comment,
    location: 'Amsterdam',
    image: 'img1',
  }

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleShare = async () => {
    const post = await addPostToFirestore(test)
    if (post === 'success') {
      router.push('/posts')
    } else {
      setError(post)
    }
  }

  return (
    <PrivateRoute>
      <main className="container pt-20 space-y-6 py-6 max-w-xl mx-auto h-full">
        {error && (
          <div className="text-sm my-2 flex items-center rounded-sm p-4 text-red-600 bg-red-100 border border-red-200">
            {error}
          </div>
        )}
        <NewPost handleShare={handleShare} comment={comment} handleComment={handleComment} />
      </main>
    </PrivateRoute>
  )
}

export default addPost
