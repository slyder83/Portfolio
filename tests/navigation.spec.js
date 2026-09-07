import { test, expect } from "playwright/test"

test.describe("Portfolio: navegación y renders", () => {
    test("la home carga todas las secciones sin errores", async ({ page }) => {
        const errors = []
        page.on("console", (msg) => {
            if (msg.type() === "error") errors.push(msg.text())
        })
        page.on("pageerror", (err) => errors.push(String(err)))

        await page.goto("/")
        await expect(page).toHaveTitle(/Roberto Ceñera/)

        for (const id of ["hero", "about", "skills", "projects", "contact"]) {
            await expect(page.locator(`#${id}`)).toBeVisible()
        }

        expect(errors).toEqual([])
    })

    test("los enlaces del navbar navegan a cada sección", async ({ page }) => {
        await page.goto("/")

        const links = [
            { text: "Sobre mí", target: "#about" },
            { text: "Habilidades", target: "#skills" },
            { text: "Proyectos", target: "#projects" },
            { text: "Contacto", target: "#contact" },
        ]

        for (const { text, target } of links) {
            await page.locator(`nav a`, { hasText: text }).first().click()
            await expect(page.locator(`section${target}`)).toBeVisible()
        }
    })

    test("404 muestra página de error para rutas desconocidas", async ({
        page,
    }) => {
        await page.goto("/ruta/que/no/existe")
        await expect(page.locator("text=404")).toBeVisible()
        await expect(
            page.locator("button", { hasText: "Volver al inicio" }),
        ).toBeVisible()
    })
})
