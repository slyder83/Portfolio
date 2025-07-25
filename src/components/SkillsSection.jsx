import { useState } from "react"
import { cn } from "@/lib/utils"

const skills = [
    // Habilidades Frontend
    { name: 'JavaScript', level: 70, category: 'frontend' },
    { name: 'React', level: 65, category: 'frontend' },
    { name: 'CSS', level: 70, category: 'frontend' },
    { name: 'Sass', level: 60, category: 'frontend' },
    { name: 'HTML', level: 75, category: 'frontend' },
    { name: 'TypeScript', level: 50, category: 'frontend' },
    { name: 'Next.js', level: 55, category: 'frontend' },
    { name: 'Tailwind CSS', level: 60, category: 'frontend' },

    // Habilidades Backend
    { name: 'PHP', level: 65, category: 'backend' },
    { name: 'Node.js', level: 50, category: 'backend' },
    { name: 'MySQL', level: 60, category: 'backend' },
    { name: 'Supabase', level: 45, category: 'backend' },

    // Herramientas
    { name: 'GitHub', level: 70, category: 'tools' },
    { name: 'Visual Studio Code', level: 75, category: 'tools' },
    { name: 'Docker', level: 50, category: 'tools' },
    { name: 'Raspberry Pi', level: 40, category: 'tools' },
    { name: 'Affinity Photo', level: 45, category: 'tools' },
    { name: 'PostCSS', level: 50, category: 'tools' },
];

const categories = [
    { id: "all", label: "Todas" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Herramientas" }
]

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("all")

    const filteredSkills = skills.filter((skill) => activeCategory === "all" || skill.category === activeCategory)

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Mis <span className="text-primary">Habilidades</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map(({id, label}) => (
                        <button key={id} onClick={() => setActiveCategory(id)} className={cn("capitalize", activeCategory === id ? "cosmic-button" : "px-5 py-2 rounded-full transition-colors duration-300 bg-secondary/70 text-foreground hover:bg-secondary")}>{label}</button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill, key) => (
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg">{skill.name}</h3>
                            </div>
                            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]" style={{ width: skill.level + "%" }} />
                            </div>

                            <div className="text-right mt-1">
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>            
        </section>
    )
}