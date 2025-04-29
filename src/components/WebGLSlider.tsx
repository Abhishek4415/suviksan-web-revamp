import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WebGLSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const sliderRef = useRef<HTMLDivElement>(null);

  const videos = [
    "/h.mp4",
    "/v (1).mp4",
    "/v (3).mp4",
  ];

  const slides = [
    {
      title: 'Cybersecurity Excellence™',
      description: 'Our promise to help enterprises across industries transform at speed and bring agility, resilience, and efficiency to their businesses.',
      cta: 'Explore Services',
      link: '/services/cybersecurity',
    },
    {
      title: 'Innovative IT Solutions',
      description: 'Custom software and enterprise solutions for modern businesses focused on growth and digital transformation',
      cta: 'About More',
      link: '/about/team',
    },
    {
      title: 'World wide Presence',
      description: 'Securing your business from modern threats with advanced protection strategies and monitoring',
      cta: 'Our Clients',
      link: '/clients',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection('next');
      setActiveSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const goToSlide = (index: number) => {
    setSlideDirection(index > activeSlide ? 'next' : 'prev');
    setActiveSlide(index);
  };

  return (
    <div ref={sliderRef} className="relative w-full h-screen overflow-hidden">
      {videos.map((video, index) => {
        const isActive = activeSlide === index;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="relative h-full w-full flex  overflow-hidden">
              {/* Left Background Fill */}
              <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0% 100%)' }}></div>

              {/* Left Content */}
              <div 
                className={`relative z-20 w-full  md:w-1/2 xl:w-5/12 p-8 md:p-16 lg:p-24 flex top-[160px] 
                  absolute inset-0 transform transition-transform duration-800 ease-in-out
                  ${isActive ? '-translate-x-0' : slideDirection === 'next' ? '-translate-x-full' : '-translate-x-full'}
                `}
              >
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-8 tracking-tight">
                    {slides[index].title}
                  </h1>
                  <p className="text-sm md:text-lg text-gray-700 mb-10 pr-14 max-w-lg">
                    {slides[index].description}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="px-3 py-1 rounded-md text-sm font-semibold md:text-xl bg-red-500 text-white"
                  >
                    <Link to={slides[index].link} className="flex items-center">
                      {slides[index].cta} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Side - Animated Video Section */}
              <div
                className={`
                  absolute inset-0 transform transition-transform duration-1000 ease-in-out bg-red-500 md:left-[0px] left-[100px] 
                  ${isActive ? 'translate-x-0' : slideDirection === 'next' ? 'translate-x-full' : '-translate-x-full'}
                `}
                style={{
                  clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 55% 100%)',
                }}

                

              >
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full absolute  object-cover md:left-[0px] left-1/2 left-[90px] top-1/2 transform -translate-y-1/2"
                  style={{
                    clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 55% 100%)',
                  }}
                />
                <div className="absolute inset-0 bg-black/15"></div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => {
              setSlideDirection('prev');
              setActiveSlide((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
            }}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => {
              setSlideDirection('next');
              setActiveSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
            }}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-24 md:bottom-12 md:left-24 z-30 flex space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeSlide === index ? 'w-10 bg-black' : 'w-4 bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WebGLSlider;
