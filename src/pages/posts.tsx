import React from 'react'
import firebase from 'firebase/app'
import { useAuth } from '../firebase/auth'
import { useRouter } from 'next/router'
const Posts = () => {
  const { user } = useAuth()
  const router = useRouter()

  console.log(user)

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // sign out succesful
        router.push('/aitj')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <h3>Posts</h3>
      <h1></h1>
      <button onClick={() => logout()}>Logout</button>
    </>
  )
}

export default Posts
