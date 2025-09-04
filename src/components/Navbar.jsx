import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre mí", href: "#about" },
    { name: "Habilidades", href: "#skills" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleMenu = () => {
        const willOpen = !isMenuOpen;
        setIsMenuOpen(willOpen);
        
        if (willOpen) {
            // Scroll instantáneo al top al abrir
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    };

    return (
        <nav aria-label="Navegación principal" className={cn(
            "fixed w-full z-50 transition-all duration-300", // Aumentado z-index
            isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
        )}>
            <div className="container flex items-center justify-between">
                <a href="#hero" className="text-xl font-bold text-primary flex items-center">
                    <span className="relative z-10">
                        <span className="text-glow text-foreground">Roberto Ceñera</span> Portfolio
                    </span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item, key) => (
                        <a href={item.href} key={key} className="text-foreground/80 hover:text-primary transition-colors duration-300">
                            {item.name}
                        </a>
                    ))}
                    <ThemeToggle />
                </div>

                {/* Mobile nav button */}
                <button 
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Cerrar Menu" : "Abrir Menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile menu (SOLUCIÓN CLAVE) */}
                <div className={cn(
                    "fixed top-0 left-0 right-0 bottom-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
                    isMenuOpen 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-full pointer-events-none"
                )}>
                    <div className="flex flex-col text-xl space-y-8">
                        {navItems.map((item, key) => (
                            <a 
                                href={item.href} 
                                key={key} 
                                className="text-foreground/80 hover:text-primary transition-colors duration-300 text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="mt-8 flex justify-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}