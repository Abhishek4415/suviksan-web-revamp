import { ReactNode, Children, isValidElement, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface StaggeredAnimationProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
}

export default function StaggeredAnimation({
  children,
  className = "",
  staggerDelay = 0.1,
  duration = 0.5,
  threshold = 0.1,
  ...props
}: StaggeredAnimationProps) {
  const { ref, controls } = useScrollAnimation(threshold);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration
      }
    }
  };

  // Convert children to array for mapping
  const childrenArray = Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={className}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
} 