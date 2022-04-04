import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type UserProps = {
  id: string
  name: string
  login: string
  avatar_url: string
}

type AuthContextDataPros = {
  user: UserProps | null
  signInUrl: string
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextDataPros)

type AuthProviderProps = {
  children: ReactNode
}

type AuthReponseProps = {
  token: string
  user: {
    id: string
    avatar_url: string
    name: string
    login: string
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const clientId = '5a39c24d798ca986fc4c'
  const redUri = 'http://localhost:3000'
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redUri}`

  const [user, setUser] = useState<UserProps | null>(null)

  async function signIn(githubCode: string) {
    const response = await api.post<AuthReponseProps>('authenticate', {
      code: githubCode
    })

    const { token, user } = response.data

    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<UserProps>('profile').then(response => {
        setUser(response.data)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      /**
       * ? Remover o code da url
       */
      window.history.pushState({}, '', urlWithoutCode)

      signIn(githubCode)
    }

  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }} >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
