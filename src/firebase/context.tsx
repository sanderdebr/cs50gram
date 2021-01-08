import 'firebase/auth'

import { auth, db } from './firebase'
import { createContext, useEffect, useState } from 'react'
import { getUserFromCookie, removeUserCookie, setUserCookie } from './userCookies'

import firebase from 'firebase/app'
import { mapUserData } from './mapUserData'
import { useRouter } from 'next/router'

export const AuthContext = createContext({ user: null, logout: null })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Keep state and cookie up to date
    const cancelAuthListener = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const userData = await mapUserData(user)

        // Get additional data
        const getUserAdditionalData = await db.collection('users').doc(userData.id).get()

        if (getUserAdditionalData.data()) {
          const { name } = getUserAdditionalData.data()
          setUserCookie({ ...userData, name })
          setUser({ ...userData, name })
        }
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

  const logout = async () => {
    removeUserCookie()
    setUser(null)

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

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>
}
