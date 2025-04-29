import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { events, Event } from '@/lib/blog-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EventRegistrationForm } from '@/components/EventRegistrationForm';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      const eventId = parseInt(id);
      const foundEvent = events.find(e => e.id === eventId);
      
      if (foundEvent) {
        setEvent(foundEvent);
        
        // Find related events (same category, excluding current)
        const related = events
          .filter(e => e.category === foundEvent.category && e.id !== eventId)
          .slice(0, 3);
        
        setRelatedEvents(related);
      }
    }
  }, [id]);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/events">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container-custom">
            <Link to="/events" className="inline-flex items-center text-suviksan-blue hover:text-suviksan-teal mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="bg-suviksan-teal/10 text-suviksan-teal px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {event.format}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-suviksan-blue mb-4">{event.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 mt-0.5 text-suviksan-teal" />
                        <div>
                          <p className="font-medium text-gray-900">Date</p>
                          <p className="text-gray-600">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 mt-0.5 text-suviksan-teal" />
                        <div>
                          <p className="font-medium text-gray-900">Time</p>
                          <p className="text-gray-600">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 mt-0.5 text-suviksan-teal" />
                        <div>
                          <p className="font-medium text-gray-900">Location</p>
                          <p className="text-gray-600">{event.format === 'Online' ? 'Virtual Event' : event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-5 w-5 mr-3 mt-0.5 text-suviksan-teal" />
                        <div>
                          <p className="font-medium text-gray-900">Speakers</p>
                          <p className="text-gray-600">{event.speakers.map(s => s.name).join(', ')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div 
                        className="prose prose-lg max-w-none prose-headings:text-suviksan-blue prose-a:text-suviksan-teal hover:prose-a:text-suviksan-blue prose-img:rounded-xl" 
                        dangerouslySetInnerHTML={{ __html: event.content }}
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h3 className="text-xl font-bold text-suviksan-blue mb-4">Register for this Event</h3>
                  <p className="text-gray-600 mb-4">Secure your spot now for this exciting event! Registration is quick and easy.</p>
                  
                  <Button className="w-full mb-3 text-white" size="lg" onClick={() => setIsRegistrationOpen(true)}>
                    Register Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">By registering, you agree to our Terms of Service and Privacy Policy</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-suviksan-blue mb-4">Speakers</h3>
                  
                  <div className="space-y-4">
                    {event.speakers.map((speaker, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img 
                            src={speaker.avatar} 
                            alt={speaker.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{speaker.name}</p>
                          <p className="text-sm text-gray-600">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-suviksan-blue mb-10">Related Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedEvents.map((relEvent) => (
                  <Link 
                    key={relEvent.id} 
                    to={`/events/${relEvent.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relEvent.image} 
                        alt={relEvent.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{relEvent.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-suviksan-blue mb-2 hover:text-suviksan-teal transition-colors">
                        {relEvent.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relEvent.description}</p>
                      <div className="flex items-center text-suviksan-teal font-medium text-sm">
                        View Details
                        <ArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Register for {event.title}</DialogTitle>
          </DialogHeader>
          <EventRegistrationForm 
            eventId={event.id}
            eventTitle={event.title}
            onClose={() => setIsRegistrationOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetails; 