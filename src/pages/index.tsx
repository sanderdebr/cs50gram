import React from 'react'
import SignInUp from '../components/SignInUp'
import { useAuth } from '../firebase/auth'

const Home = () => {
  const user = useAuth()

  console.log(user)

  return <SignInUp />
}

export default Home
