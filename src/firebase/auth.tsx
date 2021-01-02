import 'firebase/auth'

import { createContext, useContext, useEffect, useState } from 'react'
import { getUserFromCookie, removeUserCookie, setUserCookie } from './userCookies'

import firebase from 'firebase/app'
import initFirebase from './initFirebase'
import { mapUserData } from './mapUserData'
import { useRouter } from 'next/router'

initFirebase()

export const AuthContext = createContext({ user: null })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Keep state and cookie up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        const userData = await mapUserData(user)
        setUserCookie(userData)
        setUser(userData)
      } else {
        removeUserCookie()
        setUser(null)
      }
    })

    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
      router.push('/')
      return
    }
    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
  }, [])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
