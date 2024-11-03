import { createContext, useContext, ReactNode } from 'react'
import { useSession } from 'next-auth/react'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  userId?: string
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session,
        isLoading: status === 'loading',
        userId: session?.user?.id,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 