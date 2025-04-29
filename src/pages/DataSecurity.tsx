import { Shield, Lock, Database, Key, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DataSecurity = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Data Protection',
      description: 'Comprehensive protection for your sensitive data'
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Access Control',
      description: 'Granular access management and authentication'
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Data Encryption',
      description: 'Advanced encryption for data at rest and in transit'
    },
    {
      icon: <Key className="h-6 w-6" />,
      title: 'Key Management',
      description: 'Secure key storage and rotation policies'
    }
  ];

  const solutions = [
    {
      title: 'Data Protection',
      description: 'End-to-end data security solutions',
      benefits: [
        'Data classification',
        'Encryption management',
        'Access controls',
        'Audit logging'
      ]
    },
    {
      title: 'Compliance Management',
      description: 'Meet regulatory requirements',
      benefits: [
        'GDPR compliance',
        'HIPAA compliance',
        'PCI DSS compliance',
        'Regular audits'
      ]
    },
    {
      title: 'Security Monitoring',
      description: 'Continuous security oversight',
      benefits: [
        'Real-time monitoring',
        'Threat detection',
        'Incident response',
        'Security analytics'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Data Security Solutions</h1>
            <p className="text-xl max-w-2xl">
              Protect your valuable data with enterprise-grade security solutions
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Secure Your Data Assets</h2>
              <p className="text-lg mb-6">
                Our data security solutions provide comprehensive protection for your 
                sensitive information. We implement robust security measures to ensure 
                your data remains secure, compliant, and protected from threats.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Enterprise Security</h3>
                    <p className="text-gray-600">
                      Advanced security measures for enterprise data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Compliance Ready</h3>
                    <p className="text-gray-600">
                      Meet industry standards and regulations
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Data Security Solutions</h2>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Our Security Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">1</span>
              </div>
              <h3 className="font-semibold mb-2">Assessment</h3>
              <p className="text-gray-600">Evaluate security needs</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">2</span>
              </div>
              <h3 className="font-semibold mb-2">Planning</h3>
              <p className="text-gray-600">Design security strategy</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">3</span>
              </div>
              <h3 className="font-semibold mb-2">Implementation</h3>
              <p className="text-gray-600">Deploy security measures</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">4</span>
              </div>
              <h3 className="font-semibold mb-2">Monitoring</h3>
              <p className="text-gray-600">Continuous security oversight</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-suviksan-blue text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Data?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our data security solutions can protect your business
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

export default DataSecurity; 