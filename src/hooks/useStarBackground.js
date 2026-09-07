import { useEffect, useState } from "react"

const STAR_AREA_DIVISOR = 10000
const METEOR_COUNT = 4

const generateStars = () => {
    const count = Math.floor(
        (window.innerWidth * window.innerHeight) / STAR_AREA_DIVISOR,
    )

    return Array.from({ length: count }, (_, id) => ({
        id,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
    }))
}

const generateMeteors = () =>
    Array.from({ length: METEOR_COUNT }, (_, id) => ({
        id,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: (id / METEOR_COUNT) * 5,
        animationDuration: Math.random() * 3 + 3,
    }))

export const useStarBackground = () => {
    const [stars, setStars] = useState([])
    const [meteors, setMeteors] = useState([])

    useEffect(() => {
        setStars(generateStars())
        setMeteors(generateMeteors())
    }, [])

    useEffect(() => {
        let rafId = null

        const handleResize = () => {
            if (rafId !== null) return
            rafId = requestAnimationFrame(() => {
                setStars(generateStars())
                rafId = null
            })
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            if (rafId !== null) cancelAnimationFrame(rafId)
        }
    }, [])

    return { stars, meteors }
}