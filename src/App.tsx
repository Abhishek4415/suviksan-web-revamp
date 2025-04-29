import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CourseDetails from "./pages/CourseDetails";
import Resources from "./pages/Resources";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import Cybersecurity from "./pages/Cybersecurity";
import ITConsultancy from "./pages/ITConsultancy";
import ITOutsourcing from "./pages/ITOutsourcing";
import CloudSolutions from "./pages/CloudSolutions";
import DataAnalytics from "./pages/DataAnalytics";
import DataSecurity from "./pages/DataSecurity";
import Team from "./pages/Team";
import Awards from "./pages/Awards";
import Gallery from "./pages/Gallery";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  // Enable smooth scrolling across the app
  useSmoothScroll();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* News Routes */}
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            
            {/* Events Routes */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            
            
            
            {/* Resources Routes */}
            <Route path="/resources" element={<Resources />} />
            
            {/* Clients Routes */}
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/success-stories" element={<Clients />} />
            <Route path="/clients/testimonials" element={<Clients />} />
            
            {/* Contact Routes */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/support" element={<Contact />} />
            <Route path="/careers" element={<Contact />} />
            
            {/* Services Routes */}
            <Route path="/services/cybersecurity" element={<Cybersecurity />} />
            <Route path="/services/it-consultancy" element={<ITConsultancy />} />
            <Route path="/services/it-outsourcing" element={<ITOutsourcing />} />
            <Route path="/services/cloud-solutions" element={<CloudSolutions />} />
            <Route path="/services/data-analytics" element={<DataAnalytics />} />
            <Route path="/services/data-security" element={<DataSecurity />} />
            
            {/* About Routes */}
            <Route path="/about" element={<Index />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/about/awards" element={<Awards />} />
            <Route path="/about/gallery" element={<Gallery />} />
            
            {/* Other Routes */}
            <Route path="/privacy-policy" element={<Index />} />
            <Route path="/terms-of-service" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
