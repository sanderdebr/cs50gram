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
    await db.collection('users').doc(user.uid).set(user)
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

// Get post data
export const getPostFromFirestore = async (postId) => {
  try {
    console.log(postId)
    const postRef = db.collection('posts').doc(postId)
    const post = await postRef.get()

    if (!post.exists) {
      throw 'No post found'
    } else {
      return JSON.stringify(post.data())
    }
  } catch (error) {
    return error
  }
}

// Get posts for user
export const getPostsForUser = async (following = []) => {
  try {
    const posts = []
    const postsRef = db.collection('posts')

    for (let i = 0; i < following.length; i++) {
      const snapshot = await postsRef.where('userId', '==', following[i]).get()
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          posts.push({ id: doc.id, data: doc.data() })
        })
      }
    }

    return posts
  } catch (error) {
    return error
  }
}

// Add profile picture to storage
export const addProfilePictureToStorage = async (image) => {
  try {
    const snapshot = await storage.ref().child('profile-pictures/').put(image)
    console.log(`Uploaded ${snapshot.totalBytes} bytes`)
    const downloadUrl = await snapshot.ref.getDownloadURL()
    return downloadUrl
  } catch (error) {
    return error
  }
}

// Add profile picture to firestore
export const addProfilePictureToFirestore = async (id, url) => {
  try {
    await db.collection('users').doc(id).update({ profilePicture: url })
    return 'success'
  } catch (error) {
    return error
  }
}
