import { createContext, useEffect, useState } from 'react'

import { auth } from './firebase'
import firebaseClient from 'firebase/app'

// Create context that holds user data
export const AuthContext = createContext<{ user: firebaseClient.User }>({
  user: null,
})

type ProviderProps = {
  children: React.ReactNode
}

// Provider that passed user data down
export const AuthProvider: React.FC = ({ children }: ProviderProps) => {
  const [user, setUser] = useState({ user: null })

  // Listen to changes in current user - on first mount
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setUser({ user: userAuth })
    })
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
