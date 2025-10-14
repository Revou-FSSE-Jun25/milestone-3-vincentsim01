"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1] || null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const token = getCookie('auth-token');
  const username = getCookie('username');
  const userRole = getUserRole(username || undefined);

  const isAuthenticated = !!token && !!username;

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      if (!token || !username) {
        setIsLoading(false);
        return;
      }

      try {
        // Get user data from cookie (cached during login)
        const userDataCookie = getCookie('user-data');
        if (userDataCookie) {
          setUser(JSON.parse(userDataCookie));
        } else {
          // No user data cached, clear authentication
          deleteCookie('auth-token');
          deleteCookie('username');
          deleteCookie('user-role');
          deleteCookie('user-data');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid authentication
        deleteCookie('auth-token');
        deleteCookie('username');
        deleteCookie('user-role');
        deleteCookie('user-data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [token, username]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}