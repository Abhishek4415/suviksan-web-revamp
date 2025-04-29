import { useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Always force triggerOnce to be true
  const [ref, inView] = useInView({ 
    threshold, 
    triggerOnce: true 
  });

  useEffect(() => {
    // Only trigger the animation if it hasn't been triggered before
    if (inView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [controls, inView, hasAnimated]);

  return { ref, controls, inView };
}; 