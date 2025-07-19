import React, { useEffect, useRef, useState } from "react";

// Component that animates its children when they enter the viewport
export default function ScrollAnimation({
    children,
    animation = "fade-in",
    delay = 0,
    threshold = 0.2, // Percentage of element visible before animation triggers
    className = ""
}) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold]);

    // Animation classes based on the animation prop
    const getAnimationClass = () => {
        if (!isVisible) return "opacity-0";

        switch (animation) {
            case "fade-in":
                return "animate-fade-in";
            case "slide-up":
                return "animate-slide-up";
            case "slide-in-right":
                return "animate-slide-in-right";
            case "slide-in-left":
                return "animate-slide-in-left";
            case "zoom-in":
                return "animate-zoom-in";
            default:
                return "animate-fade-in";
        }
    };

    const getDelayClass = () => {
        switch (delay) {
            case 200:
                return "animation-delay-200";
            case 400:
                return "animation-delay-400";
            case 600:
                return "animation-delay-600";
            case 800:
                return "animation-delay-800";
            default:
                return "";
        }
    };

    return (
        <div
            ref={elementRef}
            className={`${getAnimationClass()} ${getDelayClass()} ${className}`}
        >
            {children}
        </div>
    );
}