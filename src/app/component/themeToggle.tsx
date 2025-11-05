"use client";

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle(){
    const {theme, toggleTheme} = useTheme();

    return(
        <button onClick={toggleTheme}
        className='p-2 border rounded-md transition-all duration-300'>
            {theme==='light'?'Light':'Dark'}
        </button>
    );
}