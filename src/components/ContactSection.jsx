import { Linkedin, Mail, MapPin, Send, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { site } from "@/config/site"
import { Button } from "@/components/ui/button"

export const ContactSection = () => {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formRef = useRef()
    const lastSentAt = useRef(0)

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current)
        const name = String(formData.get("name") ?? "").trim()
        const email = String(formData.get("email") ?? "").trim()
        const message = String(formData.get("message") ?? "").trim()

        const elapsed = Date.now() - lastSentAt.current
        const cooldownMs = 30000
        if (elapsed < cooldownMs) {
            const seconds = Math.ceil((cooldownMs - elapsed) / 1000)
            toast({
                title: "Espera un momento",
                description: `Puedes volver a enviar en ${seconds} segundos.`,
                variant: "destructive",
            })
            return
        }

        if (name.length < 2 || name.length > 100) {
            toast({
                title: "Nombre no válido",
                description: "El nombre debe tener entre 2 y 100 caracteres.",
                variant: "destructive",
            })
            return
        }

        if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast({
                title: "Correo no válido",
                description: "Introduce una dirección de correo válida.",
                variant: "destructive",
            })
            return
        }

        if (message.length < 10 || message.length > 5000) {
            toast({
                title: "Mensaje no válido",
                description: "El mensaje debe tener entre 10 y 5000 caracteres.",
                variant: "destructive",
            })
            return
        }

        lastSentAt.current = Date.now()
        setIsSubmitting(true)

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                { name, email, message },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            )
            .then(() => {
                toast({
                    title: "Mensaje enviado",
                    description:
                        "Gracias por tu mensaje. Me pondré en contacto contigo pronto.",
                })
                formRef.current.reset()
            })
            .catch(() => {
                toast({
                    title: "Error al enviar",
                    description: `No se pudo enviar el mensaje. Puedes escribirme directamente a ${site.ownerEmail}`,
                    variant: "destructive",
                })
            })
            .finally(() => setIsSubmitting(false))
    }

    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Ponte en <span className="text-primary">Contacto</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    ¿Tienes un proyecto en mente o quieres colaborar? No dudes
                    en escribirme. Estoy abierto a nuevas oportunidades
                    profesionales.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6">
                            Información de contacto
                        </h3>

                        <div className="space-y-6 justify-center mx-auto w-fit">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">
                                        Correo electrónico
                                    </h4>
                                    <a
                                        href={`mailto:${site.ownerEmail}`}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {site.ownerEmail}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Ubicación</h4>
                                    <span className="text-muted-foreground">
                                        Norte de España
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-medium mb-4">Redes sociales</h4>
                            <div className="flex space-x-4 justify-center">
                                <a
                                    href={site.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="text"
                                >
                                    <Linkedin />
                                </a>
                                <a
                                    href={site.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text"
                                >
                                    <Github />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6">
                            Envíame un mensaje
                        </h3>

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Tu nombre
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Introduce tu nombre"
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    minLength={2}
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Tu correo electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Introduce tu correo electrónico"
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    maxLength={254}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Tu mensaje
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Escribe tu mensaje aquí"
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    rows={5}
                                    minLength={10}
                                    maxLength={5000}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full",
                                    isSubmitting &&
                                        "opacity-50 cursor-not-allowed",
                                )}
                            >
                                {isSubmitting
                                    ? "Enviando..."
                                    : "Enviar mensaje"}
                                <Send size={16} />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
