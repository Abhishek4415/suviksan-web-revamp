import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, Search, Tag, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { newsArticles, NewsArticle } from '@/lib/blog-data';

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(newsArticles.map(article => article.category)));

  // Filter news articles based on search term and category
  useEffect(() => {
    let filteredArticles = [...newsArticles];
    
    if (searchTerm) {
      filteredArticles = filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory) {
      filteredArticles = filteredArticles.filter(article => article.category === selectedCategory);
    }
    
    setArticles(filteredArticles);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openNewsArticle = (id: number) => {
    window.open(`/news/${id}`, '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-suviksan-blue mb-6">Company News</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              Stay updated with the latest news, announcements, and developments from Suviksan Technologies
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    type="text"
                    placeholder="Search news..." 
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* News Articles Grid */}
        <section className="py-16">
          <div className="container-custom">
            {articles.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">No news articles found</h3>
                <p className="text-gray-500">Try changing your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    className={`transform transition-all duration-500 overflow-hidden border-0 shadow-md cursor-pointer ${
                      hoveredCard === article.id ? 'scale-[1.02] shadow-xl' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(article.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => openNewsArticle(article.id)}
                  >
                    <div className="relative overflow-hidden h-48 bg-gray-100">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredCard === article.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div className="absolute top-4 right-4 bg-suviksan-blue/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="mr-1 h-3 w-3" />
                          <span>{article.source}</span>
                        </div>
                      </div>
                      <CardTitle className={`text-xl mb-2 transition-colors duration-300 ${
                        hoveredCard === article.id ? 'text-suviksan-teal' : 'text-suviksan-blue'
                      }`}>
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{article.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                            #{tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <Button variant="outline" className="w-full group bg-white hover:bg-suviksan-blue hover:text-white">
                        Read Full Story
                        <ArrowRight className={`ml-2 h-4 w-4 transition-all duration-300 ${
                          hoveredCard === article.id ? 'translate-x-2' : ''
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

export default News; 