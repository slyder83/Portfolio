import { ArrowRight, ExternalLink, Github } from "lucide-react"

const projects = [
    {
        id: 1,
        title: "Sistema de reservas para restaurante",
        description: "Aplicación web responsive para gestionar reservas online, con panel de administración y notificaciones por correo electrónico.",
        image: "/projects/tfg-reservas.png",
        tags: ["PHP", "MySQL", "JavaScript", "CSS", "HTML"],
        demoUrl: "#",
        githubUrl: "https://github.com/slyder83/ProyectoFinGrado"
    },
    {
        id: 2,
        title: "Gestor de vehículos para autoescuelas",
        description: "Aplicación para controlar vehículos, partes de accidentes y seguros usando almacenamiento como Dropbox sin base de datos.",
        image: "/projects/autoescuela.png",
        tags: ["JavaScript", "JSON", "Electron", "HTML", "CSS"],
        demoUrl: "#",
        githubUrl: "https://github.com/slyder83/Autoescuela"
    },
]

export const ProjectSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Proyectos <span className="text-primary">Destacados</span></h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Aquí puedes ver algunos de los proyectos que he desarrollado durante mi formación como desarrollador web. Están pensados para demostrar mis habilidades tanto en el frontend como en el backend.</p>

                <div className="flex flex-wrap justify-center gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="w-full sm:w-[47%] lg:w-[30%] group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                            <div className="h-48 overflow-hidden">
                                <img src={project.image} alt={`Preview of ${project.title}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 justify-between mb-4">
                                    {project.tags.map((tag) => (
                                        <span className="px-2 py-1 text-xs font-medium border rounded-full bg-primary/30 text-secondary-foreground">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-3">
                                        {project.demoUrl && project.demoUrl !== "#" && (
                                            <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Demo de ${project.title}`}
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                            >
                                            <ExternalLink size={20} />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                            >
                                            <Github size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="https://github.com/slyder83" className="cosmic-button w-fit flex items-center mx-auto gap-2" target="_blank" rel="noopener noreferrer">
                        Ver más en GitHub <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    )
}