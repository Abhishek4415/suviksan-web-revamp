import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, User, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { courses, Course } from '@/lib/blog-data';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    if (id) {
      const courseId = parseInt(id);
      const foundCourse = courses.find(c => c.id === courseId);
      
      if (foundCourse) {
        setCourse(foundCourse);
        
        // Find related courses (same category, excluding current)
        const related = courses
          .filter(c => c.category === foundCourse.category && c.id !== courseId)
          .slice(0, 3);
        
        setRelatedCourses(related);
      }
    }
  }, [id]);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
            <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Link to="/courses">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
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
            <Link to="/courses" className="inline-flex items-center text-suviksan-blue hover:text-suviksan-teal mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="bg-suviksan-teal/10 text-suviksan-teal px-3 py-1 rounded-full text-sm font-medium">
                        {course.category}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-suviksan-blue mb-4">{course.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{course.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 mt-0.5 text-suviksan-teal" />
                        <div>
                          <p className="font-medium text-gray-900">Duration</p>
                          <p className="text-gray-600">{course.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <BookOpen className="h-5 w-5 mr-3 mt-0.5 text-suviksan-teal" />
                        <div>
                          <p className="font-medium text-gray-900">Modules</p>
                          <p className="text-gray-600">{course.syllabus.length} modules</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-3 mt-0.5 text-suviksan-teal" />
                        <div>
                          <p className="font-medium text-gray-900">Instructor</p>
                          <p className="text-gray-600">{course.instructor.name}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-suviksan-blue mb-4">Course Overview</h2>
                      <div 
                        className="prose prose-lg max-w-none prose-headings:text-suviksan-blue prose-a:text-suviksan-teal hover:prose-a:text-suviksan-blue prose-img:rounded-xl" 
                        dangerouslySetInnerHTML={{ __html: course.content }}
                      />
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-suviksan-blue mb-4">Course Syllabus</h2>
                      <div className="space-y-4">
                        {course.syllabus.map((module, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-medium text-suviksan-blue mb-2">{module.title}</h3>
                            <p className="text-gray-600">{module.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.tags.map((tag, idx) => (
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
                  <h3 className="text-xl font-bold text-suviksan-blue mb-4">Enroll in this Course</h3>
                  
                  {course.price && (
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-suviksan-blue">{course.price}</span>
                    </div>
                  )}
                  
                  <Button className="w-full mb-5 text-white" size="lg">
                    Enroll Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-suviksan-teal flex-shrink-0" />
                      <p className="text-sm text-gray-600">Full access to all course materials</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-suviksan-teal flex-shrink-0" />
                      <p className="text-sm text-gray-600">Certificate of completion</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-suviksan-teal flex-shrink-0" />
                      <p className="text-sm text-gray-600">Instructor Q&A and support</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-suviksan-teal flex-shrink-0" />
                      <p className="text-sm text-gray-600">Lifetime access to updates</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">By enrolling, you agree to our Terms of Service and Privacy Policy</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-suviksan-blue mb-4">Instructor</h3>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img 
                        src={course.instructor.avatar} 
                        alt={course.instructor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{course.instructor.name}</p>
                      <p className="text-sm text-gray-600">{course.instructor.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    Expert instructor with extensive industry experience in {course.category}. 
                    Specializes in creating engaging learning experiences that combine theory with practical applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-suviksan-blue mb-10">Related Courses</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedCourses.map((relCourse) => (
                  <Link 
                    key={relCourse.id} 
                    to={`/courses/${relCourse.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relCourse.image} 
                        alt={relCourse.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          {relCourse.level}
                        </span>
                        <span className="text-gray-600 text-sm">{relCourse.duration}</span>
                      </div>
                      <h3 className="text-lg font-bold text-suviksan-blue mb-2 hover:text-suviksan-teal transition-colors">
                        {relCourse.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relCourse.description}</p>
                      <div className="flex items-center text-suviksan-teal font-medium text-sm">
                        View Course
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
    </div>
  );
};

export default CourseDetails; 