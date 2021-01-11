// Checks if object is empty except for a field
export const isEmpty = (obj, exception) =>
  Object.keys(obj).filter((key) => key !== exception).length === 0

// Fetch only allowed if authenticated
export const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

// Formats usedata from Firebase
export const mapUserData = async (user) => {
  const { uid, email } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    token,
  }
}
