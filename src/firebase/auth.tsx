import { createContext, useContext, useEffect, useState } from 'react'

import { firebaseClient } from './firebaseClient'

type ProviderProps = {
  children: React.ReactNode
}

// Create context that holds user data
export const AuthContext = createContext<{ user: firebaseClient.User }>({
  user: null,
})

// Provider that passed user data down
export const AuthProvider: React.FC = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<{ user: firebaseClient.User | null }>({ user: null })

  // Listen to changes in current user - on first mount
  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged((authUser) => {
      setUser({ user: authUser })
    })
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
