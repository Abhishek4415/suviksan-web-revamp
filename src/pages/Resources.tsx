import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Calendar, Download, FileText, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ebooks, whitepapers, Ebook, Whitepaper } from '@/lib/blog-data';

const Resources = () => {
  // Ebooks state
  const [filteredEbooks, setFilteredEbooks] = useState<Ebook[]>([]);
  const [ebookSearchTerm, setEbookSearchTerm] = useState('');
  const [selectedEbookCategory, setSelectedEbookCategory] = useState<string | null>(null);
  const [hoveredEbookCard, setHoveredEbookCard] = useState<number | null>(null);
  
  // Whitepapers state
  const [filteredWhitepapers, setFilteredWhitepapers] = useState<Whitepaper[]>([]);
  const [whitepaperSearchTerm, setWhitepaperSearchTerm] = useState('');
  const [selectedWhitepaperCategory, setSelectedWhitepaperCategory] = useState<string | null>(null);
  const [hoveredWhitepaperCard, setHoveredWhitepaperCard] = useState<number | null>(null);
  
  // Get unique categories
  const ebookCategories = Array.from(new Set(ebooks.map(ebook => ebook.category)));
  const whitepaperCategories = Array.from(new Set(whitepapers.map(whitepaper => whitepaper.category)));
  
  // Filter ebooks
  useEffect(() => {
    let filtered = [...ebooks];
    
    if (ebookSearchTerm) {
      filtered = filtered.filter(ebook => 
        ebook.title.toLowerCase().includes(ebookSearchTerm.toLowerCase()) || 
        ebook.description.toLowerCase().includes(ebookSearchTerm.toLowerCase()) ||
        ebook.tags.some(tag => tag.toLowerCase().includes(ebookSearchTerm.toLowerCase()))
      );
    }
    
    if (selectedEbookCategory) {
      filtered = filtered.filter(ebook => ebook.category === selectedEbookCategory);
    }
    
    setFilteredEbooks(filtered);
  }, [ebookSearchTerm, selectedEbookCategory]);
  
  // Filter whitepapers
  useEffect(() => {
    let filtered = [...whitepapers];
    
    if (whitepaperSearchTerm) {
      filtered = filtered.filter(whitepaper => 
        whitepaper.title.toLowerCase().includes(whitepaperSearchTerm.toLowerCase()) || 
        whitepaper.description.toLowerCase().includes(whitepaperSearchTerm.toLowerCase()) ||
        whitepaper.tags.some(tag => tag.toLowerCase().includes(whitepaperSearchTerm.toLowerCase()))
      );
    }
    
    if (selectedWhitepaperCategory) {
      filtered = filtered.filter(whitepaper => whitepaper.category === selectedWhitepaperCategory);
    }
    
    setFilteredWhitepapers(filtered);
  }, [whitepaperSearchTerm, selectedWhitepaperCategory]);
  
  const handleEbookSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleWhitepaperSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-suviksan-blue mb-6">Resources</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              Explore our collection of ebooks, whitepapers, and guides to expand your knowledge and stay informed
            </p>
            
            <Tabs defaultValue="ebooks" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="ebooks" className="text-lg">Ebooks</TabsTrigger>
                <TabsTrigger value="whitepapers" className="text-lg">Whitepapers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ebooks">
                {/* Ebooks Search and Filters */}
                <div className="max-w-2xl mx-auto mb-8">
                  <form onSubmit={handleEbookSearch} className="flex gap-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="text"
                        placeholder="Search ebooks..." 
                        className="pl-10 w-full"
                        value={ebookSearchTerm}
                        onChange={(e) => setEbookSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button type="submit">Search</Button>
                  </form>
                </div>
                
                {/* Ebook Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Button 
                    variant={selectedEbookCategory === null ? "default" : "outline"}
                    onClick={() => setSelectedEbookCategory(null)}
                    className="rounded-full"
                  >
                    All
                  </Button>
                  {ebookCategories.map((category) => (
                    <Button 
                      key={category}
                      variant={selectedEbookCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedEbookCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="whitepapers">
                {/* Whitepapers Search and Filters */}
                <div className="max-w-2xl mx-auto mb-8">
                  <form onSubmit={handleWhitepaperSearch} className="flex gap-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="text"
                        placeholder="Search whitepapers..." 
                        className="pl-10 w-full"
                        value={whitepaperSearchTerm}
                        onChange={(e) => setWhitepaperSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button type="submit">Search</Button>
                  </form>
                </div>
                
                {/* Whitepaper Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Button 
                    variant={selectedWhitepaperCategory === null ? "default" : "outline"}
                    onClick={() => setSelectedWhitepaperCategory(null)}
                    className="rounded-full"
                  >
                    All
                  </Button>
                  {whitepaperCategories.map((category) => (
                    <Button 
                      key={category}
                      variant={selectedWhitepaperCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedWhitepaperCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Resources Grid */}
        <section className="py-16">
          <div className="container-custom">
            <Tabs defaultValue="ebooks" className="max-w-5xl mx-auto">
              <TabsList className="hidden">
                <TabsTrigger value="ebooks">Ebooks</TabsTrigger>
                <TabsTrigger value="whitepapers">Whitepapers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ebooks">
                {filteredEbooks.length === 0 ? (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-medium mb-2">No ebooks found</h3>
                    <p className="text-gray-500">Try changing your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEbooks.map((ebook) => (
                      <Card
                        key={ebook.id}
                        className={`transform transition-all duration-500 overflow-hidden border-0 shadow-md h-full flex flex-col ${
                          hoveredEbookCard === ebook.id ? 'scale-[1.02] shadow-xl' : ''
                        }`}
                        onMouseEnter={() => setHoveredEbookCard(ebook.id)}
                        onMouseLeave={() => setHoveredEbookCard(null)}
                      >
                        <div className="relative overflow-hidden h-56 bg-gray-100">
                          <img 
                            src={ebook.coverImage} 
                            alt={ebook.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${
                              hoveredEbookCard === ebook.id ? 'scale-110' : 'scale-100'
                            }`}
                          />
                          <div className="absolute top-4 right-4 bg-suviksan-teal/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {ebook.category}
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{ebook.publishDate}</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="mr-1 h-3 w-3" />
                              <span>{ebook.pageCount} pages</span>
                            </div>
                          </div>
                          <CardTitle className={`text-xl mb-2 transition-colors duration-300 ${
                            hoveredEbookCard === ebook.id ? 'text-suviksan-teal' : 'text-suviksan-blue'
                          }`}>
                            {ebook.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">{ebook.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mb-4">
                            <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                              <img 
                                src={ebook.author.avatar} 
                                alt={ebook.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{ebook.author.name}</p>
                              <p className="text-xs text-gray-500">{ebook.author.role}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="mt-auto">
                          <Button 
                            variant="outline" 
                            className="w-full group bg-white hover:bg-suviksan-teal hover:text-white"
                            onClick={() => window.open(ebook.downloadLink, '_blank')}
                          >
                            Download Ebook
                            <Download className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="whitepapers">
                {filteredWhitepapers.length === 0 ? (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-medium mb-2">No whitepapers found</h3>
                    <p className="text-gray-500">Try changing your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredWhitepapers.map((whitepaper) => (
                      <Card
                        key={whitepaper.id}
                        className={`transform transition-all duration-500 overflow-hidden border-0 shadow-md h-full flex flex-col ${
                          hoveredWhitepaperCard === whitepaper.id ? 'scale-[1.02] shadow-xl' : ''
                        }`}
                        onMouseEnter={() => setHoveredWhitepaperCard(whitepaper.id)}
                        onMouseLeave={() => setHoveredWhitepaperCard(null)}
                      >
                        <div className="relative overflow-hidden h-56 bg-gray-100">
                          <img 
                            src={whitepaper.coverImage} 
                            alt={whitepaper.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${
                              hoveredWhitepaperCard === whitepaper.id ? 'scale-110' : 'scale-100'
                            }`}
                          />
                          <div className="absolute top-4 right-4 bg-suviksan-teal/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {whitepaper.category}
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{whitepaper.publishDate}</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="mr-1 h-3 w-3" />
                              <span>Whitepaper</span>
                            </div>
                          </div>
                          <CardTitle className={`text-xl mb-2 transition-colors duration-300 ${
                            hoveredWhitepaperCard === whitepaper.id ? 'text-suviksan-teal' : 'text-suviksan-blue'
                          }`}>
                            {whitepaper.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">{whitepaper.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mb-4">
                            <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                              <img 
                                src={whitepaper.author.avatar} 
                                alt={whitepaper.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{whitepaper.author.name}</p>
                              <p className="text-xs text-gray-500">{whitepaper.author.role}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="mt-auto">
                          <Button 
                            variant="outline" 
                            className="w-full group bg-white hover:bg-suviksan-teal hover:text-white"
                            onClick={() => window.open(whitepaper.downloadLink, '_blank')}
                          >
                            Download Whitepaper
                            <Download className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources; 