'use client'

import PropTypes from 'prop-types'
import { useEffect, useReducer, useCallback, useMemo } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signOut,
  // signInWithPopup,
  onAuthStateChanged,
  // GoogleAuthProvider,
  signInWithEmailAndPassword,
  // signInWithCustomToken,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  getDocs,
  where,
} from 'firebase/firestore'
// config
import { FIREBASE_API } from 'src/config-global'

//
import { AuthContext } from './auth-context'
import { useRouter } from 'src/routes/hooks'
import { paths } from '@/routes/paths'

// ----------------------------------------------------------------------

const firebaseApp = initializeApp(FIREBASE_API)

const AUTH = getAuth(firebaseApp)

const DB = getFirestore(firebaseApp)
// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
}

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    }
  }
  return state
}

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)
  const findUserByEmail = async email => {
    try {
      const usersCollection = collection(DB, 'users')
      const q = query(usersCollection, where('email', '==', email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        return { id: userDoc.id, ...userDoc.data() }
      } else {
        console.log('No user found with the given email.')
        return null
      }
    } catch (error) {
      console.error(error)
    }
  }
  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async user => {
        if (user) {
          const userData = await findUserByEmail(user.email)
          if (userData) {
            dispatch({
              type: 'INITIAL',
              payload: {
                user: userData,
              },
            })
            return
          }
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              user: null,
            },
          })
        }
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    initialize()
  }, [initialize])

  // LOGIN WITH EMAIL AND PASSWORD

  const actionCodeSettings = {
    url: `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    }/auth/finish-login`,
    handleCodeInApp: true,
  }

  const login = useCallback(async (email, password) => {
    const useCredentials = await signInWithEmailAndPassword(
      AUTH,
      email,
      password,
    )
    return useCredentials
  }, [])

  const signup = useCallback(async data => {
    const usersCollection = collection(DB, 'users')
    try {
      const user = await setDoc(doc(usersCollection), {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
        company: data.company,
        phoneNumber: data.phoneNumber,
      })
      state.user = user
      return user
    } catch (error) {
      console.error('Error creating user:', error)
      return null
    }
  }, [])

  const loginWithLink = useCallback(async email => {
    try {
      const userData = await findUserByEmail(email)
      if (userData) {
        router.push(paths.auth.verify + `?email=${email}`)
      } else {
        await sendSignInLinkToEmail(AUTH, email, actionCodeSettings)
        router.push(paths.auth.register + `?email=${email}`)
      }
    } catch (error) {
      console.error('Error sending email link:', error)
    }
  }, [])

  const checkLoginLink = useCallback(async email => {
    try {
      const credentials = await signInWithEmailLink(AUTH, email)
      if (credentials.user.emailVerified) {
        const userData = await findUserByEmail(email)
        state.user = userData
        router.push(paths.home)
      }
      return credentials
    } catch (error) {
      console.error('Error signing in:', error)
      return null
    }
  }, [])

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH)
    console.log('User signed out')
    state.user = null
  }, [])

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated'

  const status = state.loading ? 'loading' : checkAuthenticated

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'firebase',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      signup,
      loginWithLink,
      checkLoginLink,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      signup,
      loginWithLink,
      checkLoginLink,
    ],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
