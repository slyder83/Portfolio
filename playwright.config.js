import { defineConfig, devices } from "playwright/test"

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? "github" : "list",
    use: {
        baseURL: "http://localhost:5199",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
    webServer: {
        command: "npm run dev -- --port 5199 --strictPort",
        url: "http://localhost:5199",
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
        env: {
            ...process.env,
            VITE_EMAILJS_SERVICE_ID: "e2e_service_id",
            VITE_EMAILJS_TEMPLATE_ID: "e2e_template_id",
            VITE_EMAILJS_PUBLIC_KEY: "e2e_public_key",
        },
    },
})
