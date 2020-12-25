import "firebase/auth";

import firebaseClient from "firebase/app";

const CLIENT_CONFIG = {
  apiKey: "AIzaSyAS8l_CqyplvwBq3l0a8vINzsYujG7bt8M",
  authDomain: "cs50gram.firebaseapp.com",
  projectId: "cs50gram",
  storageBucket: "cs50gram.appspot.com",
  messagingSenderId: "986699145151",
  appId: "1:986699145151:web:1005b7bd722796407e4b0a",
  measurementId: "G-SMY4TBTJX8",
};

if (typeof window !== undefined && !firebaseClient.app.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
