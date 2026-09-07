import { lazy, Suspense } from "react"
import { AboutSection } from "../components/AboutSection"
import { Footer } from "../components/Footer"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"
import { ProjectSection } from "../components/ProjectSection"
import { SkillsSection } from "../components/SkillsSection"
import { StarBackground } from "../components/StarBackground"

const ContactSection = lazy(() =>
    import("../components/ContactSection").then(({ ContactSection }) => ({
        default: ContactSection,
    })),
)

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Skip link para accesibilidad por teclado */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:shadow-lg"
            >
                Saltar al contenido
            </a>

            {/* Background Effects */}
            <StarBackground />

            {/* NavBar */}
            <Navbar />

            {/* Main Content */}
            <main id="main-content" className="scroll-mt-20">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectSection />
                <Suspense
                    fallback={
                        <div className="py-24 px-4 relative bg-secondary min-h-[24rem]">
                            <div className="container mx-auto max-w-5xl"></div>
                        </div>
                    }
                >
                    <ContactSection />
                </Suspense>
            </main>

            {/* Footer*/}
            <Footer />
        </div>
    )
}
