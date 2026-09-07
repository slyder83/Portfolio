import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary hover:scale-105 hover:shadow-[0_0_10px_rgba(72,187,120,0.5)] active:scale-95 [color:hsl(var(--button-text))]",
                outline:
                    "border border-primary text-primary hover:bg-primary/10",
                secondary:
                    "bg-secondary/70 text-foreground hover:bg-secondary",
                ghost: "text-foreground hover:bg-secondary/50",
            },
            size: {
                default: "px-6 py-2",
                sm: "px-5 py-2 text-sm",
                lg: "px-8 py-3 text-lg",
                icon: "p-2",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = "Button"

export { Button }