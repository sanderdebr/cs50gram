import Link from 'next/link'
import useSWR from 'swr'
import { useUser } from '../firebase/useUser'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((response) => response.json())

const Index = () => {
  const { user, logout } = useUser()
  const { data, error } = useSWR(user ? ['/api/getFood', user.token] : null, fetcher)

  if (!user) {
    return (
      <div>
        <h1>You are not signed in!</h1>
        <Link href={'/auth'}>Sign in</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>You are signed in!</h1>
      <p onClick={() => logout()}>Logout</p>
    </div>
  )
}

export default Index
