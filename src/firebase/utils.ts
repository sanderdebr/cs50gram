import { db } from './firebase'

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

// Gets additional userdata from Firestore
export const getUserAdditionalData = async (id) => await db.collection('users').doc(id).get()

// Add user to Firestore
export const createUser = async (user) => {
  try {
    const createdUser = await db.collection('users').doc(user.uid).set(user)
    return 'success'
  } catch (error) {
    return error
  }
}

// Add post to Firestore
export const addPostToFirestore = async (post) => {
  try {
    await db.collection('posts').doc().set(post)
    return 'success'
  } catch (error) {
    return error
  }
}
