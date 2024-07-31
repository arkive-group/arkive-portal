import { FirestoreAdapter } from '@auth/firebase-adapter'
import { firestore } from './firebase-config'
import { cert } from 'firebase-admin/app'

export const authOptions: any = {
  //   secret: process.env.NEXTAUTH_SECRET,
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_SA_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_SA_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_SA_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  }),
  callbacks: {
    session({ session, token, user }) {
      return { session, token, user }
    },
    async createUser(profile) {
      const userRef = firestore.collection('users').doc(profile.id)
      const userData = {
        ...profile,
        role: 'guest',
      }

      await userRef.set(userData)

      return userData
    },
  },
}
