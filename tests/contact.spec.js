import { test, expect } from "playwright/test"

test.describe("Portfolio: formulario de contacto", () => {
    test("rechaza nombre demasiado corto con toast", async ({ page }) => {
        await page.goto("/")
        const form = page.locator("form")
        await form.locator('input[name="name"]').fill("A")
        await form.locator('input[name="email"]').fill("ana@example.com")
        await form
            .locator('textarea[name="message"]')
            .fill("Hola, este mensaje tiene la longitud suficiente.")
        await form.locator('button[type="submit"]').click()
        await expect(page.locator("li[role=status]")).toContainText(
            "El nombre debe tener entre 2 y 100 caracteres.",
        )
    })

    test("rechaza email inválido", async ({ page }) => {
        await page.goto("/")
        const form = page.locator("form")
        await form.locator('input[name="name"]').fill("Ana García")
        await form.locator('input[name="email"]').fill("no-es-un-email")
        await form
            .locator('textarea[name="message"]')
            .fill("Hola, este mensaje tiene la longitud suficiente.")
        await form.locator('button[type="submit"]').click()
        await expect(page.locator("li[role=status]")).toContainText(
            "Introduce una dirección de correo válida.",
        )
    })

    test("rechaza mensaje demasiado corto", async ({ page }) => {
        await page.goto("/")
        const form = page.locator("form")
        await form.locator('input[name="name"]').fill("Ana García")
        await form.locator('input[name="email"]').fill("ana@example.com")
        await form.locator('textarea[name="message"]').fill("Corto")
        await form.locator('button[type="submit"]').click()
        await expect(page.locator("li[role=status]")).toContainText(
            "El mensaje debe tener entre 10 y 5000 caracteres.",
        )
    })

    test("aplica límites de longitud a los campos", async ({ page }) => {
        await page.goto("/")
        const form = page.locator("form")
        expect(
            await form.locator('input[name="name"]').getAttribute("maxlength"),
        ).toBe("100")
        expect(
            await form.locator('input[name="email"]').getAttribute("maxlength"),
        ).toBe("254")
        expect(
            await form
                .locator('textarea[name="message"]')
                .getAttribute("maxlength"),
        ).toBe("5000")
    })

    test("cooldown de 30 segundos entre envíos válidos", async ({ page }) => {
        await page.goto("/")
        const form = page.locator("form")

        // Rellenamos datos válidos y simulamos el envío con emailjs stubbado
        await page.addInitScript(() => {
            const originalSend = window.fetch
            // no hacemos realmente la llamada: interceptamos fetch de api.emailjs.com
            window.__originalFetch = originalSend
        })

        await page.route("**/api.emailjs.com/**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: "{}",
            }),
        )

        await form.locator('input[name="name"]').fill("Ana García")
        await form.locator('input[name="email"]').fill("ana@example.com")
        await form
            .locator('textarea[name="message"]')
            .fill("Hola, este mensaje tiene la longitud suficiente.")
        await form.locator('button[type="submit"]').click()

        // Primer envío: toast de éxito
        await expect(page.locator("li[role=status]")).toContainText(
            "Mensaje enviado",
        )

        // Segundo envío inmediato: debe avisar del cooldown
        await form.locator('input[name="name"]').fill("Ana García")
        await form.locator('input[name="email"]').fill("ana@example.com")
        await form
            .locator('textarea[name="message"]')
            .fill(
                "Este segundo mensaje también es totalmente válido, suficiente.",
            )
        await form.locator('button[type="submit"]').click()

        await expect(page.locator("li[role=status]")).toContainText(
            "Puedes volver a enviar en",
        )
    })
})
