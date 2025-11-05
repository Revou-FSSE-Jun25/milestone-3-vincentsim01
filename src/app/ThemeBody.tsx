"use client";

import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeBody({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <body className={`${theme} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      {children}
    </body>
  );
}