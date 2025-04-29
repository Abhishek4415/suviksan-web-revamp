import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Placement Drive',
      description: 'Connecting talent with opportunities at our annual placement event',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/placement-drive-1.jpg',
      category: 'events'
    },
    {
      id: 2,
      title: 'Placement Drive',
      description: 'Connecting talent with opportunities at our annual placement event',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/placement-drive-7.jpg',
      category: 'events'
    },
    
    {
      id: 3,
      title: 'Hackathon Sponsor',
      description: 'Supporting innovation and creativity in technology',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/Hackathon-Sponsor-1.jpg',
      category: 'events'
    },
    {
      id: 4,
      title: 'Hackathon Sponsor',
      description: 'Supporting innovation and creativity in technology',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/Hackathon-Sponsor-2.jpg',
      category: 'events'
    },
    {
      id: 5,
      title: 'Team Building',
      description: 'Strengthening bonds and fostering collaboration among our team',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/placement-drive-12.jpg',
      category: 'team'
    },
    {
      id: 6,
      title: 'Client Meeting',
      description: 'Building relationships and understanding client needs',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/placement-drive-6.jpg',
      category: 'clients'
    },
    {
      id: 7,
      title: 'Client Meeting',
      description: 'Building relationships and understanding client needs',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/placement-drive-9.jpg',
      category: 'clients'
    },
    {
      id: 8,
      title: 'Office Tour',
      description: 'Explore our modern workspace designed for productivity',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/placement-drive-10.jpg',
      category: 'office'
    },
    {
      id: 9,
      title: 'Training Session',
      description: 'Continuous learning and skill development programs',
      image: 'https://suviksan.com/wp-content/uploads/2025/04/placement-drive-2.jpg',
      category: 'events'
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  useEffect(() => {
    // Reset active slide when changing tabs
    setActiveSlide(0);
  }, [activeTab]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Parallax Effect */}
        <div className="relative h-60 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-110" 
            style={{ 
              backgroundImage: `url('/api/placeholder/1200/800')`,
              transform: 'translateZ(-1px) scale(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-suviksan-blue flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-5xl font-bold mb-6 transform transition-all text-white">
                Our Gallery
              </h1>
              <p className="text-xl max-w-2xl mx-auto text-white">
                Explore our journey through immersive visuals that showcase our culture and achievements.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12 overflow-x-auto">
            <div className="inline-flex bg-gray-800 rounded-lg p-1">
              {['all', 'events', 'team', 'clients', 'office'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-md transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Card Slider */}
          <div className="relative mb-16 overflow-hidden text-white">
            <div className="max-w-6xl mx-auto">
              {/* Main Slider */}
              <div 
                ref={sliderRef}
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                {filteredItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeSlide 
                        ? 'opacity-100 translate-x-0 z-10' 
                        : index < activeSlide 
                          ? 'opacity-0 -translate-x-full' 
                          : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                        <p className="text-lg text-gray-200 mb-4">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300"
                  aria-label="Next"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
                
                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                  {filteredItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Grid with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-xl bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                  <p className="text-gray-300 mb-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">{item.description}</p>
                  <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center self-end transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:bg-blue-700">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;