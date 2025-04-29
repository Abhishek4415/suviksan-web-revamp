import { Trophy, Award, Star, Medal } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Awards = () => {
  const awards = [
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Best IT Services Provider 2023',
      description: 'Recognized for excellence in delivering innovative IT solutions and services',
      year: '2023'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Top Cybersecurity Company',
      description: 'Awarded for outstanding contributions to cybersecurity and data protection',
      year: '2022'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Innovation Excellence Award',
      description: 'Recognized for groundbreaking technological innovations and solutions',
      year: '2022'
    },
    {
      icon: <Medal className="h-8 w-8" />,
      title: 'Customer Service Excellence',
      description: 'Awarded for exceptional customer service and support',
      year: '2021'
    }
  ];

  const achievements = [
    {
      title: 'Global Reach',
      description: 'Successfully serving clients in over 5 countries',
      value: '5+'
    },
    {
      title: 'Years of Experience',
      description: 'Proven track record in IT services',
      value: '3+'
    },
    {
      title: 'Projects Completed',
      description: 'Successful implementation of IT solutions',
      value: '100+'
    },
    {
      title: 'Client Satisfaction',
      description: 'High client satisfaction rate',
      value: '98%'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-suviksan-blue text-white py-20">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Awards & Recognitions</h1>
            <p className="text-xl max-w-2xl">
              Celebrating our achievements and industry recognition
            </p>
          </div>
        </div>

        {/* Awards Section */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="text-suviksan-blue">{award.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                    <p className="text-gray-600 mb-2">{award.description}</p>
                    <span className="text-suviksan-blue font-medium">{award.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-gray-100 py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl font-bold text-suviksan-blue mb-2">
                    {achievement.value}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Overview */}
        <div className="container-custom py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-gray-600 mb-8">
              Suviksan Technologies has consistently demonstrated excellence in the IT industry, 
              earning recognition for our innovative solutions, exceptional service, and commitment 
              to client success. Our awards and achievements reflect our dedication to delivering 
              high-quality IT services and maintaining industry-leading standards.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/about/team"
                className="inline-flex items-center bg-suviksan-blue text-white px-6 py-3 rounded-md font-semibold hover:bg-suviksan-blue/90 transition-colors"
              >
                Meet Our Team
              </a>
              <a
                href="/contact"
                className="inline-flex items-center border border-suviksan-blue text-suviksan-blue px-6 py-3 rounded-md font-semibold hover:bg-suviksan-blue/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Awards; 