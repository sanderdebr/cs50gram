import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import firebase from 'firebase/app'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Prevent multiple firebase instances
const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}

initFirebase()

const app = firebase.app()
const auth = firebase.auth()
const db = firebase.firestore()
const now = firebase.firestore.Timestamp.now()
const storage = firebase.storage()

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()

console.log(app.name ? 'Firebase activiated!' : 'Firebase not working')

export { auth, db, now, storage, googleProvider, facebookProvider, githubProvider }
