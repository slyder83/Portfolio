import { ArrowUp } from 'lucide-react'

export const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8">
            <div className="container flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                <p className="text-sm text-muted-foreground tracking-wide">&copy; {new Date().getFullYear()} <span className="font-semibold text-foreground">Roberto Ceñera</span>. Todos los derechos reservados.</p>

                <a href="#hero" aria-label="Volver arriba" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors  duration-300 hover:scale-110">
                    <ArrowUp size={20} />
                </a>
            </div>
        </footer>
    )
}