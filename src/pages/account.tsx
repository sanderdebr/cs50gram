import React, { useState } from 'react'
import { addProfilePictureToFirestore, addProfilePictureToStorage } from '../firebase/utils'

import PrivateRoute from './_private'
import { useAuth } from '../hooks'

const Account = () => {
  const { user, setUser } = useAuth()

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(user ? user.name : '')
  const [image, setImage] = useState(null)

  const storeImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = async () => {
    if (!image || !username) {
      setError('Please add a picture and an username')
      return
    }

    setLoading(true)

    const downloadUrl = await addProfilePictureToStorage(image)
    const addPicture = await addProfilePictureToFirestore(user.id, downloadUrl)

    if (addPicture === 'success') {
      setUser({ ...user, profilePicture: downloadUrl })
      setLoading(false)
      setSuccess('Successfully uploaded!')
    } else {
      setError(String(addPicture))
    }
  }

  return (
    <PrivateRoute>
      <main className="container pt-20 space-y-6 p-6 max-w-2xl mx-auto h-full bg-white">
        <h1 className="text-2xl">Account settings</h1>
        {error && (
          <div className="text-sm my-2 flex items-center rounded-sm p-4 text-red-600 bg-red-100 border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm my-2 flex items-center rounded-sm p-4 text-green-600 bg-green-100 border border-green-200">
            {success}
          </div>
        )}
        {!user || loading
          ? showLoading()
          : showAccountOptions(username, handleChange, storeImage, handleSubmit)}
      </main>
    </PrivateRoute>
  )
}

function showLoading() {
  return <img className="mx-auto h-12 w-auto" src="/static/icons/spinner.gif" alt="Loading" />
}

function showAccountOptions(username, handleChange, storeImage, handleSubmit) {
  return (
    <>
      <section className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="font-bold w-36">Username</div>
          <input
            className="border border-gray-200 rounded p-2"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center space-x-6">
          <div className="font-bold w-36">Profile picture</div>
          <input onChange={storeImage} type="file" className="border border-gray-200 rounded p-2" />
        </div>
      </section>
      <button
        onClick={handleSubmit}
        className="disabled:opacity-50 shadow group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm shadow text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-md"
      >
        Save
      </button>
    </>
  )
}

export default Account
