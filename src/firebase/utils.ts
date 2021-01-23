import { db, storage } from './firebase'

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

// Add image to storage
export const addImageToStorage = async (image) => {
  try {
    const snapshot = await storage
      .ref()
      .child('images/' + image.name)
      .put(image)
    console.log(`Uploaded ${snapshot.totalBytes} bytes`)
    const downloadUrl = await snapshot.ref.getDownloadURL()
    return downloadUrl
  } catch (error) {
    return error
  }
}

// Add post to Firestore
export const addPostToFirestore = async (post) => {
  try {
    // Add post with reference to image to Firestore
    await db.collection('posts').doc().set(post)
    return 'success'
  } catch (error) {
    return error
  }
}
