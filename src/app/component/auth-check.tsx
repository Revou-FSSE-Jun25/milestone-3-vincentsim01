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
    requiredRole = 'user'
}: AuthCheckProps){
     const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuth()

  console.log('the isAuthenticated in auth check is '+isAuthenticated)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAuthenticated) {
    router.push('/login')
    return;
  }

    if (requiredRole === 'admin' && userRole !== 'admin') {
    router.push('/login')
    
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






  return <>{children}</>

}
