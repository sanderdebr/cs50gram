import 'firebase/auth'

import { auth, db, facebookProvider, githubProvider, googleProvider } from '.'
import { createContext, useEffect, useState } from 'react'
import { getUserFromCookie, removeUserCookie, setUserCookie } from './userCookies'

import { mapUserData } from '../utils'
import { useRouter } from 'next/router'

const getUserAdditionalData = async (id) => await db.collection('users').doc(id).get()

export const AuthContext = createContext({
  user: null,
  authErr: null,
  logout: null,
  signInWith: null,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authErr, setAuthErr] = useState(null)

  const router = useRouter()

  useEffect(() => {
    // Keep state and cookie up to date
    const cancelAuthListener = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const userData = await mapUserData(user)

        // Get additional data
        const additionalData = await getUserAdditionalData(userData.id)

        if (additionalData.data()) {
          const { name } = additionalData.data()
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

  const signInWith = (provider) => {
    let authProvider

    if (provider === 'google') {
      authProvider = googleProvider
    } else if (provider === 'facebook') {
      authProvider = facebookProvider
    } else if (provider === 'github') {
      authProvider === githubProvider
    }

    return auth
      .signInWithPopup(authProvider)
      .then(async (response) => {
        const userData = await mapUserData(response.user)

        // Get additional data
        const additionalData = await getUserAdditionalData(userData.id)

        if (additionalData.data()) {
          const { name } = additionalData.data()
          setUserCookie({ ...userData, name })
          setUser({ ...userData, name })
        } else {
          setUser(userData)
        }
      })
      .catch((error) => {
        console.log(error)
        setAuthErr(error)
      })
  }

  return (
    <AuthContext.Provider value={{ user, authErr, logout, signInWith }}>
      {children}
    </AuthContext.Provider>
  )
}
