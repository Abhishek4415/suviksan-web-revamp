import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Award, Users, Globe, Shield } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';
import ParallaxSection from './ParallaxSection';

const ClientsSection = () => {
  // Reference for logo list that will be duplicated
  const logosRef = useRef(null);

  // Set up for the logo animation
  useEffect(() => {
    if (logosRef.current) {
      // Clone the logo list and append it for seamless scrolling
      const clone = logosRef.current.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      logosRef.current.parentNode.appendChild(clone);
    }
  }, []);

  // Add keyframes animation to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes infinite-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      
      .animate-infinite-scroll {
        animation: infinite-scroll 30s linear infinite;
      }
      
      @keyframes slide-in-right {
        0% { opacity: 0; transform: translateX(30px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slide-out-left {
        0% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(-30px); }
      }
      
      @keyframes slide-in-left {
        0% { opacity: 0; transform: translateX(-30px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slide-out-right {
        0% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(30px); }
      }
      
      .slide-in-right {
        animation: slide-in-right 0.5s ease forwards;
      }
      
      .slide-out-left {
        animation: slide-out-left 0.5s ease forwards;
      }
      
      .slide-in-left {
        animation: slide-in-left 0.5s ease forwards;
      }
      
      .slide-out-right {
        animation: slide-out-right 0.5s ease forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const stats = [
    { icon: Globe, label: "Global Presence", value: "5+ Countries" },
    { icon: Users, label: "Enterprise Clients", value: "100+" },
    { icon: Award, label: "Industry Awards", value: "50+" },
    { icon: Shield, label: "Security Certifications", value: "15+" }
  ];

  // Expanded clients list for better scrolling effect
  const clients = [
    {
      id: 1,
      name: "Fortune 500 Financial Institution",
      logo: "https://www.capgemini.com/wp-content/themes/capgemini-komposite/assets/images/logo.svg",
      category: "Banking & Finance"
    },
    {
      id: 2,
      name: "Global Technology Corporation",
      logo: "/siemens.svg",
      category: "Technology"
    },
    {
      id: 3,
      name: "Healthcare Solutions Provider",
      logo: "/ikea.svg",
      category: "Healthcare"
    },
    {
      id: 4,
      name: "Manufacturing Excellence Corp",
      logo: "https://cruip-tutorials.vercel.app/logo-carousel/apple.svg",
      category: "Manufacturing"
    },
    {
      id: 5,
      name: "Retail Innovation Group",
      logo: "https://cruip-tutorials.vercel.app/logo-carousel/spark.svg",
      category: "Retail"
    },
    {
      id: 6,
      name: "Energy Solutions Global",
      logo: "https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg",
      category: "Energy"
    },
    {
      id: 7,
      name: "Tech Innovations Inc",
      logo: "https://cruip-tutorials.vercel.app/logo-carousel/quora.svg",
      category: "Technology"
    },
    {
      id: 8,
      name: "Digital Platforms Group",
      logo: "https://cruip-tutorials.vercel.app/logo-carousel/sass.svg",
      category: "Digital"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Chief Information Officer",
      company: "Ikea",
      testimonial: "Suviksan Technologies has transformed our cybersecurity infrastructure with their cutting-edge solutions and proactive approach to threat detection.",
      rating: 5,
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      bgColor: "bg-blue-50" // Different background color for each testimonial
    },
    {
      id: 2,
      name: "Michael Brown",
      position: "CEO, Innovate Solutions",
      company: "Siemens",
      testimonial: "The IT consultancy services provided by Suviksan have transformed our digital infrastructure. They truly understand our business needs and deliver solutions that drive growth.",
      rating: 5,
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      bgColor: "bg-green-50" // Different background color
    },
    {
      id: 3,
      name: "Jane Smith",
      position: "CTO, TechCorp Inc.",
      company: "Capgemini",
      testimonial: "Suviksan Technologies has been instrumental in strengthening our cybersecurity posture. Their team's expertise and proactive approach have helped us stay ahead of potential threats.",
      rating: 5,
      imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
      bgColor: "bg-purple-50" // Different background color
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState(null);
  const [animationClass, setAnimationClass] = useState('slide-in-right');

  const nextTestimonial = () => {
    setDirection('next');
    setAnimationClass('slide-out-left');
    
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      setAnimationClass('slide-in-right');
    }, 700); // Wait for exit animation to complete
  };

  const prevTestimonial = () => {
    setDirection('prev');
    setAnimationClass('slide-out-right');
    
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setAnimationClass('slide-in-left');
    }, 500); // Wait for exit animation to complete
  };

  // Apply initial animation class when component mounts
  useEffect(() => {
    setAnimationClass('slide-in-right');
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50" id="clients">
      <div className="container-custom">
        {/* Stats Section */}
        <StaggeredAnimation className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" staggerDelay={0.1}>
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-suviksan-teal" />
              <div className="text-2xl font-bold text-suviksan-blue mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </StaggeredAnimation>

        <AnimatedSection variant="slideUp" className="text-center mb-16">
          <h2 className="heading-lg text-suviksan-blue mb-4">Our Global Enterprise Clients</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trusted by leading organizations across industries to deliver innovative technology solutions
            that drive business transformation.
          </p>
        </AnimatedSection>

        {/* Infinite Scrolling Client Logos */}
        <AnimatedSection variant="fadeIn" className="mb-20">
          <div className="w-full inline-flex bg-slate-900 p-10 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_left,transparent_0,_black_128px,_black_calc(100%-118px),transparent_100%)]">
            <ul
              ref={logosRef}
              className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll"
            >
              {clients.map((client) => (
                <li key={client.id} className="flex items-center justify-center min-w-[160px]">
                  <div className="group relative">
                    <div className="p-4 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md min-h-[80px] flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="h-12 w-[200px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-0 right-0 text-center text-sm text-muted-foreground transition-opacity duration-300">
                      {client.category}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* Testimonials Section with Left-Right Animation and Color Changes */}
        <ParallaxSection direction="up" speed={0.15} className="mb-10">
          <AnimatedSection variant="scale" className={`${testimonials[activeTestimonial].bgColor} rounded-2xl p-8 md:p-12 relative overflow-hidden transition-colors duration-1000`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-suviksan-teal/10 rounded-full -translate-y-1/3 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-suviksan-teal/10 rounded-full translate-y-1/3 -translate-x-1/3"></div>

            <h3 className="heading-md text-suviksan-blue mb-10 text-center relative z-10">"What Our Clients Say!"</h3>

            <div className="relative min-h-[300px] flex justify-center items-center">
              <div className="max-w-4xl mx-auto w-full">
                <div className={`relative z-10 ${animationClass}`}>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-md">
                      <img
                        src={testimonials[activeTestimonial].imageUrl}
                        alt={testimonials[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-xl font-semibold">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-muted-foreground">{testimonials[activeTestimonial].position}</p>
                    <p className="text-red-500">{testimonials[activeTestimonial].company}</p>
                  </div>

                  <blockquote className="text-lg md:text-xl text-center italic mb-8">
                    "{testimonials[activeTestimonial].testimonial}"
                  </blockquote>

                  <div className="flex justify-center space-x-1 mb-8">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index > activeTestimonial) {
                      setDirection('next');
                      setAnimationClass('slide-out-left');
                      setTimeout(() => {
                        setActiveTestimonial(index);
                        setAnimationClass('slide-in-right');
                      }, 500);
                    } else if (index < activeTestimonial) {
                      setDirection('prev');
                      setAnimationClass('slide-out-right');
                      setTimeout(() => {
                        setActiveTestimonial(index);
                        setAnimationClass('slide-in-left');
                      }, 500);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-suviksan-blue scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* CTA Section */}
        <AnimatedSection variant="slideUp" delay={0.2} className="text-center mt-16">
          <h3 className="heading-md text-suviksan-blue mb-6">Ready to Join Our Success Story?</h3>
          <Button asChild size="lg" className="min-w-[200px]">
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ClientsSection;