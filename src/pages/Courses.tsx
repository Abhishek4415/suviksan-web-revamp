import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Clock, Search, User, BarChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { courses, Course } from '@/lib/blog-data';

const Courses = () => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Get unique categories and levels
  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = Array.from(new Set(courses.map(course => course.level)));

  // Filter courses based on search term, category, and level
  useEffect(() => {
    let filtered = [...courses];
    
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    if (selectedLevel) {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedLevel]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openCourseDetails = (id: number) => {
    window.open(`/courses/${id}`, '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-suviksan-blue mb-6">Professional Courses</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              Expand your knowledge and advance your career with our specialized technology courses
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    type="text"
                    placeholder="Search courses..." 
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
                <p className="text-sm font-medium mb-2">Level</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedLevel === null ? "default" : "outline"}
                    onClick={() => setSelectedLevel(null)}
                    className="rounded-full"
                    size="sm"
                  >
                    All
                  </Button>
                  {levels.map((level) => (
                    <Button 
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      onClick={() => setSelectedLevel(level)}
                      className="rounded-full"
                      size="sm"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Courses Grid */}
        <section className="py-16">
          <div className="container-custom">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-gray-500">Try changing your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className={`transform transition-all duration-500 overflow-hidden border-0 shadow-md cursor-pointer ${
                      hoveredCard === course.id ? 'scale-[1.02] shadow-xl' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(course.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => openCourseDetails(course.id)}
                  >
                    <div className="relative overflow-hidden h-48 bg-gray-100">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredCard === course.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div className="absolute top-4 right-4 bg-suviksan-teal/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {course.level}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-3 w-3" />
                          <span>{course.syllabus.length} Modules</span>
                        </div>
                      </div>
                      <CardTitle className={`text-xl mb-2 transition-colors duration-300 ${
                        hoveredCard === course.id ? 'text-suviksan-teal' : 'text-suviksan-blue'
                      }`}>
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                          <img 
                            src={course.instructor.avatar} 
                            alt={course.instructor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{course.instructor.name}</p>
                          <p className="text-xs text-gray-500">{course.instructor.role}</p>
                        </div>
                      </div>
                      
                      {course.price && (
                        <div className="bg-blue-50 text-suviksan-blue text-center py-2 rounded-md font-medium mb-4">
                          {course.price}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                            #{tag}
                          </span>
                        ))}
                        {course.tags.length > 3 && (
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                            +{course.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <Button variant="outline" className="w-full group bg-white hover:bg-suviksan-teal hover:text-white">
                        View Course
                        <ArrowRight className={`ml-2 h-4 w-4 transition-all duration-300 ${
                          hoveredCard === course.id ? 'translate-x-2' : ''
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

export default Courses; 