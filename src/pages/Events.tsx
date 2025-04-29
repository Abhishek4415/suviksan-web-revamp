import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, MapPin, Search, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { events, Event } from '@/lib/blog-data';

const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Get unique categories and formats
  const categories = Array.from(new Set(events.map(event => event.category)));
  const formats = Array.from(new Set(events.map(event => event.format)));

  // Filter events based on search term, category, and format
  useEffect(() => {
    let filtered = [...events];
    
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    if (selectedFormat) {
      filtered = filtered.filter(event => event.format === selectedFormat);
    }
    
    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, selectedFormat]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openEventDetails = (id: number) => {
    window.open(`/events/${id}`, '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-suviksan-blue mb-6">Events & Webinars</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              Join us for insightful events, webinars, and conferences featuring industry experts and thought leaders
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    type="text"
                    placeholder="Search events..." 
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div>
                <p className="text-sm font-medium mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedCategory === null ? "default" : "outline"}
                    onClick={() => setSelectedCategory(null)}
                    className="rounded-full"
                    size="sm"
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button 
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full"
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Format</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedFormat === null ? "default" : "outline"}
                    onClick={() => setSelectedFormat(null)}
                    className="rounded-full"
                    size="sm"
                  >
                    All
                  </Button>
                  {formats.map((format) => (
                    <Button 
                      key={format}
                      variant={selectedFormat === format ? "default" : "outline"}
                      onClick={() => setSelectedFormat(format)}
                      className="rounded-full"
                      size="sm"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Events Grid */}
        <section className="py-16">
          <div className="container-custom">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">No events found</h3>
                <p className="text-gray-500">Try changing your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className={`transform transition-all duration-500 overflow-hidden border-0 shadow-md cursor-pointer ${
                      hoveredCard === event.id ? 'scale-[1.02] shadow-xl' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(event.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => openEventDetails(event.id)}
                  >
                    <div className="relative overflow-hidden h-48 bg-gray-100">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredCard === event.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div className="absolute top-4 right-4 bg-suviksan-teal/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {event.format}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span className="truncate">{event.format === 'Online' ? 'Virtual Event' : event.location.split(',')[0]}</span>
                        </div>
                      </div>
                      <CardTitle className={`text-xl mb-2 transition-colors duration-300 ${
                        hoveredCard === event.id ? 'text-suviksan-teal' : 'text-suviksan-blue'
                      }`}>
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start mb-4">
                        <Users className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Speakers:</p>
                          <ul className="text-sm text-gray-600">
                            {event.speakers.map((speaker, idx) => (
                              <li key={idx}>{speaker.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                            #{tag}
                          </span>
                        ))}
                        {event.tags.length > 3 && (
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                            +{event.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <Button variant="outline" className="w-full group bg-white hover:bg-suviksan-teal hover:text-white">
                        View Details
                        <ArrowRight className={`ml-2 h-4 w-4 transition-all duration-300 ${
                          hoveredCard === event.id ? 'translate-x-2' : ''
                        }`} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events; 