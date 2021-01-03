import { AuthContext } from '../firebase/context'
import { useContext } from 'react'

export const useAuth = () => {
  return useContext(AuthContext)
}
