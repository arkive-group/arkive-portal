'use client'

import PropTypes from 'prop-types'
import { useEffect, useReducer, useCallback, useMemo, useState } from 'react'
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth'
import {
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  where,
} from 'firebase/firestore'

// config
import { AUTH, DB, STORAGE } from '@/auth/utils/firebase-config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { AuthContext } from './auth-context'

// routes
import { useRouter } from '@/routes/hooks'
import { useSnackbar } from '@/components/snackbar'
import { paths } from '@/routes/paths'

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
  const { enqueueSnackbar } = useSnackbar()

  const [state, dispatch] = useReducer(reducer, initialState)
  const [foundUser, setFoundUser] = useState(null)
  const findUserByEmail = async email => {
    try {
      const usersCollection = collection(DB, 'users')
      const q = query(usersCollection, where('email', '==', email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        return { id: userDoc.id, ...userDoc.data() }
      } else {
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
          const userData = foundUser || (await findUserByEmail(user.email))
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
        : `https://portal.arkivegroup.com`
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
    const existingUser = await findUserByEmail(data.email)
    if (existingUser) {
      enqueueSnackbar(
        'User with this email already exists. Please login or use a different email.',
      )
      return null
    }
    const usersCollection = collection(DB, 'users')
    try {
      const avatarRef = ref(
        STORAGE,
        `avatars/${data.avatar.name}_${data.email}`,
      )
      await uploadBytes(avatarRef, data.avatar)
      const avatarUrl = await getDownloadURL(avatarRef)
      const user = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
        company: data.company,
        phoneNumber: data.phoneNumber,
        avatar: avatarUrl,
      }
      await setDoc(doc(usersCollection), user)

      await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: data.first_name, email: data.email }),
      })

      await sendSignInLinkToEmail(AUTH, user.email, actionCodeSettings)
      router.push(paths.auth.verify + `?email=${user.email}`)
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
        setFoundUser(userData)
        await sendSignInLinkToEmail(AUTH, email, actionCodeSettings)
        router.push(paths.auth.verify + `?email=${email}`)
      } else {
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
        state.user = foundUser
        router.push(paths.home)
        setFoundUser(null)
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
    state.user = null
    router.push(paths.auth.login)
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
