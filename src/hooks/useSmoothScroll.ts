import { useEffect } from 'react';

/**
 * Hook to enable smooth scrolling behavior across the site
 * @param options - Optional configuration for the smooth scroll
 */
export const useSmoothScroll = (options = { behavior: 'smooth', duration: 1000 }) => {
  useEffect(() => {
    // Function to handle anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorElement = target.closest('a');
      
      if (!anchorElement) return;
      
      // Only handle same-page hash links
      const href = anchorElement.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Scroll to the target element
      targetElement.scrollIntoView({
        behavior: options.behavior as ScrollBehavior,
        block: 'start',
      });
    };

    // Add click listener
    document.addEventListener('click', handleAnchorClick);
    
    // Set CSS scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = '';
    };
  }, [options.behavior]);
}; 