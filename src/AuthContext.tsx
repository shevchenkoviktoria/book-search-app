import React, { createContext, useContext, useState, ReactNode } from 'react'

type AuthContextType = {
  authenticated: boolean
  username: string | null
  login: (username: string) => void
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(null)

  const login = (user: string) => {
    setUsername(user)
    setAuthenticated(true)
  }

  const logout = () => {
    setUsername(null)
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
