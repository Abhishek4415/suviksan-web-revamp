import { BarChart, Database, LineChart, PieChart, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DataAnalytics = () => {
  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Data Management',
      description: 'Efficient data collection and organization'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Business Intelligence',
      description: 'Transform data into actionable insights'
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: 'Predictive Analytics',
      description: 'Forecast trends and patterns'
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: 'Data Visualization',
      description: 'Clear and intuitive data representation'
    }
  ];

  const solutions = [
    {
      title: 'Data Analytics',
      description: 'Comprehensive data analysis solutions',
      benefits: [
        'Real-time analytics',
        'Custom dashboards',
        'Performance metrics',
        'Trend analysis'
      ]
    },
    {
      title: 'Business Intelligence',
      description: 'Strategic insights for business growth',
      benefits: [
        'Market analysis',
        'Competitor insights',
        'Customer behavior',
        'Revenue optimization'
      ]
    },
    {
      title: 'Predictive Modeling',
      description: 'Advanced forecasting and prediction',
      benefits: [
        'Risk assessment',
        'Demand forecasting',
        'Resource optimization',
        'Trend prediction'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Data & Analytics</h1>
            <p className="text-xl max-w-2xl">
              Transform your data into actionable insights for business growth
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Unlock the Power of Your Data</h2>
              <p className="text-lg mb-6">
                Our data and analytics services help businesses make informed decisions 
                by transforming raw data into valuable insights. We provide comprehensive 
                analytics solutions tailored to your specific needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <BarChart className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Data-Driven Decisions</h3>
                    <p className="text-gray-600">
                      Make informed business decisions based on data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-suviksan-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Competitive Edge</h3>
                    <p className="text-gray-600">
                      Gain insights to stay ahead of the competition
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Data & Analytics Solutions</h2>
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
              <h3 className="font-semibold mb-2">Data Collection</h3>
              <p className="text-gray-600">Gather and organize your data</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">2</span>
              </div>
              <h3 className="font-semibold mb-2">Analysis</h3>
              <p className="text-gray-600">Process and analyze the data</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">3</span>
              </div>
              <h3 className="font-semibold mb-2">Insights</h3>
              <p className="text-gray-600">Extract valuable insights</p>
            </div>
            <div className="text-center">
              <div className="bg-suviksan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-suviksan-blue">4</span>
              </div>
              <h3 className="font-semibold mb-2">Implementation</h3>
              <p className="text-gray-600">Apply insights to your business</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-suviksan-blue text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Data?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our data and analytics solutions can drive your business forward
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

export default DataAnalytics; 