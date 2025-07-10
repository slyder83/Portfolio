import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if(storedTheme === "dark") {
            document.documentElement.classList.add("dark")
            setIsDarkMode(true)
        } else if (storedTheme === "light") {
            document.documentElement.classList.remove("dark")
            setIsDarkMode(false)
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            if (prefersDark) {
                document.documentElement.classList.add("dark")
                setIsDarkMode(true)
            } else {
                document.documentElement.classList.remove("dark")
                setIsDarkMode(false)
            }
        }
    }, [])

    const toggleTheme = () => {
        if(isDarkMode) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
            setIsDarkMode(false)
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
            setIsDarkMode(true)
        }
    } 

    return (
        <button 
            onClick={toggleTheme} 
            aria-label={isDarkMode ? "Activate light mode" : "Activate dark mode"} 
            title={isDarkMode ? "Activate light mode" : "Activate dark mode"} 
            className={cn("p-2 rounded-full transition-colors duration-300 focus:outline-hidden")}
        >
            {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300" />
            ) : (
                <Moon className="h-6 w-6 text-blue-900" />
            )}
        </button>
    )
}
