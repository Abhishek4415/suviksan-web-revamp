import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';

// Define the API URL from environment variables or use localhost as default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ContactSection = () => {
  const { toast } = useToast(); // Initialize toast for notifications
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Flag to track form submission state
  const [error, setError] = useState<string | null>(null); // Store any errors
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Store success message

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear success message when the user starts typing again
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear success message

    try {
      // Send form data to the server
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // If response is not ok, throw an error
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // Set success message if the message was sent successfully
      setSuccessMessage('Your message has been sent successfully! We will get back to you shortly.');

      // Display success toast notification
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you shortly.",
      });

      // Reset form data after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(errorMessage); // Set error message
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive", // Show error in destructive color
      });
    } finally {
      setIsSubmitting(false); // Set submitting state to false after submission
    }
  };

  // Contact information (email, phone, and address)
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@suviksan.com',
      link: 'mailto:info@suviksan.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 7992281130',
      link: 'tel:+917992281130'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Unit No.: 1006, ATS Bouquet NOIDA - 201305, Uttar Pradesh Bharat (India)',
      link: 'https://maps.google.com?q=Unit+No.+1006+ATS+Bouquet+NOIDA+Uttar+Pradesh+India'
    }
  ];

  return (
    <section className="section-padding bg-suviksan-gray" id="contact">
      <div className="container-custom">
        {/* Animated Section for Title */}
        <AnimatedSection variant="slideUp" className="text-center mb-16">
          <h2 className="heading-lg text-suviksan-blue mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have questions or want to learn more about our services? Reach out to us and our team will get back to you shortly.
          </p>
        </AnimatedSection>

        {/* Grid layout for contact form and contact information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form Section */}
          <AnimatedSection variant="slideRight" className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="heading-sm text-suviksan-blue mb-6">Send Us a Message</h3>

            {/* Display error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            )}

            {/* Display success message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-600 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form for entering contact information */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">Full Name *</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Email Address *</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone Number Input */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="^\d{10}$"
                    type='tel'
                    placeholder="Your phone number"
                  />
                </div>

                {/* Company Input */}
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium">Company</label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">Message *</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </AnimatedSection>

          {/* Contact Information Section */}
          <div className="space-y-6 lg:pl-6">
            <StaggeredAnimation className="space-y-6" staggerDelay={0.1}>
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm flex"
                >
                  <div className="mr-4">
                    <div className="bg-suviksan-light-blue p-3 rounded-lg">
                      <item.icon className="h-6 w-6 text-suviksan-teal" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <a href={item.link} className="text-muted-foreground hover:text-suviksan-teal transition-colors">
                      {item.content}
                    </a>
                  </div>
                </div>
              ))}
            </StaggeredAnimation>

            {/* Embed Google Map */}
            <AnimatedSection variant="fadeIn" delay={0.3} className="mt-6 bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-72">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14021.318241648494!2d77.3902116!3d28.5001575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce911bc45c9ab%3A0xe84a3253f2cfc7fa!2sATS%20Bouquet%2C%20Sector%20132%2C%20Noida%2C%20Uttar%20Pradesh%20201305%2C%20India!5e0!3m2!1sen!2sin!4v1713601039376!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Suviksan Technologies Location"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
