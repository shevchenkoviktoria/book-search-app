import { ReactNode } from 'react';

export type AuthContextType = {
  authenticated: boolean
  username: string | null
  login: (username: string) => void
  logout: () => void
}

export type AuthProviderProps = {
  children: ReactNode
}