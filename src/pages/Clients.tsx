import { useState, useEffect } from 'react';
import { Shield, BookOpen, Server, ChevronRight, Users, Star, Award, CheckCircle, Clock, BarChart, ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Clients = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const clients = [
    {
      name: 'IKEA: Revolutionizing Home Living',
      logo: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/ikea.gif',
      industry: 'Technology',
      testimonial: 'Suviksan transformed our digital infrastructure with their innovative solutions.',
      relationship: '3+ years partnership',
      projects: 'Cloud Migration, DevOps Integration'
    },
    {
      name: 'Capgemini: Empowering Digital Transformation',
      logo: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/Capgemini.jpg',
      industry: 'Finance',
      testimonial: 'Their cybersecurity expertise helped us achieve 99.9% uptime.',
      relationship: '5+ years partnership',
      projects: 'Security Audit, Infrastructure Upgrade'
    },
    {
      name: 'Siemens: Engineering the Future',
      logo: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/siemens.jpg',
      industry: 'Healthcare',
      testimonial: 'Suviksan\'s IT solutions revolutionized our patient care system.',
      relationship: '2+ years partnership',
      projects: 'System Integration, Data Analytics'
    },
    {
      name: 'Godrej Group: Innovating for a Better Tomorrow',
      logo: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/GODREJ.jpg',
      industry: 'Retail',
      testimonial: 'Their e-commerce solutions helped us increase online sales by 45%.',
      relationship: '1+ year partnership',
      projects: 'E-commerce Platform, Mobile App'
    },
    {
      name: 'Bharat Heavy Electricals Limited (BHEL): Powering India’s Progress',
      logo: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/bhel.jpg',
      industry: 'Education',
      testimonial: 'Suviksan helped us transition to digital learning with minimal disruption.',
      relationship: '2+ years partnership',
      projects: 'Learning Management System, Analytics Dashboard'
    },
    {
      name: 'Magnit : The Evolution Of Work',
      logo: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/04/magnit.jpg',
      industry: 'Manufacturing',
      testimonial: 'Their IoT solutions improved our production efficiency significantly.',
      relationship: '3+ years partnership',
      projects: 'IoT Implementation, Process Automation'
    }
  ];

  const successStories = [
    {
      title: 'Digital Transformation Success',
      client: 'TechCorp Solutions',
      challenge: 'Legacy systems were hindering growth and innovation',
      solution: 'Implemented cloud-based infrastructure with CI/CD pipelines and microservices architecture',
      result: '40% increase in operational efficiency and 60% faster time-to-market',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/ikea.gif',

      stats: [
        { label: 'Efficiency Gain', value: '40%', icon: <BarChart className="text-green-500" /> },
        { label: 'Deployment Speed', value: '60% faster', icon: <Clock className="text-blue-500" /> },
        { label: 'Cost Reduction', value: '25%', icon: <CheckCircle className="text-purple-500" /> }
      ]
    },
    {
      title: 'Cybersecurity Enhancement',
      client: 'Global Finance Inc',
      challenge: 'Critical security vulnerabilities putting sensitive financial data at risk',
      solution: 'Comprehensive security audit, implementation of multi-layered security architecture and 24/7 monitoring',
      result: 'Zero security breaches in 2 years and full regulatory compliance',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/Capgemini.jpg',

      stats: [
        { label: 'Security Incidents', value: 'Zero', icon: <Shield className="text-red-500" /> },
        { label: 'Compliance Score', value: '100%', icon: <CheckCircle className="text-green-500" /> },
        { label: 'Threat Detection', value: '99.8%', icon: <Award className="text-yellow-500" /> }
      ]
    },
    {
      title: 'Healthcare System Integration',
      client: 'HealthCare Plus',
      challenge: 'Disconnected systems creating inefficiencies in patient care',
      solution: 'Unified health information system with real-time analytics and mobile access',
      result: '32% reduction in administrative overhead and improved patient outcomes',
      image: 'https://cdn-ildhhgn.nitrocdn.com/YguXiNEoAHybXTyczgUUnYBKxOUnQXCf/assets/images/optimized/rev-fe7ece2/suviksan.com/wp-content/uploads/2025/02/bhel.jpg',

      stats: [
        { label: 'Admin Overhead', value: '-32%', icon: <BarChart className="text-green-500" /> },
        { label: 'Patient Satisfaction', value: '+45%', icon: <Star className="text-yellow-500" /> },
        { label: 'Data Access Time', value: '3.2s', icon: <Clock className="text-blue-500" /> }
      ]
    }
  ];

  const testimonials = [
    {
      name: 'John Smith',
      position: 'CTO, TechCorp Solutions',
      company: 'TechCorp Solutions',
      avatar: 'https://avatars.githubusercontent.com/u/2761597?v=4',
      quote: 'Working with Suviksan has been a game-changer for our business. Their technical expertise and commitment to quality is unmatched in the industry.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      position: 'IT Director, HealthCare Plus',
      company: 'HealthCare Plus',
      avatar: 'https://th.bing.com/th/id/OIP.O8vv9O4Ku4HvFQyep-NXMAHaLG?rs=1&pid=ImgDetMain',
      quote: 'Their team\'s expertise and dedication are unmatched. They understand our unique challenges and deliver solutions that exceed expectations.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      position: 'CEO, Retail Connect',
      company: 'Retail Connect',
      avatar: 'https://th.bing.com/th/id/OIP.UGlKxiZQylR3CnJIXSbFIAHaLL?rs=1&pid=ImgDetMain',
      quote: 'Suviksan\'s strategic approach to digital transformation helped us navigate a challenging market transition. Their solutions directly contributed to our growth.',
      rating: 5
    }
  ];

  const industries = [
    { name: 'Technology', icon: <Server className="h-8 w-8" />, count: 12 },
    { name: 'Healthcare', icon: <Shield className="h-8 w-8" />, count: 8 },
    { name: 'Finance', icon: <BarChart className="h-8 w-8" />, count: 10 },
    { name: 'Education', icon: <BookOpen className="h-8 w-8" />, count: 6 },
    { name: 'Manufacturing', icon: <CheckCircle className="h-8 w-8" />, count: 7 },
    { name: 'Retail', icon: <Users className="h-8 w-8" />, count: 9 }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Intersection observer for reveal animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [activeTab]);

  // Next testimonial
  const nextTestimonial = () => {
    setCurrentTestimonial(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  // Previous testimonial
  const prevTestimonial = () => {
    setCurrentTestimonial(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* Header Placeholder (we're not importing) */}
        
        
        {/* Hero Section with animated gradient background */}
        <div className="relative bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-4 opacity-30" style={{ 
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1%, transparent 10%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1%, transparent 10%)',
              backgroundSize: '100px 100px',
              animation: 'backgroundShimmer 30s linear infinite'
            }}></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Trusted by Industry Leaders</h1>
              <p className="text-xl md:text-2xl max-w-2xl opacity-90">
                We partner with forward-thinking organizations to deliver exceptional results and drive digital transformation.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveTab('clients')}
                  className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Our Clients
                </button>
                <button 
                  onClick={() => setActiveTab('success')}
                  className="bg-blue-700 bg-opacity-20 text-white border border-white border-opacity-30 hover:bg-opacity-30 px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  Success Stories
                </button>
              </div>
        </div>
      </div>
          
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Industry Statistics Section */}


      {/* Navigation Tabs */}
        <div className="container mx-auto px-4 py-8 sticky top-0 bg-white z-10 shadow-sm">
          <div className="flex overflow-x-auto no-scrollbar space-x-1 border-b">
          <button
            onClick={() => setActiveTab('clients')}
              className={`pb-4 px-6 transition-all ${
                activeTab === 'clients' 
                  ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
          >
            Our Clients
          </button>
          <button
            onClick={() => setActiveTab('success')}
              className={`pb-4 px-6 transition-all ${
                activeTab === 'success' 
                  ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
          >
            Success Stories
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
              className={`pb-4 px-6 transition-all ${
                activeTab === 'testimonials' 
                  ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
          >
            Testimonials
          </button>
        </div>
      </div>

      {/* Content Sections */}
        <div className="container mx-auto px-4 py-12">
          {/* Clients Section */}
        {activeTab === 'clients' && (
            <div id="clients-section" className="reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
                  <div 
                    key={index} 
                    className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${
                      isVisible['clients-section'] 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <img src={client.logo} alt={client.name} className="h-12" />
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                          {client.industry}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{client.name}</h3>
                      <p className="text-gray-600 mb-4 italic">"{client.testimonial}"</p>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2 text-blue-500" />
                            <span>{client.relationship}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            <span>{client.projects}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Stories Section */}
          {activeTab === 'success' && (
            <div id="success-section" className="reveal-section space-y-16">
              {successStories.map((story, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-700 ${
                    isVisible['success-section'] 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-16 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <div className="h-full relative">
                        <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-blue-900/80 flex items-center justify-center p-8">
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-4">{story.title}</h3>
                            <p className="text-blue-100 mb-6">{story.client}</p>
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                              View Full Case Study
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8">
                      <div className="mb-8">
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-600 mb-2">The Challenge</h4>
                          <p className="text-gray-800">{story.challenge}</p>
                        </div>
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-600 mb-2">Our Solution</h4>
                          <p className="text-gray-800">{story.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-600 mb-2">The Results</h4>
                          <p className="text-gray-800">{story.result}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {story.stats.map((stat, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="flex justify-center mb-2">
                              {stat.icon}
                            </div>
                            <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        )}

          {/* Testimonials Section */}
          {activeTab === 'testimonials' && (
            <div id="testimonials-section" className="reveal-section">
              <div className={`transition-all duration-700 ${
                isVisible['testimonials-section'] ? 'opacity-100' : 'opacity-0'
              }`}>
                {/* Featured Testimonial Slider */}
                <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl overflow-hidden shadow-xl mb-16">
                  <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <svg viewBox="0 0 100 100" className="absolute right-0 top-0 h-full w-full">
                      <path fill="white" d="M95,50.5c0,24.9-20.2,45.1-45.1,45.1S4.9,75.4,4.9,50.5S25.1,5.4,50,5.4S95,25.6,95,50.5z"/>
                      <path fill="white" d="M84.7,50.5c0,19.2-15.6,34.8-34.8,34.8S15.2,69.7,15.2,50.5S30.8,15.7,50,15.7S84.7,31.3,84.7,50.5z"/>
                    </svg>
                  </div>
                  
                  <div className="md:flex">
                    <div className="md:w-1/2 p-10 md:p-16 relative z-10">
                      <div className="flex mb-8">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-white text-2xl font-light italic mb-8 leading-relaxed">
                        "{testimonials[currentTestimonial].quote}"
                      </blockquote>
                      <div className="flex items-center">
                        <img 
                          src={testimonials[currentTestimonial].avatar} 
                          alt={testimonials[currentTestimonial].name}
                          className="w-14 h-14 rounded-full mr-4 border-2 border-white"
                        />
                  <div>
                          <h4 className="text-white font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                          <p className="text-blue-100">{testimonials[currentTestimonial].position}</p>
                        </div>
                      </div>
                      
                      <div className="mt-10 flex space-x-3">
                        <button 
                          onClick={prevTestimonial}
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="h-5 w-5 text-white" />
                        </button>
                        <button 
                          onClick={nextTestimonial}
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                          aria-label="Next testimonial"
                        >
                          <ChevronRight className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="md:w-1/2 bg-blue-800 flex items-center justify-center relative">
                      <div className="p-10 text-center">
                        <div className="mb-6">
                          <Award className="h-16 w-16 text-yellow-400 mx-auto" />
                        </div>
                        <h3 className="text-white text-2xl font-bold mb-4">
                          Trusted by Leading Companies
                        </h3>
                        <p className="text-blue-100 mb-8">
                          Our clients achieve remarkable results through our innovative technology solutions.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <p className="text-3xl font-bold text-white">98%</p>
                            <p className="text-sm text-blue-100">Client Satisfaction</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <p className="text-3xl font-bold text-white">95%</p>
                            <p className="text-sm text-blue-100">Retention Rate</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div 
                      className="h-full bg-white transition-all"
                      style={{ 
                        width: `${((currentTestimonial + 1) / testimonials.length) * 100}%`,
                        transition: 'width 8s linear'
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* More Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index} 
                      className={`bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 ${
                        index === currentTestimonial ? 'ring-2 ring-blue-500 scale-105' : 'hover:shadow-xl'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-gray-600 text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        )}
        </div>
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Industries We Serve</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our expertise spans across multiple industries, providing tailored solutions to meet unique challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {industries.map((industry, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all hover:shadow-md"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-4">
                    {industry.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{industry.name}</h3>
                  <p className="text-sm text-gray-500 text-center">{industry.count}+ clients</p>
                </div>
              ))}
              </div>
          </div>
      </div>

        {/* CTA Section with blurred background */}
        <div className="relative mt-20 py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('/api/placeholder/1200/800')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90"></div>
          
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Business?</h2>
              <p className="text-xl mb-10 text-blue-100">
            Join our growing list of satisfied clients and experience the Suviksan difference.
                Our team of experts is ready to help you achieve your digital transformation goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="inline-flex items-center bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get in Touch
            <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  className="inline-flex items-center bg-transparent border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Download Brochure
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes backgroundShimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Clients; 