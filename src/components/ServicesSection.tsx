import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Server, BarChart2, Lock, Database, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';

// Services data
const services = [
  {
    id: 1,
    title: 'Cybersecurity',
    icon: Shield,
    description: 'Protect digital assets from threats and vulnerabilities.',
    features: ['Penetration Testing', 'Security Assessments', 'Managed Security Services'],
    link: '/services/cybersecurity',
    imageUrl: '/service (4).jpg',
  },
  {
    id: 2,
    title: 'IT Outsourcing',
    icon: Server,
    description: 'Reliable IT outsourcing to reduce costs and improve efficiency.',
    features: ['Remote Support', 'Dedicated Teams', 'Infrastructure Management'],
    link: '/services/it-outsourcing',
    imageUrl: '/service (2).jpg',
  },
  {
    id: 3,
    title: 'Data Analytics',
    icon: BarChart2,
    description: 'Make informed decisions using data insights.',
    features: ['Big Data', 'Business Intelligence', 'Predictive Analytics'],
    link: '/services/data-analytics',
    imageUrl: '/service (3).jpg',
  },
  {
    id: 4,
    title: 'Cyber Security',
    icon: Lock,
    description: 'Defend systems against digital attacks.',
    features: ['Risk Management', 'Compliance', 'Endpoint Security'],
    link: '/services/cyber-security',
    imageUrl: '/service (5).jpg',
  },
  {
    id: 5,
    title: 'Data Security',
    icon: Database,
    description: 'Encrypt and control access to your data.',
    features: ['Data Encryption', 'Access Controls', 'Compliance Standards'],
    link: '/services/data-security',
    imageUrl: '/service (1).jpg',
  },
];

const ServicesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 1; // Adjust speed (higher = faster)
    let animationFrameId: number;

    const scroll = () => {
      if (!el) return;

      el.scrollLeft += speed;

      // Reset scroll when we reach halfway (i.e. full scrollable content)
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative bg-white py-20 overflow-hidden" id="services">
      <div className="container-custom">
        {/* Section heading */}
        <AnimatedSection variant="slideUp" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-5xl mb-4 text-gray-900">OUR SERVICES</h2>
          <p className="text-lg text-gray-600">
            Discover our expert tech solutions built to empower your business.
          </p>
        </AnimatedSection>

        {/* Infinite Scroller */}
        <div
          ref={scrollRef}
          className="flex space-x-6 px- p-10   sm:px-10 overflow-x-auto no-scrollbar whitespace-nowrap"
        >
          {/* Duplicate services array to simulate infinite scroll */}
          {[...services, ...services].map((service, index) => (
            <AnimatedSection
              key={service.id}
              variant="fadeIn"
              delay={index * 0.2}
              className="min-w-[300px] flex flex-col bg-gray-200 max-w-[300px] bg-gray-100 rounded-xl shadow-lg flex-shrink-0 hover:scale-110 transition-all duration-300"
            >
              {/* Service image */}
              <div className="relative  h-40 rounded-xl overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                />
              </div>

              {/* Service content */}
              <div className="p-4 flex flex-col  justify-between">
                <div className="flex items-center mb-3">
                  <div className="bg-white p-2 rounded-full mr-3 shadow">
                    <service.icon className="h-5 w-5 text-suviksan-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                </div>
                <div className='flex flex-col max-w-md'>
                  <p className="text-sm  text-gray-600 mb-3  overflow-hidden text-ellipsis">{service.description}</p>
                </div>

                <ul className="mb-4 space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-suviksan-teal rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More button */}
                <Button  asChild className="w-full bg-orange-500 border-suviksan-teal text-suviksan-teal ">
                  <Link to={service.link} className="flex items-center justify-center text-white font-semibold ">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
