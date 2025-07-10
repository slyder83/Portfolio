import { ArrowDown } from "lucide-react"

export const HeroSection = () => {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <div className="container max-w-4xl mx-auto text-center z-10">                
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in">Hola, soy</span>
                        <span className="opacity-0 text-primary animate-fade-in-delay-1"> Roberto</span>
                        <span className="opacity-0 text-gradient ml-2 animate-fade-in-delay-2"> Ceñera</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">Creo experiencias web excepcionales usando tecnologías modernas. Me especializo en desarrollo frontend, construyendo interfaces que combinan funcionalidad y diseño atractivo.</p>

                    <div className="opacity-0 pt-4 animate-fade-in-delay-4">
                        <a href="#projects" className="cosmic-button">Ver mis proyectos</a>
                    </div>            
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce" aria-hidden="true">
                <span className="text-sm text-muted-foreground mb-2">Desliza</span>
                <ArrowDown className="h-5 w-5 text-primary" />
            </div>
        </section>
    ) 
}