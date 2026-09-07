import { ThemeToggle } from "../components/ThemeToggle"
import { StarBackground } from "../components/StarBackground"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col items-center justify-center p-6">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Background Effects */}
            <StarBackground />

            {/* Main Content */}
            <main className="z-10 text-center max-w-md">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-lg mb-6">
                    Lo siento, la página que buscas no existe.
                </p>
                <Button onClick={() => navigate("/")}>Volver al inicio</Button>
            </main>
        </div>
    )
}
