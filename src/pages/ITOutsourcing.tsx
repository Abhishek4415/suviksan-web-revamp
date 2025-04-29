import { Users, Globe, Clock, Settings, CheckCircle } from 'lucide-react';

const ITOutsourcing = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Dedicated Teams',
      description: 'Expert teams working exclusively for your projects'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Talent Pool',
      description: 'Access to skilled professionals worldwide'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock technical assistance and maintenance'
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'Custom Solutions',
      description: 'Tailored outsourcing solutions for your business needs'
    }
  ];

  const solutions = [
    {
      title: 'Staff Augmentation',
      description: 'Enhance your team with skilled IT professionals',
      benefits: [
        'Flexible hiring models',
        'Quick team scaling',
        'Cost-effective solutions',
        'Reduced recruitment time'
      ]
    },
    {
      title: 'Managed Services',
      description: 'Comprehensive IT management and support',
      benefits: [
        'Proactive monitoring',
        'Regular maintenance',
        'Performance optimization',
        'Security management'
      ]
    },
    {
      title: 'Project Outsourcing',
      description: 'End-to-end project management and execution',
      benefits: [
        'Expert project management',
        'Quality assurance',
        'Timely delivery',
        'Cost control'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-suviksan-blue text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">IT Outsourcing Services</h1>
          <p className="text-xl max-w-2xl">
            Leverage global talent and expertise to scale your IT operations efficiently
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Streamline Your IT Operations</h2>
            <p className="text-lg mb-6">
              Our IT outsourcing services provide businesses with access to skilled professionals, 
              cost-effective solutions, and flexible engagement models. We help you focus on your 
              core business while we handle your IT needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">24/7 Availability</h3>
                  <p className="text-gray-600">
                    Continuous support and monitoring for your IT systems
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Cost Efficiency</h3>
                  <p className="text-gray-600">
                    Reduce operational costs while maintaining quality
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-suviksan-blue">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="bg-gray-100 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our IT Outsourcing Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-suviksan-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="container-custom py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-suviksan-blue">1</span>
            </div>
            <h3 className="font-semibold mb-2">Assessment</h3>
            <p className="text-gray-600">Evaluate your IT needs and requirements</p>
          </div>
          <div className="text-center">
            <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-suviksan-blue">2</span>
            </div>
            <h3 className="font-semibold mb-2">Planning</h3>
            <p className="text-gray-600">Develop customized outsourcing strategy</p>
          </div>
          <div className="text-center">
            <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-suviksan-blue">3</span>
            </div>
            <h3 className="font-semibold mb-2">Implementation</h3>
            <p className="text-gray-600">Deploy dedicated teams and resources</p>
          </div>
          <div className="text-center">
            <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-suviksan-blue">4</span>
            </div>
            <h3 className="font-semibold mb-2">Optimization</h3>
            <p className="text-gray-600">Continuous improvement and monitoring</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-suviksan-blue text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your IT Operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our IT outsourcing services can benefit your business
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-suviksan-blue px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default ITOutsourcing; 