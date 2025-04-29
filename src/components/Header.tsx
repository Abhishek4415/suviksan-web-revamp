import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Book, Newspaper, Shield, Server, Code, ArrowRight, FileText, BookOpen, Calendar, GraduationCap } from 'lucide-react';

type DropdownItem = {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type NavItem = {
  name: string;
  path: string;
  hasFullDropdown?: boolean;
  hasAboutDropdown?: boolean;
  hasBlogDropdown?: boolean;
  dropdown?: DropdownItem[];
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [previewedService, setPreviewedService] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleServicePreview = (serviceName: string) => {
    setPreviewedService(serviceName);
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceCategories = [
    {
      title: 'Services',
      items: [
        { name: 'Cybersecurity', path: '/services/cybersecurity' },
        { name: 'IT OutSourcing', path: '/services/it-outSourcing' },
        { name: 'Cloud Solutions', path: '/services/cloud-solutions' },
        { name: 'Data & Analytics', path: '/services/data-analytics' },
        { name: 'Data Security', path: '/services/data-security' },

        
        
      ]
    },
    {
      title: 'Industries',
      items: [
        { name: 'Banking & Financial', path: '/industries/banking-financial' },
        { name: 'Healthcare', path: '/industries/healthcare' },
        { name: 'Manufacturing', path: '/industries/manufacturing' },
        { name: 'Retail', path: '/industries/retail' }
      ]
    }
  ];

  const aboutCategories = [
    {
      items: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/about/team' },
        { name: 'Awards & Recognitions', path: '/about/awards' },
      ]
    },
  
    {
      items: [
        { name: 'Gallery', path: '/about/gallery' },
        { name: 'Careers', path: '/careers' },

      ]
    }
  ];

  const blogCategories = [
    {
      title: 'Content',
      items: [
        { name: 'Blog', path: '/blog', icon: Book },
        { name: 'News', path: '/news', icon: Newspaper },
        { name: 'Events', path: '/events', icon: Calendar }
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Ebooks & Whitepapers', path: '/resources', icon: FileText }
      ]
    }
  ];

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      hasFullDropdown: true
    },
    { 
      name: 'About Us', 
      path: '/about',
      hasAboutDropdown: true
    },
    { name: 'Clients', path: '/clients' },
    {
      name: 'Blog & News',
      path: '/blog',
      hasBlogDropdown: true
    },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header 
      className={`w-full py-5 transition-all duration-300 z-50 sticky top-0 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo(2)." alt="Suviksan Logo" style={{ width: '250px', height: 'auto' }} />
        </Link>

        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.dropdown || item.hasFullDropdown || item.hasAboutDropdown || item.hasBlogDropdown ? (
                <div 
                  className="flex items-center px-4 py-2 text-foreground cursor-pointer"
                >
                  <span className="font-arial uppercase font-semibold transition duration-300 hover:scale-105 hover:text-primary">{item.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="px-4 py-2 font-semibold  font-arial uppercase text-foreground transition duration-300 hover:scale-105 hover:text-primary "
                >
                  {item.name}
                </Link>
              )}
              
              {item.dropdown && !item.hasFullDropdown && !item.hasAboutDropdown && !item.hasBlogDropdown && (
                <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.path}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-sans text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition duration-300 hover:translate-x-1"
                    >
                      {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4" />}
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              )}
              
              {item.hasFullDropdown && item.name === 'Services' && (
                <div className="absolute left-1/2 transform -translate-x-1/2 min-w-[600px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="flex">
                    <div className="w-1/2 border-r p-8">
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-suviksan-blue relative top-[-30px] mb-[-20px] border-b pb-2">{serviceCategories[0].title}</h3>
                        <div className="space-y-1">
                          {serviceCategories[0].items.map((serviceItem) => (
                            <div key={serviceItem.name}>
                              <Link
                                to={serviceItem.path}
                                className="block py-2 font-sans text-foreground hover:text-suviksan-teal"
                                onClick={() => handleServicePreview(serviceItem.name)}
                              >
                                {serviceItem.name}
                              </Link>
                              <p className="text-xs text-gray-500 mt-1">View details</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-suviksan-blue mb-3 border-b pb-2">{serviceCategories[1].title}</h3>
                        <div className="space-y-2">
                          {serviceCategories[1].items.map((serviceItem) => (
                            <div key={serviceItem.name}>
                              <Link
                                to={serviceItem.path}
                                className="block py-2 text-foreground hover:text-suviksan-teal"
                                onClick={() => handleServicePreview(serviceItem.name)}
                              >
                                {serviceItem.name}
                              </Link>
                              <p className="text-xs text-gray-500 mt-1">View details</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.hasAboutDropdown && item.name === 'About Us' && (
                <div className="absolute left-1/2 transform -translate-x-1/2 min-w-[700px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="grid grid-cols-3 p-6">
                    {aboutCategories.map((category, idx) => (
                      <div key={idx} className={`${idx < 2 ? 'border-r' : ''} px-6`}>
                        <div className="space-y-3 py-2">
                          {category.items.map((aboutItem) => (
                            <div key={aboutItem.name}>
                              <Link
                                to={aboutItem.path}
                                className="block py-1 text-foreground hover:text-suviksan-teal"
                              >
                                {aboutItem.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.hasBlogDropdown && item.name === 'Blog & News' && (
                <div className="absolute left-1/2 transform -translate-x-1/2 min-w-[600px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="flex">
                    {blogCategories.map((category, idx) => (
                      <div key={idx} className={`w-1/2 ${idx === 0 ? 'border-r' : ''} p-8`}>
                        <div className="p-6">
                          <h3 className="text-lg font-medium text-suviksan-blue mb-3 border-b pb-2">{category.title}</h3>
                          <div className="space-y-4">
                            {category.items.map((blogItem) => (
                              <div key={blogItem.name}>
                                {blogItem.name === 'Blog' || blogItem.name === 'News' ? (
                                  <a
                                    href={blogItem.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 py-2 text-foreground hover:text-suviksan-teal group"
                                  >
                                    {blogItem.icon && (
                                      <span className="w-8 h-8 rounded-full bg-suviksan-light-blue flex items-center justify-center text-suviksan-teal group-hover:bg-suviksan-teal group-hover:text-white transition-colors duration-300">
                                        <blogItem.icon className="h-4 w-4" />
                                      </span>
                                    )}
                                    <div>
                                      <p className="font-medium">{blogItem.name}</p>
                                      <p className="text-xs text-gray-500">Explore our {blogItem.name.toLowerCase()}</p>
                                    </div>
                                  </a>
                                ) : (
                                  <Link
                                    to={blogItem.path}
                                    className="flex items-center gap-3 py-2 text-foreground hover:text-suviksan-teal group"
                                  >
                                    {blogItem.icon && (
                                      <span className="w-8 h-8 rounded-full bg-suviksan-light-blue flex items-center justify-center text-suviksan-teal group-hover:bg-suviksan-teal group-hover:text-white transition-colors duration-300">
                                        <blogItem.icon className="h-4 w-4" />
                                      </span>
                                    )}
                                    <div>
                                      <p className="font-medium">{blogItem.name}</p>
                                      <p className="text-xs text-gray-500">Explore our {blogItem.name.toLowerCase()}</p>
                                    </div>
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild  className='bg-red-500 text-white font-semibold transition-all duration-300 hover:scale-95'>
            <Link to="/contact" >Get in Touch</Link>
          </Button>
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md text-foreground hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation - Updated to use overlay instead of pushing content */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-[800] backdrop-blur-sm">
          <div className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white z-[800] shadow-xl overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b">
              <Link to="/" onClick={toggleMenu}>
                <img src="/logo.png" alt="Suviksan Logo" style={{ width: '150px', height: 'auto' }} />
              </Link>
              <button onClick={toggleMenu} className="p-2 rounded-md text-foreground hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="p-4">
              {navItems.map((item) => (
                <div key={item.name} className="py-2 border-b border-gray-100 last:border-b-0">
                  {item.dropdown || item.hasFullDropdown || item.hasAboutDropdown || item.hasBlogDropdown ? (
                    <div className="w-full">
                      <button 
                        onClick={() => toggleDropdown(item.name)}
                        className="flex justify-between items-center w-full py-2 text-foreground"
                      >
                        <span className="text-lg font-sans font-medium uppercase transition duration-300 hover:translate-x-1">{item.name}</span>
                        {activeDropdown === item.name ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>
                      
                      {activeDropdown === item.name && item.name === 'Services' && (
                        <div className="pl-4 space-y-1 mt-1">
                          {serviceCategories.map((category) => (
                            <div key={category.title} className="my-3">
                              <h4 className="font-medium text-suviksan-blue">{category.title}</h4>
                              <div className="pl-2 mt-2 space-y-2">
                                {category.items.map((serviceItem) => (
                                  <div key={serviceItem.name}>
                                    <Link
                                      to={serviceItem.path}
                                      className="block py-2 text-foreground hover:text-suviksan-teal"
                                      onClick={() => {
                                        toggleMenu();
                                        handleServicePreview(serviceItem.name);
                                      }}
                                    >
                                      {serviceItem.name}
                                    </Link>
                                    <p className="text-xs text-gray-500 ml-4">View details</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeDropdown === item.name && item.name === 'About Us' && (
                        <div className="pl-4 space-y-3 mt-1">
                          {aboutCategories.map((category, idx) => (
                            <div key={idx} className="my-3">
                              <div className="pl-2 space-y-2">
                                {category.items.map((aboutItem) => (
                                  <div key={aboutItem.name}>
                                    <Link
                                      to={aboutItem.path}
                                      className="block py-2 text-foreground hover:text-suviksan-teal"
                                      onClick={toggleMenu}
                                    >
                                      {aboutItem.name}
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeDropdown === item.name && item.name === 'Blog & News' && (
                        <div className="pl-4 py-2 space-y-2">
                          <Link to="/blog" className="flex items-center gap-2 py-2 text-blue-600 hover:text-blue-800">
                            <Book className="h-4 w-4" />
                            <span>Blog</span>
                          </Link>
                          <Link to="/news" className="flex items-center gap-2 py-2 text-blue-600 hover:text-blue-800">
                            <Newspaper className="h-4 w-4" />
                            <span>News</span>
                          </Link>
                          <Link to="/events" className="flex items-center gap-2 py-2 text-blue-600 hover:text-blue-800">
                            <Calendar className="h-4 w-4" />
                            <span>Events</span>
                          </Link>
                          <Link to="/courses" className="flex items-center gap-2 py-2 text-blue-600 hover:text-blue-800">
                            <GraduationCap className="h-4 w-4" />
                            <span>Courses</span>
                          </Link>
                          <Link to="/resources" className="flex items-center gap-2 py-2 text-blue-600 hover:text-blue-800">
                            <FileText className="h-4 w-4" />
                            <span>Ebooks & Whitepapers</span>
                          </Link>
                        </div>
                      )}
                      
                      {activeDropdown === item.name && item.dropdown && (
                        <div className="pl-4 space-y-1 mt-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="flex items-center gap-2 py-2 text-foreground hover:text-primary"
                              onClick={toggleMenu}
                            >
                              {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4" />}
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block py-2 text-lg font-medium text-foreground hover:text-primary"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-6">
                <Button asChild className="w-full bg-red-500 text-white" onClick={toggleMenu}>
                  <Link to="/contact" className="font-semibold uppercase">GET IN TOUCH</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
