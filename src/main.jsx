import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { inject } from "@vercel/analytics"
import { SpeedInsights } from "@vercel/speed-insights/react"

if (import.meta.env.PROD) {
    inject()
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {import.meta.env.PROD && <SpeedInsights />}
        <App />
    </StrictMode>,
)
