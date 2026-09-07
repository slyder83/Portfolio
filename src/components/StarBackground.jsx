import { useStarBackground } from "@/hooks/useStarBackground"

const Star = ({ star }) => (
    <div
        className="star animate-pulse-subtle"
        style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
        }}
    />
)

const Meteor = ({ meteor }) => (
    <div
        className="meteor animate-meteor"
        style={{
            width: meteor.size * 15 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
        }}
    />
)

export const StarBackground = () => {
    const { stars, meteors } = useStarBackground()

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        >
            {stars.map((star) => (
                <Star key={star.id} star={star} />
            ))}

            {meteors.map((meteor) => (
                <Meteor key={meteor.id} meteor={meteor} />
            ))}
        </div>
    )
}
