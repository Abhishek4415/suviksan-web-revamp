import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, X, Bot, User, Mail, Loader2, Phone, Briefcase, HelpCircle, Info } from 'lucide-react';
import { 
  initializeChatContext, 
  sendMessageToGemini, 
  ChatMessage 
} from '@/lib/chatbot-service';
import { companyInfo } from '@/lib/company-data';

interface Message {
  text: string;
  isBot: boolean;
  timestamp?: Date;
}

// Define suggested question categories
const suggestedQuestions = {
  aboutCompany: [
    "What is Suviksan Technologies?",
    "What services do you offer?",
    "Where is your office located?",
    "How can I contact your team?",
    "How many years of experience does Suviksan have?",
    "Which countries do you operate in?"
  ],
  productsServices: [
    "Tell me about your Data Analytics services",
    "Explain your Cybersecurity solutions",
    "What Cloud Services do you provide?",
    "How does your IT Outsourcing work?",
    "Do you offer Data Security services?",
    "Can you build custom software applications?"
  ],
  support: [
    "How can I get technical support?",
    "I need help with a service issue",
    "What's your support email address?",
    "Is there a phone number for support?",
    "Do you provide 24/7 support?",
    "How do I report a problem?"
  ],
  careers: [
    "Are there any job openings?",
    "How can I apply for a position?",
    "What skills are you looking for?",
    "Do you offer internships?",
    "What's the recruitment process?",
    "Who should I contact about career opportunities?"
  ],
  general: [
    "How can I book a demo?",
    "What industries do you serve?",
    "Do you work with international clients?",
    "Can I request a callback?",
    "What makes Suviksan different from competitors?",
    "How can I get a price quote for services?"
  ]
};

// Define quick action buttons
const quickActions = [
  { label: "Contact Support", icon: <Phone className="h-3 w-3" /> },
  { label: "View Services", icon: <Info className="h-3 w-3" /> },
  { label: "About Us", icon: <Info className="h-3 w-3" /> },
  { label: "Careers", icon: <Briefcase className="h-3 w-3" /> }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! Please provide your email address to get started.", isBot: true, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatContext, setChatContext] = useState<ChatMessage[]>(initializeChatContext());
  const [activeSuggestionCategory, setActiveSuggestionCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add new state for resizing
  const [dimensions, setDimensions] = useState({ width: 380, height: 500 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  // Handle opening and closing
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  // Scroll to bottom when new messages added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Reset chat if needed
  const resetChat = () => {
    setMessages([
      { text: "Hello! Please provide your email address to get started.", isBot: true, timestamp: new Date() }
    ]);
    setUserEmail('');
    setEmailSubmitted(false);
    setChatContext(initializeChatContext());
    setActiveSuggestionCategory(null);
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      setMessages(prev => [...prev, 
        { text: input, isBot: false, timestamp: new Date() },
        { text: "Please enter a valid email address.", isBot: true, timestamp: new Date() }
      ]);
      setInput('');
      return;
    }
    
    // Save email and prepare for conversation
    setUserEmail(input);
    setEmailSubmitted(true);
    
    // Show user message immediately
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    try {
      // Save email to database
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chatbot/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to save email');
      }

      // Update chat context with user email
      const updatedContext = [...chatContext];
      updatedContext.push({ role: 'user', content: userMessage });
      
      // Get AI response
      const botResponse = await sendMessageToGemini(updatedContext, userMessage);
      
      // Add welcome response with suggestions for next steps
      const welcomeResponse = `Thank you for providing your email! I'm Suvix, the virtual assistant for ${companyInfo.name}. How can I help you today? Feel free to ask about our services, company information, or select from the suggested options below.`;
      
      // Add AI response to messages and context
      setMessages(prev => [...prev, { 
        text: welcomeResponse, 
        isBot: true, 
        timestamp: new Date() 
      }]);
      
      updatedContext.push({ 
        role: 'assistant', 
        content: welcomeResponse 
      });
      
      setChatContext(updatedContext);
      
      // Activate suggestion buttons after welcome
      setActiveSuggestionCategory('aboutCompany');
    } catch (error) {
      console.error('Error during email submission:', error);
      setMessages(prev => [...prev, { 
        text: "Thank you for your email. How can I help you today?", 
        isBot: true, 
        timestamp: new Date() 
      }]);
      setActiveSuggestionCategory('general');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle regular message send
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Show user message immediately
    const userMessage = input;
    setMessages(prev => [...prev, { 
      text: userMessage, 
      isBot: false,
      timestamp: new Date()
    }]);
    setInput('');
    setIsLoading(true);
    setActiveSuggestionCategory(null); // Hide suggestions when user sends a message

    try {
      // Update chat context
      const updatedContext = [...chatContext];
      updatedContext.push({ role: 'user', content: userMessage });
      
      // Get AI response from Gemini
      const botResponse = await sendMessageToGemini(updatedContext, userEmail);
      
      // Add AI response to messages and context
      setMessages(prev => [...prev, { 
        text: botResponse, 
        isBot: true, 
        timestamp: new Date() 
      }]);
      
      updatedContext.push({ 
        role: 'assistant', 
        content: botResponse 
      });
      
      setChatContext(updatedContext);
      
      // Check if response is likely an "I don't know" response
      const unknownResponseIndicators = [
        "I apologize, but I don't have",
        "I'm sorry, I don't have",
        "That's beyond my current knowledge",
        "I don't have the specific information",
        "I'm not trained on that",
        "I don't have that information",
        "I'm not able to answer",
        "That's outside my area of expertise"
      ];
      
      const isUnknownResponse = unknownResponseIndicators.some(indicator => 
        botResponse.includes(indicator)
      );
      
      // Always show suggestions after an unknown response
      if (isUnknownResponse) {
        // Always show general suggestions for unknown responses
        setActiveSuggestionCategory('general');
      } else {
        // Show relevant suggestions based on the query for known responses
        if (userMessage.toLowerCase().includes('service') || userMessage.toLowerCase().includes('product')) {
          setActiveSuggestionCategory('productsServices');
        } else if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('support') || userMessage.toLowerCase().includes('issue')) {
          setActiveSuggestionCategory('support');
        } else if (userMessage.toLowerCase().includes('job') || userMessage.toLowerCase().includes('career') || userMessage.toLowerCase().includes('work')) {
          setActiveSuggestionCategory('careers');
        } else if (userMessage.toLowerCase().includes('company') || userMessage.toLowerCase().includes('about')) {
          setActiveSuggestionCategory('aboutCompany');
        } else {
          // For other queries, show general suggestions
          setActiveSuggestionCategory('general');
        }
      }
    } catch (error) {
      console.error('Error during message handling:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team directly at " + companyInfo.contact.support, 
        isBot: true, 
        timestamp: new Date() 
      }]);
      // Always show support suggestions on error
      setActiveSuggestionCategory('support');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    // Set the input to the suggested question
    setInput(question);
    
    // Automatically submit the form
    const formEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSend(formEvent);
  };

  // Handle quick action click
  const handleQuickAction = (action: string) => {
    // Process based on action type
    switch (action) {
      case "Contact Support":
        handleSuggestedQuestion("How can I contact your support team?");
        break;
      case "View Services":
        handleSuggestedQuestion("What services do you offer?");
        break;
      case "About Us":
        handleSuggestedQuestion("Tell me about Suviksan Technologies");
        break;
      case "Careers":
        handleSuggestedQuestion("Are there any job openings at Suviksan?");
        break;
      default:
        break;
    }
  };

  // Format timestamp
  const formatTime = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Update resize handlers
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { width: dimensions.width, height: dimensions.height };
  };

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = startPos.current.y - e.clientY; // Inverted for natural resizing

      // Calculate new dimensions while maintaining aspect ratio
      const aspectRatio = startSize.current.width / startSize.current.height;
      let newWidth = startSize.current.width + deltaX;
      let newHeight = startSize.current.height + deltaY;

      // Apply minimum and maximum constraints
      newWidth = Math.max(300, Math.min(800, newWidth));
      newHeight = Math.max(400, Math.min(800, newHeight));

      // Ensure the resize is proportional
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        newHeight = newWidth / aspectRatio;
      } else {
        newWidth = newHeight * aspectRatio;
      }

      // Final constraints check
      newWidth = Math.max(300, Math.min(800, newWidth));
      newHeight = Math.max(400, Math.min(800, newHeight));

      setDimensions({
        width: newWidth,
        height: newHeight
      });
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, dimensions]);

  return (
    <>
      <Button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 z-[900] rounded-full p-4 shadow-lg sm:p-5 md:p-6 transition-all duration-300 ease-in-out ${isOpen ? 'bg-red-500 hover:bg-red-600' : ''}`}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6 animate-in zoom-in-90 duration-300" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>

      <div 
        className={`fixed bottom-20 right-4 z-[900] transition-all duration-300 ease-in-out transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <Card className="bg-gray-900 shadow-xl border-none rounded-xl overflow-hidden h-full">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-800">
            <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Bot className="h-6 w-6 md:h-7 md:w-7 text-white" />
              <span className="bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mono drop-shadow-sm">
                Suvix
              </span>
              {userEmail && (
                <span className="text-sm font-normal text-gray-400 hidden sm:inline-block ml-2">
                  • {userEmail}
                </span>
              )}
            </CardTitle>
            <div className="flex gap-2">
              {messages.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full text-gray-400 hover:text-white" 
                  onClick={resetChat}
                  title="Reset chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full" 
                onClick={toggleChat}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 h-[calc(100%-64px)] flex flex-col">
            {/* Chat messages */}
            <div className="space-y-4 mb-4 flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} items-end gap-2 animate-in slide-in-from-bottom-2 duration-300`}>
                  {msg.isBot && (
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-gray-300" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    {msg.isBot ? (
                      <div className="bg-muted text-foreground rounded-lg px-4 py-2 max-w-[240px]">
                        {msg.text}
                      </div>
                    ) : (
                      <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[240px] inline-block w-auto">
                        {msg.text}
                      </div>
                    )}
                    <span className={`text-xs mt-1 text-gray-400 ${msg.isBot ? 'ml-1' : 'mr-1 text-right'}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  {!msg.isBot && (
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start items-end gap-2 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-300" />
                  </div>
                  <div className="bg-muted text-foreground rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Suggested questions - Modified to always show when emailSubmitted and not loading */}
              {emailSubmitted && !isLoading && (
                <div className="flex flex-col space-y-2 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex justify-start items-end gap-2">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-gray-300" />
                    </div>
                    <div className="bg-gray-800 text-gray-300 rounded-lg px-4 py-2">
                      Suggested questions:
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-8">
                    {suggestedQuestions[activeSuggestionCategory || 'general' as keyof typeof suggestedQuestions].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 transition-colors duration-200 text-left"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action buttons */}
            {emailSubmitted && !isLoading && (
              <div className="flex justify-between mb-4 gap-1">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.label)}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300 text-xs flex items-center gap-1.5 px-2 py-1 h-auto"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* Input form */}
            <form onSubmit={emailSubmitted ? handleSend : handleEmailSubmit} className="flex gap-2 mt-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={emailSubmitted ? "Type your message..." : "Enter your email address..."}
                className="flex-1 bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-white"
                onKeyDown={(e) => e.key === 'Enter' && (emailSubmitted ? handleSend(e) : handleEmailSubmit(e))}
                autoComplete="off"
                type={emailSubmitted ? "text" : "email"}
                disabled={isLoading}
                autoFocus
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  emailSubmitted ? <Send className="h-4 w-4" /> : <Mail className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardContent>

          {/* Updated resize handle - More professional appearance */}
          <div
            ref={resizeRef}
            className="absolute top-0 left-0 w-5 h-5 cursor-nw-resize group"
            onMouseDown={handleResizeStart}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-2 h-2 border-t-2 border-l-2 border-gray-400 group-hover:border-white transition-colors duration-200" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ChatBot;