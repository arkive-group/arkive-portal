import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { initFirestore } from '@auth/firebase-adapter'
import { cert } from 'firebase-admin/app'

import { FIREBASE_API } from '@/config-global'

const firebaseApp = getApps().length ? getApp() : initializeApp(FIREBASE_API)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const firestore = initFirestore({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_SA_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_SA_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_SA_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
})

export { db, auth, firebaseApp, firestore }
