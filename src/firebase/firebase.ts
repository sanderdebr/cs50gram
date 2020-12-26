import 'firebase/auth'
import 'firebase/firestore'

import firebase from 'firebase/app'

const CLIENT_CONFIG = {
  apiKey: 'AIzaSyAS8l_CqyplvwBq3l0a8vINzsYujG7bt8M',
  authDomain: 'cs50gram.firebaseapp.com',
  projectId: 'cs50gram',
  storageBucket: 'cs50gram.appspot.com',
  messagingSenderId: '986699145151',
  appId: '1:986699145151:web:1005b7bd722796407e4b0a',
  measurementId: 'G-SMY4TBTJX8',
}

export const firestore = firebase.firestore()

class Firebase {
  constructor() {
    firebase.initializeApp(CLIENT_CONFIG)

    this.auth = firebase.auth()
    this.provider = new firebase.auth.GoogleAuthProvider()
  }

  // Auth API

  signInWithGoogle() {
    return this.auth.signInWithPopup(provider)
  }
}

export default Firebase
