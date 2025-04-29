import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';
import { useState, useEffect, useRef } from 'react';

const AboutSection = () => {
  // Company statistics to display with counting animation
  const stats = [
    { label: 'Years Experience', value: '3+' },
    { label: 'Professionals', value: '40+' },
    { label: 'Employees', value: '100+' },
    { label: 'Projects Completed', value: '120+' },
  ];

  // *** COUNTER ANIMATION SETUP ***
  // Store current count values for animation
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  // Parse numeric values from stats removing any '+' characters
  const targetValues = stats.map(stat => parseInt(stat.value));
  // Reference to detect when section is visible
  const sectionRef = useRef(null);
  
  // *** TEXT HIGHLIGHT ANIMATION SETUP ***
  // Track highlight animation progress (0-100%)
  const [highlightProgress, setHighlightProgress] = useState(0);
  // Control whether to show any highlight at all
  const [showHighlight, setShowHighlight] = useState(true);
  
  // Complete paragraph text
  const paragraphText = "Suviksan technologies is a leading technology consulting and services company focused on creating innovative solutions that address clients' most complex digital transformation needs. With over 3+ years of experience managing global business systems and operations, we expertly lead clients in over 5 countries. Our operations are the company's largest globally and employ high-caliber technology professionals focused on helping clients address their core challenges and seize market opportunities.";

  // Detect when section enters viewport and trigger animations
  useEffect(() => {
    // Create intersection observer to watch when section becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start counter animation when visible
          startCounterAnimation();
          // Start text highlight animation when visible
          startParagraphHighlightAnimation();
          // Stop observing once animations are triggered
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% of element is visible
    );
    
    // Start observing our section element
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  /**
   * Animates counter values from 0 to target numbers
   * Creates smooth counting effect over 2 seconds
   */
  const startCounterAnimation = () => {
    const duration = 2000; // Animation duration in ms
    const interval = 20;   // Update interval in ms
    const steps = duration / interval;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      // Calculate animation progress (0 to 1)
      const progress = currentStep / steps;
      
      if (currentStep >= steps) {
        // Animation complete - set final values
        setCounters(targetValues);
        clearInterval(timer);
      } else {
        // Update counters based on progress
        setCounters(targetValues.map(value => 
          Math.ceil(progress * value)
        ));
      }
    }, interval);
  };
  
  /**
   * Animates a sweeping highlight across the entire paragraph
   * then removes the highlight when complete
   */
  const startParagraphHighlightAnimation = () => {
    const highlightDuration = 2000; // Duration for the sweep highlight (2 seconds)
    const interval = 20; // Update every 20ms
    const steps = highlightDuration / interval;
    let currentStep = 0;
    
    // First animate the highlight sweeping across
    const sweepTimer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      
      if (currentStep >= steps) {
        // Sweep completed
        setHighlightProgress(100);
        clearInterval(sweepTimer);
        
        // Wait 1 second then fade out the highlight
        setTimeout(() => {
          setShowHighlight(false);
        }, 1000);
      } else {
        // Update highlight progress
        setHighlightProgress(progress);
      }
    }, interval);
    
    return () => clearInterval(sweepTimer);
  };

  return (
    <section ref={sectionRef} className="section-padding bg-gray-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedSection variant="scale" className="relative">
              <div className="absolute -right-4 -bottom-4 w-full h-full border-4 border-suviksan-teal rounded-lg"></div>
              {/* Video element */}
              <video 
                src="/v (3).mp4" 
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-lg shadow-lg relative z-10 object-fit"
              />
            </AnimatedSection>

            {/* Stats with counting animation */}
            <StaggeredAnimation className="grid grid-cols-2 gap-6 mt-12" staggerDelay={0.15}>
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <h3 className="text-3xl font-bold text-suviksan-blue mb-2">
                    {/* Display animated counter value plus any '+' suffix */}
                    {counters[index]}{stat.value.includes('+') ? '+' : ''}
                  </h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </StaggeredAnimation>
          </div>

          <div className="lg:pl-6">
            <AnimatedSection variant="slideRight" className="mb-6">
              <h2 className="heading-lg text-suviksan-blue">About Suviksan Technologies</h2>
            </AnimatedSection>
            
            {/* Paragraph with sweeping highlight animation */}
            <AnimatedSection variant="fadeIn" delay={0.2} className="text-lg mb-6">
              <div className="relative">
                {/* The main paragraph text */}
                <p className="leading-relaxed relative z-10">
                  {paragraphText}
                </p>
                
                {/* Highlight overlay that animates across the text */}
                {showHighlight && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-orange-300 transition-all duration-200 -z-1 opacity-40"
                    style={{ 
                      width: `${highlightProgress}%`,
                      transition: 'width 50ms linear'
                    }}
                  />
                )}
              </div>
            </AnimatedSection>

            {/* Feature list with staggered animation */}
            <StaggeredAnimation className="space-y-3 mb-8" staggerDelay={0.1}>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-suviksan-teal mt-1 flex-shrink-0" />
                <p className="ml-3">Industry-certified security professionals</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-suviksan-teal mt-1 flex-shrink-0" />
                <p className="ml-3">Comprehensive solutions tailored to your business needs</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-suviksan-teal mt-1 flex-shrink-0" />
                <p className="ml-3">24/7 support and monitoring for continuous protection</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-suviksan-teal mt-1 flex-shrink-0" />
                <p className="ml-3">Innovation-driven approach to solving complex challenges</p>
              </div>
            </StaggeredAnimation>

            <AnimatedSection variant="slideUp" delay={0.5}>
              <Button asChild className="bg-red-500 text-white font-semibold transition-all duration-300 hover:scale-95">
                <Link to="/about/team">Learn More About Us</Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;