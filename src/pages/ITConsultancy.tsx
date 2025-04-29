import { Server, Settings, BarChart, Users, Clock, CheckCircle } from 'lucide-react';

const ITConsultancy = () => {
  const features = [
    {
      icon: <Server className="h-6 w-6" />,
      title: 'Infrastructure Optimization',
      description: 'Streamline your IT infrastructure for maximum efficiency and performance'
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'System Integration',
      description: 'Seamless integration of new and existing systems for better workflow'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Performance Analytics',
      description: 'Data-driven insights to optimize your IT operations'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Team Training',
      description: 'Comprehensive training programs for your IT staff'
    }
  ];

  const solutions = [
    {
      title: 'IT Strategy & Planning',
      description: 'Strategic IT consulting to align technology with business goals',
      benefits: [
        'Technology roadmap development',
        'IT budget optimization',
        'Resource allocation planning',
        'Risk assessment and mitigation'
      ]
    },
    {
      title: 'Infrastructure Management',
      description: 'Comprehensive management of your IT infrastructure',
      benefits: [
        'Network optimization',
        'Cloud infrastructure setup',
        'Data center management',
        'System monitoring and maintenance'
      ]
    },
    {
      title: 'Digital Transformation',
      description: 'Guide your business through digital evolution',
      benefits: [
        'Process automation',
        'Digital workflow implementation',
        'Legacy system modernization',
        'Innovation strategy development'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-suviksan-blue text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">IT Consultancy Services</h1>
          <p className="text-xl max-w-2xl">
            Strategic IT consulting to optimize your technology infrastructure and drive business growth
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Transform Your IT Infrastructure</h2>
            <p className="text-lg mb-6">
              Our IT consultancy services help businesses optimize their technology infrastructure, 
              improve efficiency, and drive digital transformation. We provide expert guidance to 
              align your IT strategy with your business objectives.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Round-the-clock technical support and monitoring
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Proven Expertise</h3>
                  <p className="text-gray-600">
                    Industry-certified consultants with years of experience
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
          <h2 className="text-3xl font-bold mb-12 text-center">Our IT Consultancy Solutions</h2>
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
            <p className="text-gray-600">Evaluate current IT infrastructure</p>
          </div>
          <div className="text-center">
            <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-suviksan-blue">2</span>
            </div>
            <h3 className="font-semibold mb-2">Strategy</h3>
            <p className="text-gray-600">Develop customized IT strategy</p>
          </div>
          <div className="text-center">
            <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-suviksan-blue">3</span>
            </div>
            <h3 className="font-semibold mb-2">Implementation</h3>
            <p className="text-gray-600">Execute strategic improvements</p>
          </div>
          <div className="text-center">
            <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-suviksan-blue">4</span>
            </div>
            <h3 className="font-semibold mb-2">Optimization</h3>
            <p className="text-gray-600">Continuous monitoring and improvement</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-suviksan-blue text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your IT Infrastructure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our IT consultancy services can help your business grow
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

export default ITConsultancy; 