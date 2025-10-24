
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: 'admin' | 'user' | null;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Cookie helpers
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1] || null;
};

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

const getUserRole = (email?: string): 'admin' | 'user' => {
  // if (!email) return 'user'; 
  return email === 'john@mail.com' ? 'admin' : 'user';
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Function to check authentication
  const checkAuth = () => {
    console.log('🔍 Checking authentication...');
    
    const token = getCookie('auth-token');
    const email = getCookie('email');

    console.log('Token:', token ? '✓ exists' : '✗ missing');
    console.log('Email:', email || '✗ missing');

    if (!token || !email) {
      console.log('❌ No credentials found');
      setIsAuthenticated(false);
      setUserRole(null);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const userDataCookie = getCookie('user-data');
      if (userDataCookie) {
        const userData = JSON.parse(userDataCookie);
        const role = getUserRole(email);
        
        setUser(userData);
        setIsAuthenticated(true);
        setUserRole(role);
        
        console.log('✅ Authentication successful!');
        console.log('   Email:', email);
        console.log('   Role:', role);
      } else {
        console.log('⚠️ No user data found, clearing cookies');
        deleteCookie('auth-token');
        deleteCookie('email');
        deleteCookie('user-role');
        deleteCookie('user-data');
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      deleteCookie('auth-token');
      deleteCookie('email');
      deleteCookie('user-role');
      deleteCookie('user-data');
      setIsAuthenticated(false);
      setUserRole(null);
      setUser(null);
    } finally {
      setIsLoading(false);
      console.log('✓ Auth check complete');
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Re-check auth when pathname changes (after navigation)
  useEffect(() => {
    if (pathname !== '/login') {
      console.log('📍 Route changed to:', pathname);
      // Small delay to ensure cookies are readable
      setTimeout(() => {
        checkAuth();
      }, 600);
    }
  }, [pathname]);

  const logout = (): void => {
    console.log('🚪 Logging out...');
    deleteCookie('auth-token');
    deleteCookie('refresh-token');
    deleteCookie('email');
    deleteCookie('user-role');
    deleteCookie('user-data');
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    router.push('/login');
  };

  const refreshUser = (): void => {
    const userDataCookie = getCookie('user-data');
    const email = getCookie('email');
    
    if (userDataCookie && email) {
      try {
        const userData = JSON.parse(userDataCookie);
        setUser(userData);
        setIsAuthenticated(true);
        setUserRole(getUserRole(email));
        console.log('✓ User refreshed');
      } catch (error) {
        console.error('Failed to refresh user:', error);
        logout();
      }
    } else {
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    userRole,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
