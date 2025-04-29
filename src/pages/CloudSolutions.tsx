import { Cloud, Server, Database, Shield, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CloudSolutions = () => {
  const features = [
    {
      icon: <Cloud className="h-6 w-6" />,
      title: 'Cloud Migration',
      description: 'Seamless transition to cloud infrastructure'
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: 'Infrastructure as a Service',
      description: 'Scalable and flexible cloud infrastructure'
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Cloud Storage',
      description: 'Secure and reliable data storage solutions'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Cloud Security',
      description: 'Comprehensive security for cloud environments'
    }
  ];

  const solutions = [
    {
      title: 'Public Cloud',
      description: 'Leverage public cloud platforms for your business',
      benefits: [
        'Cost-effective scaling',
        'High availability',
        'Global reach',
        'Managed services'
      ]
    },
    {
      title: 'Private Cloud',
      description: 'Dedicated cloud infrastructure for your organization',
      benefits: [
        'Enhanced security',
        'Customized solutions',
        'Better control',
        'Compliance support'
      ]
    },
    {
      title: 'Hybrid Cloud',
      description: 'Combine public and private cloud benefits',
      benefits: [
        'Flexible deployment',
        'Optimized costs',
        'Improved security',
        'Scalable resources'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-suviksan-blue text-white py-20">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cloud Solutions</h1>
            <p className="text-xl max-w-2xl">
              Transform your business with scalable and secure cloud infrastructure
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Embrace Cloud Technology</h2>
              <p className="text-lg mb-6">
                Our cloud solutions help businesses leverage the power of cloud computing 
                to enhance efficiency, scalability, and security. We provide comprehensive 
                cloud services tailored to your specific needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Cloud className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Scalable Solutions</h3>
                    <p className="text-gray-600">
                      Scale your resources based on business needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Cost Optimization</h3>
                    <p className="text-gray-600">
                      Pay only for the resources you use
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Cloud Solutions</h2>
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
              <p className="text-gray-600">Evaluate your cloud readiness</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">2</span>
              </div>
              <h3 className="font-semibold mb-2">Planning</h3>
              <p className="text-gray-600">Design cloud architecture</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">3</span>
              </div>
              <h3 className="font-semibold mb-2">Migration</h3>
              <p className="text-gray-600">Move to cloud infrastructure</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">4</span>
              </div>
              <h3 className="font-semibold mb-2">Optimization</h3>
              <p className="text-gray-600">Continuous cloud optimization</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-suviksan-blue text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Move to the Cloud?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our cloud solutions can transform your business
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
      <Footer />
    </div>
  );
};

export default CloudSolutions; 