import React, { useEffect, useRef, useState } from 'react'
import { Router, useRouter } from 'next/router'
import { addImageToStorage, addPostToFirestore } from '../firebase/utils'

import NewPost from '../components/NewPost'
import PrivateRoute from './_private'
import { useAuth } from '../hooks'

const addPost = () => {
  const { user } = useAuth()
  const router = useRouter()
  const file = useRef(null)

  const [comment, setComment] = useState('')
  const [image, setImage] = useState(null)
  const [fullImage, setFullImage] = useState(null)
  const [location, setLocation] = useState('')
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(false)
  const [loading, setLoading] = useState(false)

  // Handle location
  const handleLocation = (e) => {
    setLocation(e.target.value)
  }

  // Handle picture
  const storeImage = (e) => {
    const imageFile = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      setImage(e.target.result)
    }

    reader.readAsDataURL(imageFile)
    setFullImage(imageFile)
  }

  const selectImage = () => {
    file.current.click()
  }

  useEffect(() => {
    if (file.current && !selected) {
      setSelected(true)
      selectImage()
    }
  })

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleShare = async () => {
    if (!fullImage) {
      setError('Please add a picture')
      return
    }

    setLoading(true)

    const newPost = {
      dateTime: new Date(),
      userId: user.id,
      comment,
      location,
      likes: 0,
      comments: null,
    }

    // Add image to Storage
    const downloadUrl = await addImageToStorage(fullImage)
    // Add post with reference to image to Firestore
    const post = await addPostToFirestore({ ...newPost, downloadUrl })

    if (post === 'success') {
      router.push('/posts')
      setLoading(false)
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
        {loading ? (
          <img className="mx-auto h-12 w-auto" src="/static/icons/spinner.gif" alt="Loading" />
        ) : (
          <>
            <input
              ref={file}
              accept="image/*"
              capture="camera"
              onChange={storeImage}
              className="hidden"
              type="file"
            />
            <NewPost
              user={user}
              image={image}
              selectImage={selectImage}
              location={location}
              handleLocation={handleLocation}
              comment={comment}
              handleComment={handleComment}
              handleShare={handleShare}
            />
          </>
        )}
      </main>
    </PrivateRoute>
  )
}

export default addPost
