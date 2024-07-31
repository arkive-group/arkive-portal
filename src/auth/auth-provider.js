'use client'

import PropTypes from 'prop-types'
import { useEffect, useReducer, useCallback, useMemo } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
// config
import { FIREBASE_API } from 'src/config-global'

//
import { AuthContext } from './auth-context'

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
  const [state, dispatch] = useReducer(reducer, initialState)

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async user => {
        if (user) {
          if (user.emailVerified) {
            const userProfile = doc(DB, 'users', user.uid)
            const docSnap = await getDoc(userProfile)
            const profile = docSnap.data()

            dispatch({
              type: 'INITIAL',
              payload: {
                user: {
                  ...user,
                  ...profile,
                  id: user.uid,
                  // role: 'admin',
                },
              },
            })
          } else {
            dispatch({
              type: 'INITIAL',
              payload: {
                user: null,
              },
            })
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
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      })
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

  const loginWithLink = useCallback(async email => {
    console.log(email)
    try {
      await sendSignInLinkToEmail(AUTH, email, actionCodeSettings)
    } catch (error) {
      console.error('Error sending email link:', error)
    }
  }, [])

  const checkLoginLink = useCallback(async email => {
    try {
      const credentials = await signInWithEmailLink(AUTH, email)
      console.log(credentials)
      return credentials
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }, [])

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH)
  }, [])

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user?.emailVerified
    ? 'authenticated'
    : 'unauthenticated'

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
      loginWithLink,
      checkLoginLink,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
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
