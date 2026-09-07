import { test, expect } from "playwright/test"

test.describe("Portfolio: funcionalidades", () => {
    test("el toggle de tema alterna entre oscuro y claro", async ({ page }) => {
        await page.goto("/")
        const toggle = page.locator('button[aria-label*="modo"]').first()
        await toggle.click()
        // El atributo aria-label cambia tras alternar
        await expect(toggle).toHaveAttribute("aria-label", /claro/i)
    })

    test("los filtros de categorías de skills cambian de estado", async ({
        page,
    }) => {
        await page.goto("/")
        const filters = page.locator("#skills [aria-pressed]")
        const total = await filters.count()
        expect(total).toBeGreaterThan(1)

        // Todos sin pulsar al inicio excepto "Todos"
        await expect(filters.nth(0)).toHaveAttribute("aria-pressed", "true")
        const html = filters.nth(1)
        await html.click()
        await expect(html).toHaveAttribute("aria-pressed", "true")
        // El filtro "Todos" queda deseleccionado
        await expect(filters.nth(0)).toHaveAttribute("aria-pressed", "false")
    })

    test("las barras de skills tienen semántica de progressbar", async ({
        page,
    }) => {
        await page.goto("/")
        const bars = page.locator('#skills [role="progressbar"]')
        expect(await bars.count()).toBeGreaterThanOrEqual(4)
        const first = bars.first()
        await expect(first).toHaveAttribute("aria-valuemin", "0")
        await expect(first).toHaveAttribute("aria-valuemax", "100")
        await expect(first).toHaveAttribute("aria-valuenow")
    })

    test("los enlaces externos usan noopener noreferrer", async ({ page }) => {
        await page.goto("/")
        const external = page.locator('a[target="_blank"]')
        expect(await external.count()).toBeGreaterThan(0)
        for (let i = 0; i < (await external.count()); i++) {
            const rel = await external.nth(i).getAttribute("rel")
            expect(rel).toContain("noopener")
            expect(rel).toContain("noreferrer")
        }
    })

    test("no hay errores de consola en flujo completo", async ({ page }) => {
        const errors = []
        page.on("console", (msg) => {
            if (msg.type() === "error") errors.push(msg.text())
        })
        page.on("pageerror", (err) => errors.push(String(err)))

        await page.goto("/")
        // Recorremos las secciones
        for (const h of [
            "#hero",
            "#about",
            "#skills",
            "#projects",
            "#contact",
        ]) {
            await page.locator(`a[href="${h}"]`).first().click()
        }
        // Toggle de tema
        await page.locator('button[aria-label*="modo"]').first().click()

        await expect(errors).toEqual([])
    })
})
