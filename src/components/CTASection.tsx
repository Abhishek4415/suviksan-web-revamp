import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import ParallaxSection from './ParallaxSection';

const CTASection = () => {
  return (
    <section className="py-16 bg-gray-700  relative overflow-hidden border-t border-gray-200">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxSection direction="right" speed={0.05}>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-suviksan-teal/5 rounded-full blur-xl"></div>
        </ParallaxSection>
        <ParallaxSection direction="left" speed={0.05}>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-suviksan-blue/5 rounded-full blur-xl"></div>
        </ParallaxSection>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-300 p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
            <AnimatedSection variant="slideUp" className="mb-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-suviksan-blue">
                Ready to Secure Your Digital Future?
              </h2>
            </AnimatedSection>
            
            <AnimatedSection variant="fadeIn" delay={0.1} className="mb-8 text-center">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Partner with Suviksan Technologies for comprehensive cybersecurity, IT consultancy, 
                and enterprise solutions tailored to your business needs.
              </p>
            </AnimatedSection>
            
            <AnimatedSection variant="slideUp" delay={0.2} className="text-center">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-suviksan-teal hover:bg-teal-600 text-white">
                  <Link to="/contact">Get Started Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-suviksan-blue text-suviksan-blue hover:bg-suviksan-blue/10">
                  <Link to="/services">Explore Our Services</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;