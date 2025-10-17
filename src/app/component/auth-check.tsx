'use client'

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from '@/app/context/AuthContext';


interface AuthCheckProps {
    children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

export default function AuthCheck({
    children,
    requiredRole
}: AuthCheckProps){
     const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);


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

  console.log('userRole in auth check is '+ userRole)

    if (requiredRole === 'admin' && userRole !== 'admin') {
    router.push('/login')
    return null



  }

  return <>{children}</>

}
