"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}:{children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() =>{
        const storedTheme = localStorage.getItem('theme') as Theme;
        if(storedTheme){
            setTheme(storedTheme);
            document.body.classList.add(storedTheme);
        }
    }, []);

    useEffect(() =>{
        document.documentElement.classList.remove(theme === "light" ? "dark" : "light");
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    },[theme]);

    const toggleTheme = () => setTheme(theme === 'light'?'dark':'light');

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () =>{
    const context = useContext(ThemeContext);
      if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}