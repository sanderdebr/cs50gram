import React from 'react'
import SignIn from './signin'
import firebase from 'firebase/app'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Posts = () => {
  const { user } = useAuth()

  if (!user) {
    return <SignIn />
  }

  const { data, error } = useSWR(user ? ['/api/getFood', user.token] : null, fetcher)

  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // sign out succesful
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <h3>Posts</h3>
      {error && <div>Failed to fetch food!</div>}
      {data && !error ? <div>Your favorite food is {data.food}.</div> : <div>Loading...</div>}
      <button onClick={() => logout()}>Logout</button>
    </>
  )
}

export default Posts
