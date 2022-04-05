import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AuthSessions from 'expo-auth-session'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

const CLIENT_ID = '562ce08149cf55257ce4'
const SCOPE = 'read:user'
const USER_STORAGE = '@backend:user'
const TOKEN_STORAGE = '@backend:token'

type UserProps = {
  id: string
  avatar_url: string
  name: string
  login: string
}

type AuthContextProps = {
  user: UserProps | null
  isSignIn: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

type AuthResponseProps = {
  token: string
  user: UserProps
}

type AuthorizationResponseProps = {
  params: {
    code?: string
    error?: string
  },
  type?: string
}

export const AuthContext = createContext({} as AuthContextProps)

function AuthProvider({ children }: AuthProviderProps) {
  const [isSignIn, setIsSignIn] = useState(true)
  const [user, setUser] = useState<UserProps | null>(null)

  async function signIn() {
    try {
      setIsSignIn(true)
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponseProps

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code })
        const { user, token } = authResponse.data as AuthResponseProps

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE, token)

        setUser(user)
      }

    } catch (err) {
      console.log(err)
    }
    setIsSignIn(false)
  }

  async function signOut() {
    setUser(null)
    await AsyncStorage.removeItem(USER_STORAGE)
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE)
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
        setUser(JSON.parse(userStorage))
      }

      setIsSignIn(false)
    }

    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isSignIn, signIn, signOut }} >
      {children}
    </AuthContext.Provider>
  )

}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export {
  AuthProvider,
  useAuth
}

