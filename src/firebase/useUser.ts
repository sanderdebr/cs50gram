import 'firebase/auth'

import { getUserFromCookie, removeUserCookie, setUserCookie } from './userCookies'
import { useEffect, useState } from 'react'

import firebase from 'firebase/app'
import initFirebase from './initFirebase'
import { mapUserData } from './mapUserData'
import { useRouter } from 'next/router'

initFirebase()

const useUser = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // sign out succesful
        router.push('/aitj')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    // Keep state and cookie up to date every hour
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

  return { user, logout }
}

export { useUser }
