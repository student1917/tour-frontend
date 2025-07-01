import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(()=>{
        return localStorage.getItem("theme") == 'dark';
    })

    useEffect(()=>{
        const theme = isDark ? "dark" : "light"
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem('theme', theme)
    },[isDark])

    return (
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)