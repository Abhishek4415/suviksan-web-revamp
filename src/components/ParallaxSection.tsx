import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  offset?: number[];
  outputRange?: number[];
  triggerOnce?: boolean;
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.2,
  direction = "up",
  offset = [0, 1],
  outputRange,
  triggerOnce = false
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Set default output range based on direction
  const getDefaultOutputRange = () => {
    const strength = 100 * speed;
    switch (direction) {
      case "up":
        return [strength, -strength];
      case "down":
        return [-strength, strength];
      case "left":
        return [strength, -strength];
      case "right":
        return [-strength, strength];
      default:
        return [0, 0];
    }
  };

  const range = outputRange || getDefaultOutputRange();

  const transform = useTransform(
    scrollYProgress,
    offset,
    range
  );

  // Use Y transform for up/down and X transform for left/right
  const isVertical = direction === "up" || direction === "down";
  const transformProperty = isVertical ? { y: transform } : { x: transform };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={transformProperty}
        // If triggerOnce is true, set initial and animate to create a single animation
        {...(triggerOnce && {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 }
        })}
      >
        {children}
      </motion.div>
    </div>
  );
} 