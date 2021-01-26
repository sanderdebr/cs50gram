import 'firebase/auth'

import { auth, db, facebookProvider, githubProvider, googleProvider } from './firebase'
import { createContext, useEffect, useState } from 'react'
import { getUserAdditionalData, mapUserData } from './utils'
import { getUserFromCookie, removeUserCookie, setUserCookie } from './userCookies'

import { useRouter } from 'next/router'

export const AuthContext = createContext({
  user: null,
  setUser: null,
  logout: null,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const router = useRouter()

  useEffect(() => {
    // Keep state and cookie up to date
    const cancelAuthListener = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const userData = await mapUserData(user)

        // Get additional data
        const additionalData = await getUserAdditionalData(userData.id)

        if (additionalData.data()) {
          const { name, profilePicture, following } = additionalData.data()
          setUserCookie({ ...userData, name })
          setUser({ ...userData, name, profilePicture, following: JSON.parse(following) })
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

    return auth
      .signOut()
      .then(() => {
        // sign out succesful
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}
