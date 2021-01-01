import 'firebase/auth'

import firebaseClient from 'firebase/app'

const CONFIG = {
  apiKey: 'AIzaSyAS8l_CqyplvwBq3l0a8vINzsYujG7bt8M',
  authDomain: 'cs50gram.firebaseapp.com',
  projectId: 'cs50gram',
  storageBucket: 'cs50gram.appspot.com',
  messagingSenderId: '986699145151',
  appId: '1:986699145151:web:1005b7bd722796407e4b0a',
  measurementId: 'G-SMY4TBTJX8',
}

// Prevent multiple firebase instances
if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp(CONFIG)
  console.log('firebase initiliazed')
}

export { firebaseClient }
