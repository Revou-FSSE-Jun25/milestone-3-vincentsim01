'use client'

import {useRouter} from "next/navigation";
import {useAuth} from '@/app/context/AuthContext';


interface AuthCheckProps {
    children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

export default function AuthCheck({
    children,
    requiredRole = 'user'
}: AuthCheckProps){
     const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuth()

  // Show loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}>
        Loading...
      </div>
    )
  }

      if (!isAuthenticated) {
    router.push('/login')
    return null
  }

    if (requiredRole === 'admin' && userRole !== 'admin') {
    router.push('/login')
    return null



  }

  return <>{children}</>

}
