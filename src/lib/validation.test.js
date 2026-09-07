import { describe, it, expect } from "vitest"
import { validateContact } from "@/lib/validation"

describe("validateContact", () => {
    it("es válido con datos correctos", () => {
        const result = validateContact({
            name: "Ana García",
            email: "ana@example.com",
            message: "Hola, me interesa tu portfolio.",
        })
        expect(result.valid).toBe(true)
        expect(result.errors).toEqual({})
    })

    it("recorta espacios de los campos", () => {
        const result = validateContact({
            name: "  Ana  ",
            email: "  ana@example.com  ",
            message: "  Hola, me interesa tu portfolio.  ",
        })
        expect(result.valid).toBe(true)
        expect(result.values).toEqual({
            name: "Ana",
            email: "ana@example.com",
            message: "Hola, me interesa tu portfolio.",
        })
    })

    it("rechaza nombre con menos de 2 caracteres", () => {
        const result = validateContact({
            name: "A",
            email: "ana@example.com",
            message: "Hola, me interesa tu portfolio.",
        })
        expect(result.valid).toBe(false)
        expect(result.errors.name).toContain("2")
    })

    it("rechaza nombre con más de 100 caracteres", () => {
        const result = validateContact({
            name: "A".repeat(101),
            email: "ana@example.com",
            message: "Hola, me interesa tu portfolio.",
        })
        expect(result.valid).toBe(false)
        expect(result.errors.name).toContain("100")
    })

    it("rechaza email inválido", () => {
        const result = validateContact({
            name: "Ana García",
            email: "no-es-un-email",
            message: "Hola, me interesa tu portfolio.",
        })
        expect(result.valid).toBe(false)
        expect(result.errors.email).toBeDefined()
    })

    it("rechaza email vacío", () => {
        const result = validateContact({
            name: "Ana García",
            email: "",
            message: "Hola, me interesa tu portfolio.",
        })
        expect(result.valid).toBe(false)
        expect(result.errors.email).toBeDefined()
    })

    it("rechaza mensaje con menos de 10 caracteres", () => {
        const result = validateContact({
            name: "Ana García",
            email: "ana@example.com",
            message: "Corto",
        })
        expect(result.valid).toBe(false)
        expect(result.errors.message).toContain("10")
    })

    it("acepta mensaje de exactamente 10 caracteres", () => {
        const result = validateContact({
            name: "Ana García",
            email: "ana@example.com",
            message: "1234567890",
        })
        expect(result.valid).toBe(true)
    })

    it("rechaza mensaje con más de 5000 caracteres", () => {
        const result = validateContact({
            name: "Ana García",
            email: "ana@example.com",
            message: "A".repeat(5001),
        })
        expect(result.valid).toBe(false)
        expect(result.errors.message).toContain("5000")
    })
})
