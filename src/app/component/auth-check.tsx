// 'use client'

// import {useState, useEffect} from "react";
// import {useRouter} from "next/navigation";
// import {useAuth} from '@/app/context/AuthContext';

// interface AuthCheckProps {
//   children: React.ReactNode
//   requiredRole?: 'user' | 'admin'
// }


// export default function AuthCheck({
//   children,
//   requiredRole = 'user'
// }: AuthCheckProps) {
//   const router = useRouter()
//   const { isAuthenticated, userRole, isLoading } = useAuth()

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '200px'
//       }}>
//         Loading...
//       </div>
//     )
//   }

//   useEffect(() => {
//     console.log('AuthCheck - isAuthenticated: ', isAuthenticated);
//     console.log('AuthCheck - userRole: ', userRole);

//       if (!isAuthenticated) {
//     router.push('/login')
//     return
//   }

//   // Wrong role - redirect to login
//   if (requiredRole === 'admin' && userRole !== 'admin') {
//     router.push('/login')
//     return
//   }
//   }, [isAuthenticated, userRole, requiredRole, router]);

//   // Not authenticated - redirect to login


//   // Authenticated with correct role - render children
//   return <>{children}</>
// }








'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';

interface AuthCheckProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

export default function AuthCheck({
  children,
  requiredRole = 'user'
}: AuthCheckProps) {
  const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) {
      console.log('⏳ AuthCheck waiting for auth to load...');
      return;
    }

    console.log('🔐 AuthCheck - isAuthenticated:', isAuthenticated);
    console.log('🔐 AuthCheck - userRole:', userRole);

    if (!isAuthenticated) {
      console.log('❌ Not authenticated, redirecting to login');
      router.push('/login')
      return
    }

    if (requiredRole === 'admin' && userRole !== 'admin') {
      console.log('❌ Insufficient permissions, redirecting to login');
      router.push('/login')
      return
    }

    console.log('✅ AuthCheck passed!');
  }, [isLoading, isAuthenticated, userRole, requiredRole, router]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    )
  }

  if (!isAuthenticated || (requiredRole === 'admin' && userRole !== 'admin')) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px'
      }}>
        Redirecting...
      </div>
    )
  }

  return <>{children}</>
}
