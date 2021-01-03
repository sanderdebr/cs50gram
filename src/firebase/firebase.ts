import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import firebase from 'firebase/app'

const config = {
  apiKey: 'AIzaSyAS8l_CqyplvwBq3l0a8vINzsYujG7bt8M',
  authDomain: 'cs50gram.firebaseapp.com',
  projectId: 'cs50gram',
  storageBucket: 'cs50gram.appspot.com',
  messagingSenderId: '986699145151',
  appId: '1:986699145151:web:1005b7bd722796407e4b0a',
  measurementId: 'G-SMY4TBTJX8',
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

console.log(app.name ? 'Firebase activiated!' : 'Firebase not working')

export { auth, db, now, storage }
