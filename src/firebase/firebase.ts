import 'firebase/auth'
import 'firebase/firestore'

import firebase from 'firebase/app'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAS8l_CqyplvwBq3l0a8vINzsYujG7bt8M',
  authDomain: 'cs50gram.firebaseapp.com',
  projectId: 'cs50gram',
  storageBucket: 'cs50gram.appspot.com',
  messagingSenderId: '986699145151',
  appId: '1:986699145151:web:1005b7bd722796407e4b0a',
  measurementId: 'G-SMY4TBTJX8',
}

export default class FirebaseInstance {
  auth: any
  firestore: any
  googleProvider: any
  onAuthStateChanged: any
  user: any

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG)
    }

    this.auth = firebase.auth()
    this.firestore = firebase.firestore()
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
  }

  // Auth API
  doSignInWithGoogle: React.FC<null> = () => this.auth.signInWithPopup(this.googleProvider)
  doSignOut: React.FC<null> = () => this.auth.signOut()
}
