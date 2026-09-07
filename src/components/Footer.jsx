import { ArrowUp } from "lucide-react"
import { site } from "@/config/site"
import { Button } from "@/components/ui/button"

const currentYear = new Date().getFullYear()

export const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8">
            <div className="container flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                <p className="text-sm text-muted-foreground tracking-wide">
                    &copy; {currentYear}{" "}
                    <span className="font-semibold text-foreground">
                        {site.name}
                    </span>
                    . Todos los derechos reservados.
                </p>

                <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="bg-primary/10 hover:bg-primary/20 text-primary hover:scale-110"
                >
                    <a href="#hero" aria-label="Volver arriba">
                        <ArrowUp size={20} />
                    </a>
                </Button>
            </div>
        </footer>
    )
}
