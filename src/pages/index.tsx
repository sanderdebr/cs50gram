import React, { useContext } from 'react'

import { FirebaseContext } from '../firebase/context'
import SignInUp from '../components/SignInUp'

const Home = () => {
  const user = useContext(FirebaseContext)

  console.log(user)

  return <SignInUp />
}

export default Home
