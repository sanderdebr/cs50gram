import React, { useContext } from 'react'

import { AuthContext } from '../firebase/context'
import { signInWithGoogle } from '../firebase/firebase'

const Home = () => {
  const user = useContext(AuthContext)
  console.log(user)

  return user.user ? (
    'user logged in'
  ) : (
    <button onClick={() => signInWithGoogle()}>Sign In With Google</button>
  )
}
export default Home
