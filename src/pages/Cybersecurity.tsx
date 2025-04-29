import { Shield, Lock, AlertTriangle, CheckCircle, Users, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cybersecurity = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Advanced Threat Protection',
      description: 'State-of-the-art security measures to protect against evolving cyber threats'
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Data Encryption',
      description: 'End-to-end encryption for sensitive business data and communications'
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'Threat Detection',
      description: 'Real-time monitoring and early warning systems for potential threats'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Compliance Management',
      description: 'Ensure adherence to industry regulations and standards'
    }
  ];

  const solutions = [
    {
      title: 'Network Security',
      description: 'Comprehensive protection for your network infrastructure',
      benefits: [
        'Firewall implementation and management',
        'Intrusion detection and prevention',
        'VPN solutions for secure remote access',
        'Network segmentation and access control'
      ]
    },
    {
      title: 'Endpoint Security',
      description: 'Protection for all devices connected to your network',
      benefits: [
        'Antivirus and anti-malware solutions',
        'Device management and monitoring',
        'Patch management and updates',
        'Mobile device security'
      ]
    },
    {
      title: 'Cloud Security',
      description: 'Secure your cloud infrastructure and applications',
      benefits: [
        'Cloud access security broker (CASB)',
        'Data loss prevention',
        'Cloud workload protection',
        'Identity and access management'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cybersecurity Solutions</h1>
            <p className="text-xl max-w-2xl">
              Protect your business from cyber threats with our comprehensive security solutions
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Cybersecurity Matters</h2>
              <p className="text-lg mb-6">
                In today's digital world, cybersecurity is crucial for protecting your business assets, 
                maintaining customer trust, and ensuring regulatory compliance. Our solutions provide 
                comprehensive protection against evolving cyber threats.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Protect Your Business</h3>
                    <p className="text-gray-600">
                      Safeguard your critical assets and sensitive data from cyber threats
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">24/7 Protection</h3>
                    <p className="text-gray-600">
                      Continuous monitoring and threat detection to keep your business secure
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Cybersecurity Solutions</h2>
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
              <p className="text-gray-600">Evaluate your current security posture</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">2</span>
              </div>
              <h3 className="font-semibold mb-2">Planning</h3>
              <p className="text-gray-600">Develop a customized security strategy</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">3</span>
              </div>
              <h3 className="font-semibold mb-2">Implementation</h3>
              <p className="text-gray-600">Deploy security solutions and measures</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">4</span>
              </div>
              <h3 className="font-semibold mb-2">Monitoring</h3>
              <p className="text-gray-600">Continuous security monitoring and updates</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-suviksan-blue text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our cybersecurity solutions can protect your business
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

export default Cybersecurity; 