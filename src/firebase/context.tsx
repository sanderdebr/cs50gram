import { createContext, useEffect, useState } from 'react'

import FirebaseInstance from './firebase'
import firebaseClient from 'firebase/app'

type ProviderProps = {
  children: React.ReactNode
}

// Create context that holds user data
export const FirebaseContext = createContext<{ user: firebaseClient.User }>({
  user: null,
})

// Provider that passed user data down
export const FirebaseProvider: React.FC = ({ children }: ProviderProps) => {
  const [user, setUser] = useState({ user: null })

  // Listen to changes in current user - on first mount
  useEffect(() => {
    const firebase = new FirebaseInstance()

    firebase.auth.onAuthStateChanged((authUser) => {
      setUser({ user: authUser })
    })
  }, [])

  return <FirebaseContext.Provider value={user}>{children}</FirebaseContext.Provider>
}
