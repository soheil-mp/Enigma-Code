import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'
import '@/styles/animations.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  )
} 