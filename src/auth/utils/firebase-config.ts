import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { FIREBASE_API } from '@/config-global'

const firebaseApp = getApps().length ? getApp() : initializeApp(FIREBASE_API)
const AUTH = getAuth(firebaseApp)
const DB = getFirestore(firebaseApp)
const STORAGE = getStorage(firebaseApp)

export { DB, AUTH, firebaseApp, STORAGE }
