import { Book, Code, User } from "lucide-react"

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Sobre <span className="text-primary">Mí</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Desarrollador Web apasionado por la tecnología</h3>

            <p className="text-muted-foreground">Soy desarrollador web formado en la Universidad Alfonso X el Sabio, con experiencia en la creación de aplicaciones web utilizando PHP, MySQL, JavaScript y tecnologías modernas. Me gusta diseñar interfaces limpias y funcionales que ofrezcan una buena experiencia al usuario.</p>

            <p className="text-muted-foreground">Durante mi Trabajo de Fin de Grado desarrollé una aplicación de reservas para restaurantes, aplicando buenas prácticas de desarrollo, diseño responsive y funcionalidades de backend. Sigo aprendiendo cada día para mejorar mis habilidades y mantenerme actualizado en el mundo del desarrollo web.</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">Contacta conmigo</a>

              <a href="/cv/cv-roberto-cenera-garcia.pdf" download="cv-roberto-ceñera-garcia.pdf" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">Descargar CV</a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Desarrollo Web</h4>
                  <p className="text-muted-foreground">Desarrollo aplicaciones web responsivas y accesibles usando tecnologías como PHP, MySQL, JavaScript y CSS, enfocándome en soluciones prácticas y eficientes.</p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Diseño UI/UX</h4>
                  <p className="text-muted-foreground">Creo interfaces limpias y usables que garantizan una experiencia de usuario fluida, con especial atención a la adaptabilidad en dispositivos móviles.</p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Aprendizaje Continuo</h4>
                  <p className="text-muted-foreground">Me mantengo actualizado con las últimas tendencias y tecnologías del desarrollo web para mejorar constantemente mis habilidades y ofrecer soluciones modernas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>         
    </section>
  )
}