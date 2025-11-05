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
        const body = document.body;
        const header = document.getElementById('headerId');
        const storedTheme = localStorage.getItem('theme') as Theme;
        if(storedTheme){
            setTheme(storedTheme);
            body.classList.add(storedTheme);
            header?.classList.add(storedTheme);
        }
    }, []);

    useEffect(() =>{
        const body = document.body;
        const header = document.getElementById('headerId');
        body.classList.remove(theme === "light" ? "dark" : "light");
        body.classList.add(theme);
        header?.classList.remove(theme === "light" ? "dark" : "light");
        header?.classList.add(theme);
        
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