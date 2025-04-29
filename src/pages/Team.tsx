import { Linkedin, Mail, Phone, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Team = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const teamSectionRef = useRef(null);
  const carouselRef = useRef(null);
  const teamRefs = useRef([]);

  // Enhanced team members data with more professional imagery
  const teamMembers = [
    {
      name: 'Vikrant Kishore',
      role: 'Group Operations Director',
      description: 'Vikrant Kishore brings a wealth of experience and expertise to his role as Group Operations Director at Suviksan Technologies, where he plays a pivotal role in steering the company\'s operational strategies towards success. With an MBA in Business Entrepreneurship and over two decades of dedicated service, Vikrant epitomizes visionary leadership and operational excellence.',
      image: 'https://media.licdn.com/dms/image/v2/C5103AQEbZ5l6_xHOMg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1571306529545?e=1751500800&v=beta&t=tyBDL00_zjhD5t0ArMLgj3djwMVruaBr_Sk01dB6HTc',
      linkedin: 'https://www.linkedin.com/in/vikrant-kishore-singh-7a723b13/',
      email: 'vikrant@suviksan.com'
    },
    {
      name: 'Shammi Anand',
      role: 'Group Technology Director',
      description: 'Shammi Anand is a distinguished B.E graduate with an illustrious career spanning over 15 years, marked by significant contributions to the realms of Information Technology (IT), Power Sector, and Heavy Manufacturing. Currently assuming the pivotal role of Group Technology Director at Suviksan Technologies Pvt Ltd, Shammi embodies a fusion of profound technical acumen and an unwavering commitment to process enhancement.',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/sammi-4.jpg',
      linkedin: 'https://linkedin.com/in/shammi-anand',
      email: 'shammi@suviksan.com'
    },
    {
      name: 'Astha',
      role: 'HR Manager',
      description: 'Astha brings 15 years of experience and expertise to our executive team as an HR Manager. She has an MBA degree from a top institute in India. With a strong history of managing human resources and a good understanding of the IT industry, Astha plays a key role in shaping our company\'s culture and making sure we succeed.',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/astha.jpg',
      linkedin: 'https://www.linkedin.com/in/astha-84a89430a/',
      email: 'astha@suviksan.com'
    },
    {
      name: 'Rahul Thakur',
      role: 'Operations Manager',
      description: 'Rahul is a BE graduate with an impressive 10 year IT experience in IT, Power Sector and Heavy Manufacturing sectors. He serves as the Operation manager of Suviksan Technologies Pvt Ltd, leveraging his strong technology background and passion for process optimization. Rahul has also enhanced his skills with comprehensive training in Big Data and Data Science.',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/rahul.jpg',
      linkedin: 'https://linkedin.com/in/rahul-thakur',
      email: 'rahul@suviksan.com'
    },
    {
      name: 'Sneha Jha',
      role: 'Training Operation Manager',
      description: 'Sneha brings a rich tapestry of expertise and experience to her role as Training Operation Manager at Suviksan Technologies. Armed with a postgraduate degree in Organization Management and over a decade of dedicated service, Sneha embodies a rare blend of strategic insight and operational prowess.',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/sneha.jpg',
      linkedin: 'https://linkedin.com/in/sneha-jha',
      email: 'sneha@suviksan.com'
    },
    {
      name: 'Hemant Mishra',
      role: 'Chief Financial Officer',
      description: 'Hemant is CFO of Suviksan Technologies PVT LTD. Hemant is a key architect of our financial strategy and steward of our company\'s fiscal health. With a proven track record in financial management and a deep understanding of the IT industry, he brings invaluable expertise to our executive team.',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/hemant.jpg',
      linkedin: 'https://linkedin.com/in/hemant-mishra',
      email: 'hemant@suviksan.com'
    },
    {
      name: 'Sudhir Kumar Singh',
      role: 'Chief Legal Officer',
      description: 'Sudhir Kumar Singh serves as the Chief Legal Officer, bringing over 20 years of extensive legal experience to the organization. With a strong background in corporate law, regulatory compliance, and risk management, he plays a pivotal role in shaping our legal strategy and ensuring alignment with industry standards.',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/sudhir-kr-singh-1.jpg',
      linkedin: 'https://linkedin.com/in/sudhir-kumar-singh',
      email: 'sudhir@suviksan.com'
    }
  ];

  // Company stats data
  const companyStats = [
    { label: 'Countries Served', value: '5+' },
    { label: 'Years Experience', value: '3+' },
    { label: 'Team Members', value: '25+' },
    { label: 'Projects Completed', value: '100+' }
  ];

  // Handle carousel navigation
  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  // Intersection observer setup
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('data-id');
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [id]: true }));
        }
      });
    }, observerOptions);

    // Observe team section
    if (teamSectionRef.current) {
      observer.observe(teamSectionRef.current);
    }

    // Observe each team member card
    teamRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      
      {/* Company Overview with Stats */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 relative inline-block">
            About Suviksan Technologies
            <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-blue-600 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Suviksan Technologies is a leading technology consulting and services company focused on creating innovative solutions that address clients' most complex digital transformation needs. With over 3+ years of experience managing global business systems and operations, we expertly lead clients in over 5 countries.
          </p>
          <p className="text-lg text-gray-700 font-medium">
            Our mission is to empower businesses through cutting-edge technology solutions, fostering innovation, and driving sustainable growth.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {companyStats.map((stat, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-700 ease-in-out ${isVisible[`stat-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-id={`stat-${index}`}
              ref={el => {
                if (el && !teamRefs.current.includes(el)) {
                  teamRefs.current.push(el);
                }
              }}
            >
              <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div 
            className={`bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform ${isVisible['value-1'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            data-id="value-1"
            ref={el => {
              if (el && !teamRefs.current.includes(el)) {
                teamRefs.current.push(el);
              }
            }}
          >
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Best IT Services</h3>
            <p className="text-gray-700">We deliver exceptional quality solutions with a proven track record of successful IT services across diverse industries.</p>
          </div>
          <div 
            className={`bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform ${isVisible['value-2'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '150ms' }}
            data-id="value-2"
            ref={el => {
              if (el && !teamRefs.current.includes(el)) {
                teamRefs.current.push(el);
              }
            }}
          >
            <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Highly Dedicated</h3>
            <p className="text-gray-700">Our team exhibits unwavering commitment to client success, with a focus on delivering excellence in every engagement.</p>
          </div>
          <div 
            className={`bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform ${isVisible['value-3'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
            data-id="value-3"
            ref={el => {
              if (el && !teamRefs.current.includes(el)) {
                teamRefs.current.push(el);
              }
            }}
          >
            <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Expert Team</h3>
            <p className="text-gray-700">Our diverse team of experts brings decades of combined experience across various domains and cutting-edge technologies.</p>
          </div>
        </div>
      </div>

      {/* Professional Team Carousel */}
      <div 
        id="team" 
        ref={teamSectionRef}
        className={`py-24 bg-gradient-to-b from-white to-gray-100 transition-all duration-1000 ${isVisible['team-section'] ? 'opacity-100' : 'opacity-0'}`}
        data-id="team-section"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-600">
              Leadership Team
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></div>
          </h2>

          <div ref={carouselRef} className="relative max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
                      <div className="md:w-1/2 relative overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                          style={{ minHeight: '400px' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6">
                          <h3 className="text-3xl font-bold text-white mb-2">{member.name}</h3>
                          <p className="text-blue-300 font-medium text-xl">{member.role}</p>
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                          <p className="text-gray-700 mb-6 text-lg">{member.description}</p>
                        </div>
                        <div className="flex space-x-4">
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white p-3 rounded-full transition-colors duration-300"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <a 
                            href={`mailto:${member.email}`}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white p-3 rounded-full transition-colors duration-300"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white text-blue-800 hover:text-white hover:bg-blue-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10 focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white text-blue-800 hover:text-white hover:bg-blue-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10 focus:outline-none"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section with hover effects */}
      <div 
        id="contact" 
        className={`bg-gradient-to-r from-blue-900 to-indigo-800 py-24 transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100' : 'opacity-0'}`}
        data-id="contact"
        ref={el => {
          if (el && !teamRefs.current.includes(el)) {
            teamRefs.current.push(el);
          }
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Get in Touch</h2>
            <p className="text-blue-200 mb-10 text-lg">
              We'd love to hear from you. Reach out to our team and discover how Suviksan Technologies can help transform your business.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Call Us</h3>
                <p className="text-blue-200">+91 7992281130</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Email Us</h3>
                <p className="text-blue-200">info@suviksan.com</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Visit Us</h3>
                <p className="text-blue-200">Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles */}
      <style >{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default Team;