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
    const postsRef = db.collection('posts').limit(5)

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

// Get posts of one user
export const getPostsOfUser = async (id) => {
  try {
    const posts = []
    const postsRef = db.collection('posts')

    const snapshot = await postsRef.where('userId', '==', id).get()
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        posts.push({ id: doc.id, data: JSON.parse(JSON.stringify(doc.data())) })
      })
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

// Follow or unfollow a user
export const updateFollowing = async (id, following) => {
  console.log(id, following)
  try {
    await db
      .collection('users')
      .doc(id)
      .update({ following: JSON.stringify(following) })
    return 'success'
  } catch (error) {
    return error
  }
}

// Add comment to post
export const addComment = async (id, comment) => {
  try {
    await db
      .collection('posts')
      .doc(id)
      .update({ comments: JSON.stringify(comment) })
    return 'success'
  } catch (error) {
    return error
  }
}

// Like picture
export const likePicture = async (id, newLikes) => {
  try {
    await db.collection('posts').doc(id).update({ likes: newLikes })
    return 'success'
  } catch (error) {
    return error
  }
}

// Update likes of user
export const updateLikesOfUser = async (id, likes) => {
  try {
    await db
      .collection('users')
      .doc(id)
      .update({ liked: JSON.stringify(likes) })
    return 'success'
  } catch (error) {
    return error
  }
}
