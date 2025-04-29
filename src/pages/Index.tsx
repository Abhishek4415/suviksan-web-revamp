import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import BlogSection from '@/components/BlogSection';
import ChatBot from '@/components/ChatBot';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Helmet } from 'react-helmet';
import WebGLSlider from '@/components/WebGLSlider';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Suviksan Technologies - Cybersecurity & IT Solutions</title>
        <meta name="description" content="Suviksan Technologies offers specialized services in cybersecurity, IT consultancy, and enterprise solutions for businesses." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <WebGLSlider />
          <ServicesSection />
          <AboutSection />
          <ClientsSection />
          <BlogSection />
          <ContactSection />
          <CTASection />
        </main>
        
        <Footer />
        <ChatBot />
        <ScrollToTop threshold={400} />
      </div>
    </>
  );
};

export default Index;
