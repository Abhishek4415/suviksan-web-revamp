
import { Link } from 'react-router-dom';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-700 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-2xl font-bold">Suviksan</h3>
              <span className="text-suviksan-teal">Technologies</span>
            </div>
            <p className="mb-4 text-gray-300">
              Pioneering cybersecurity, IT consultancy, and enterprise solutions for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/suviksan/" target="_blank" rel="noopener noreferrer" 
                className="hover:text-suviksan-teal transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://twitter.com/suviksan" target="_blank" rel="noopener noreferrer" 
                className="hover:text-suviksan-teal transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  Clients
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/cybersecurity" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link to="/services/it-consultancy" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  IT Consultancy
                </Link>
              </li>
              <li>
                <Link to="/services/software-solutions" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link to="/services/software-solutions" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  Cloud Service
                </Link>
              </li>
              <li>
                <Link to="/services/software-solutions" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  Data Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-gray-300" />
                <span className="text-gray-300">
                 Unit No.: 1006, ATS Bouquet NOIDA - 201305, Uttar Pradesh Bharat (India)
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-gray-300" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                +91 7992281130
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-gray-300" />
                <a href="mailto:info@suviksan.com" className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  info@suviksan.com
                </a>
              </li>
              <li className="flex">
                <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 text-gray-300" />
                <a href="https://www.suviksan.com" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-suviksan-teal transition-colors">
                  www.suviksan.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 sm:mb-0">
              © {currentYear} Suviksan Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-suviksan-teal transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-300 hover:text-suviksan-teal transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
