import * as admin from 'firebase-admin'

export const verifyIdToken = (token) => {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

  if (!privateKey || !clientEmail || !projectId) {
    console.log('Failed to load Firebase credentials.')
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey,
        clientEmail,
        projectId,
      }),
      databaseURL: `https://${projectId}.firebaseio.com`,
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}
