import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';

const blogPosts = [
  {
    id: 1,
    title: 'Latest Cybersecurity Trends 2025',
    description: 'Exploring emerging threats and defense strategies in the cybersecurity landscape.',
    date: 'April 15, 2025',
    category: 'Cybersecurity',
    readTime: '5 min read',
    image: '/service (1).jpg',
    tags: ['Cybersecurity', 'Threats', 'Defense']
  },
  {
    id: 2,
    title: 'Digital Transformation Success Stories',
    description: 'How businesses are leveraging IT consultancy for digital evolution.',
    date: 'April 10, 2025',
    category: 'IT Consultancy',
    readTime: '7 min read',
    image: '/service (5).jpg',
    tags: ['Digital Transformation', 'Success Stories', 'IT']
  },
  {
    id: 3,
    title: 'Enterprise Solutions: A Complete Guide',
    description: 'Understanding modern enterprise software solutions and their implementation.',
    date: 'April 5, 2025',
    category: 'Software Solutions',
    readTime: '6 min read',
    image: '/service (4).jpg',
    tags: ['Enterprise', 'Software', 'Implementation']
  },
  {
    id: 4,
    title: 'Cloud Migration Strategies for 2025',
    description: 'Best practices for moving your infrastructure to the cloud securely and efficiently.',
    date: 'March 28, 2025',
    category: 'Cloud Computing',
    readTime: '8 min read',
    image: '/service (3).jpg',
    tags: ['Cloud', 'Migration', 'Strategy']
  },
  {
    id: 5,
    title: 'AI Integration in Modern IT Infrastructure',
    description: 'How artificial intelligence is revolutionizing IT operations and management.',
    date: 'March 20, 2025',
    category: 'Artificial Intelligence',
    readTime: '4 min read',
    image: '/service (2).jpg',
    tags: ['AI', 'IT Infrastructure', 'Innovation']
  }
];

const BlogSection = () => {
  const postsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  // State for current page and visible posts
  const [currentPage, setCurrentPage] = useState(0);
  const [visiblePosts, setVisiblePosts] = useState([]);
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('next'); // 'next' or 'prev'
  const [animationClass, setAnimationClass] = useState('opacity-100');
  
  // Hover state for cards
  const [hoveredCard, setHoveredCard] = useState(null);

  // Initialize visible posts
  useEffect(() => {
    updateVisiblePosts(0);
  }, []);

  // Update visible posts based on current page
  const updateVisiblePosts = (pageIndex) => {
    const startIndex = pageIndex * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = blogPosts.slice(startIndex, endIndex);
    setVisiblePosts(postsToShow);
  };

  // Handle page navigation
  const changePage = (direction) => {
    if (isAnimating) return;
    
    // Set animation direction
    setAnimationDirection(direction);
    
    // Start animation
    setIsAnimating(true);
    setAnimationClass('opacity-0 translate-y-8');
    
    // Calculate new page index
    let newPageIndex;
    if (direction === 'next') {
      newPageIndex = (currentPage + 1) % totalPages;
    } else {
      newPageIndex = (currentPage - 1 + totalPages) % totalPages;
    }
    
    // After fade-out, update page and content
    setTimeout(() => {
      setCurrentPage(newPageIndex);
      updateVisiblePosts(newPageIndex);
      
      // After content update, fade back in
      setTimeout(() => {
        setAnimationClass('opacity-100 translate-y-0');
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  // Handle direct page navigation
  const goToPage = (pageIndex) => {
    if (isAnimating || currentPage === pageIndex) return;
    
    // Determine direction for animation
    const direction = pageIndex > currentPage ? 'next' : 'prev';
    setAnimationDirection(direction);
    
    // Start animation
    setIsAnimating(true);
    setAnimationClass('opacity-0 translate-y-8');
    
    // After fade-out, update page and content
    setTimeout(() => {
      setCurrentPage(pageIndex);
      updateVisiblePosts(pageIndex);
      
      // After content update, fade back in
      setTimeout(() => {
        setAnimationClass('opacity-100 translate-y-0');
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  // Debugging - add console logs to track state changes
  useEffect(() => {
    console.log("Current page:", currentPage);
    console.log("Visible posts:", visiblePosts);
  }, [currentPage, visiblePosts]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50" id="blog">
      <div className="container-custom">
        <AnimatedSection variant="slideUp" className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
            Insights & Updates
          </div>
          <h2 className="heading-lg mb-4 text-suviksan-blue">Latest News & Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and news from the world of cybersecurity and IT.
          </p>
        </AnimatedSection>
        
        <div className={`transition-all duration-300 ${animationClass}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visiblePosts.map((post) => (
              <Card
                key={post.id}
                className={`transform transition-all duration-500 overflow-hidden border-0 shadow-md ${
                  hoveredCard === post.id ? 'scale-[1.02] shadow-xl' : ''
                }`}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden h-48 bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredCard === post.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-4 right-4 bg-suviksan-teal/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className={`text-xl mb-2 transition-colors duration-300 ${
                    hoveredCard === post.id ? 'text-suviksan-teal' : 'text-suviksan-blue'
                  }`}>
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{post.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <Button variant="outline" asChild className="w-full group bg-white hover:bg-suviksan-teal hover:text-white">
                    <Link to={`/blog/${post.id}`} className="flex items-center justify-center">
                      Read Article
                      <ArrowRight className={`ml-2 h-4 w-4 transition-all duration-300 ${
                        hoveredCard === post.id ? 'translate-x-2' : ''
                      }`} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 mb-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => changePage('prev')}
              disabled={isAnimating}
              className="rounded-full h-10 w-10 hover:bg-suviksan-teal hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  className={`h-2.5 transition-all duration-300 rounded-full ${
                    currentPage === idx 
                      ? 'w-6 bg-suviksan-teal' 
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => changePage('next')}
              disabled={isAnimating}
              className="rounded-full h-10 w-10 hover:bg-suviksan-teal hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        <AnimatedSection variant="fadeIn" delay={0.3} className="text-center">
          <Button 
            asChild 
            variant="default" 
            size="lg" 
            className="bg-suviksan-blue hover:bg-suviksan-teal transform transition-all duration-300 hover:scale-105 px-8 py-6"
          >
            <Link to="/blog" className="flex items-center">
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BlogSection;