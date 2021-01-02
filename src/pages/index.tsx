import Posts from './posts'
import SignInUp from './SignInUp'
import { useAuth } from '../firebase/auth'

const Index = () => {
  const { user } = useAuth()

  if (!user) {
    return <SignInUp />
  }

  return <Posts />
}

export default Index
