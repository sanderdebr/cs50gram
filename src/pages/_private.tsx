import Navbar from '../components/Navbar'
import React from 'react'
import SignIn from './signin'
import { useAuth } from '../hooks'

const PrivateRoute: React.FC<any> = ({ children, ...rest }) => {
  const { user, logout } = useAuth()

  if (!user) {
    return <SignIn />
  }

  return (
    <div className="h-full">
      <Navbar userName={user.name} logout={logout} />
      {children}
    </div>
  )
}

export default PrivateRoute
