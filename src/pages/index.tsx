import Posts from './posts'
import SignIn from './signin'
import { useAuth } from '../hooks/'

const Index = () => {
  const { user } = useAuth()

  if (!user) {
    return <SignIn />
  }

  return <Posts />
}

export default Index
