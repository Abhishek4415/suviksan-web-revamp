import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2, Linkedin, Twitter, Facebook, Link2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts, BlogPost } from '@/lib/blog-data';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find(p => p.id === Number(id));
    setPost(currentPost || null);

    // Find related posts (same category or shared tags)
    if (currentPost) {
      const related = blogPosts
        .filter(p => p.id !== currentPost.id && 
                    (p.category === currentPost.category || 
                     p.tags.some(tag => currentPost.tags.includes(tag))))
        .slice(0, 3);
      setRelatedPosts(related);
    }

    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Suviksan Blog Post';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const openBlogPost = (id: number) => {
    window.open(`/blog/${id}`, '_blank');
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Post not found</h2>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
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
        <section className="pt-24 pb-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="container-custom">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-suviksan-teal mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>
            
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-suviksan-teal/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-suviksan-blue mb-6">
              {post.title}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-3xl mb-8">
              {post.description}
            </p>
            
            <div className="flex items-center justify-between border-t border-b py-4 mb-8">
              <div className="flex items-center">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full relative"
                  onClick={() => handleShare('copy')}
                >
                  <Link2 className="h-4 w-4" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                      Copied!
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className="py-8">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-suviksan-blue prose-a:text-suviksan-teal prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="mt-12 flex flex-wrap gap-2">
                <span className="text-gray-600 font-medium">Tags:</span>
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-12 border-t pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-suviksan-blue">Related Articles</h3>
                  <Button asChild variant="outline">
                    <Link to="/blog" className="flex items-center">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                {relatedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card
                        key={relatedPost.id}
                        className={`transform transition-all duration-500 overflow-hidden border-0 shadow-md cursor-pointer ${
                          hoveredCard === relatedPost.id ? 'scale-[1.02] shadow-xl' : ''
                        }`}
                        onMouseEnter={() => setHoveredCard(relatedPost.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => openBlogPost(relatedPost.id)}
                      >
                        <div className="relative overflow-hidden h-36 bg-gray-100">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${
                              hoveredCard === relatedPost.id ? 'scale-110' : 'scale-100'
                            }`}
                          />
                          <div className="absolute top-2 right-2 bg-suviksan-teal/90 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            {relatedPost.category}
                          </div>
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className={`text-lg mb-2 transition-colors duration-300 line-clamp-2 ${
                            hoveredCard === relatedPost.id ? 'text-suviksan-teal' : 'text-suviksan-blue'
                          }`}>
                            {relatedPost.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground text-sm line-clamp-2">
                            {relatedPost.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p>No related articles found.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage; 