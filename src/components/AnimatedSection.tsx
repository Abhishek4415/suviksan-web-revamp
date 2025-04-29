import { ReactNode, HTMLAttributes } from "react";
import { motion, Variant } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type AnimationVariant = "fadeIn" | "slideUp" | "slideRight" | "slideLeft" | "scale" | "rotate";

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
}

const getVariants = (variant: AnimationVariant, duration: number = 0.5, delay: number = 0) => {
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration, delay } 
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration, delay } 
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration, delay } 
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration, delay } 
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration, delay } 
      }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -5 },
      visible: { 
        opacity: 1, 
        rotate: 0, 
        transition: { duration, delay } 
      }
    }
  };

  return variants[variant];
};

export default function AnimatedSection({
  children,
  className = "",
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  ...props
}: AnimatedSectionProps) {
  const { ref, controls } = useScrollAnimation(threshold);
  
  const variants = getVariants(variant, duration, delay);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
} 