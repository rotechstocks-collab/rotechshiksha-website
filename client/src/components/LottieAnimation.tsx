import { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  src: string;
  fallbackIcon?: React.ReactNode;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export function LottieAnimation({
  src,
  fallbackIcon,
  className = "",
  loop = true,
  autoplay = true,
  speed = 0.5,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || hasError) return;

    const loadAnimation = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error("Failed to load animation");
        const animationData = await response.json();

        if (containerRef.current) {
          animationRef.current = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop,
            autoplay,
            animationData,
          });

          animationRef.current.setSpeed(speed);
          setIsLoaded(true);
        }
      } catch (error) {
        console.warn("Lottie animation failed to load:", error);
        setHasError(true);
      }
    };

    loadAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [src, loop, autoplay, speed, hasError]);

  if (hasError && fallbackIcon) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className} ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
      aria-hidden="true"
    />
  );
}
