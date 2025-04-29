import { companyInfo, servicesCatalog, upcomingEvents, faqs } from './company-data';

// This service provides functions to interact with Google's Gemini API for the chatbot
// and handles context creation from company data

// Type definitions
export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Initialize the chat history with system prompt containing company information
export const initializeChatContext = (): ChatMessage[] => {
  // Create a context prompt that embeds company information for the AI
  const contextPrompt = `
You are an AI assistant named Suvix for ${companyInfo.name}, a leading technology consulting company specializing in Data Analytics, Cybersecurity, Data Security, Cloud Services, and IT Outsourcing.

Company Information:
- Name: ${companyInfo.name}
- Slogan: "${companyInfo.slogan}"
- Founded: ${companyInfo.founded}
- Headquarters: ${companyInfo.headquarters.address}, ${companyInfo.headquarters.city}, ${companyInfo.headquarters.state}, ${companyInfo.headquarters.country} ${companyInfo.headquarters.postalCode}
- Contact: Phone: ${companyInfo.contact.phone}, Email: ${companyInfo.contact.email}
- Working Hours: ${companyInfo.workingHours.weekdays}, ${companyInfo.workingHours.weekend}
- Company Size: ${companyInfo.companySize.employees}, ${companyInfo.companySize.experience}, operations in ${companyInfo.companySize.countries}
- Website: ${companyInfo.website}

Company Description:
${companyInfo.about.description}

Company Expertise:
${companyInfo.about.expertise}

Major Clients:
${companyInfo.clients.join(', ')}

Social Media:
- LinkedIn: ${companyInfo.socialMedia.linkedin}
- Twitter: ${companyInfo.socialMedia.twitter}
- Facebook: ${companyInfo.socialMedia.facebook}
- Instagram: ${companyInfo.socialMedia.instagram}

Services Information:
1. Data Analytics: ${servicesCatalog.dataAnalytics.description}
   - Key services: ${servicesCatalog.dataAnalytics.services.map(s => s.name).join(', ')}

2. Cybersecurity Solutions: ${servicesCatalog.cybersecurity.description}
   - Key services: ${servicesCatalog.cybersecurity.services.map(s => s.name).join(', ')}

3. Data Security: ${servicesCatalog.dataSecuritySolutions.description}
   - Key services: ${servicesCatalog.dataSecuritySolutions.services.map(s => s.name).join(', ')}

4. Cloud Services: ${servicesCatalog.cloudServices.description}
   - Key services: ${servicesCatalog.cloudServices.services.map(s => s.name).join(', ')}

5. IT Outsourcing: ${servicesCatalog.itOutsourcing.description}
   - Key services: ${servicesCatalog.itOutsourcing.services.map(s => s.name).join(', ')}

Your responses should:
- Be professional, helpful, concise, and direct
- Provide accurate information based on the company data provided
- Use a confident, knowledgeable tone that represents ${companyInfo.name} as an industry leader
- When discussing services, emphasize our expertise, experience, and client-focused approach
- When asked about service charges or pricing, explain that we offer customized solutions with pricing based on project requirements, and invite them to contact our team at ${companyInfo.contact.email} or ${companyInfo.contact.phone} for a personalized quote
- If asked about topics outside the company's domain, politely redirect to company-related information
- If asked about detailed specifications not included in your knowledge, offer to connect them with a Suviksan specialist
- Always offer the website ${companyInfo.website} for more detailed information
- For inquiries about careers, mention that we're always looking for talented professionals and direct them to ${companyInfo.contact.careers}
- Never make up information about the company that isn't provided in this context

If you don't know the answer to a specific question about Suviksan, suggest that the user visit the website at ${companyInfo.website} or contact the team at ${companyInfo.contact.email}.
`;

  return [
    { role: 'system', content: contextPrompt },
    { 
      role: 'assistant', 
      content: `Hello! I'm Suvix, the virtual assistant for ${companyInfo.name}. How can I help you today?` 
    }
  ];
};

// API Key configuration - in a real app, you would use environment variables
// For development purposes, we'll set a placeholder
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Function to send messages to the Gemini API
export const sendMessageToGemini = async (
  messages: ChatMessage[],
  userEmail: string = ''
): Promise<string> => {
  try {
    // Get the user's query
    const userQuery = messages[messages.length - 1].content;
    
    // Try to find a direct answer in the FAQs first
    const faqMatch = findFAQMatch(userQuery);
    if (faqMatch) {
      return faqMatch;
    }
    
    // Check for specific queries about services, social media, etc.
    const directMatch = findDirectMatch(userQuery);
    if (directMatch) {
      return directMatch;
    }
    
    // Skip the system message when sending to Gemini API
    const conversationMessages = messages.filter(msg => msg.role !== 'system');
    
    // Add user information to the request for context
    const userContext = userEmail ? 
      `The user's email is ${userEmail}. Please personalize your response accordingly.` : '';
    
    // If we're using a mock for development
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
      console.log('Using mock response - no API key provided');
      return getMockResponse(userQuery);
    }
    
    // Prepare the request body for Gemini API
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: conversationMessages.map(msg => 
                `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
              ).join('\n\n') + (userContext ? `\n\n${userContext}` : '')
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    // Make the API request
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      console.error(`Error from Gemini API: ${response.status} ${response.statusText}`);
      return getUnknownQueryResponse();
    }
    
    const responseData = await response.json();
    
    // Extract the text response
    if (responseData.candidates && 
        responseData.candidates[0] && 
        responseData.candidates[0].content && 
        responseData.candidates[0].content.parts && 
        responseData.candidates[0].content.parts[0].text) {
      return responseData.candidates[0].content.parts[0].text;
    }
    
    // If there's no proper response format, return unknown query response
    return getUnknownQueryResponse();
    
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    return getUnknownQueryResponse();
  }
};

// Function to find matching FAQ
const findFAQMatch = (query: string): string | null => {
  const queryLower = query.toLowerCase();
  
  // Try to find a direct match in FAQs
  for (const faq of faqs) {
    // Check if the query matches keywords in the question
    const questionWords = faq.question.toLowerCase().split(' ');
    const queryWords = queryLower.split(' ');
    
    // Calculate word overlap
    const matchingWords = questionWords.filter(word => 
      word.length > 3 && queryWords.includes(word)
    );
    
    // If there's significant overlap or direct keyword matches
    if (matchingWords.length >= 2 || 
        questionWords.some(word => word.length > 4 && queryLower.includes(word)) ||
        queryLower.includes('service') && faq.question.toLowerCase().includes('service')) {
      return faq.answer;
    }
  }
  
  return null;
};

// Function to find direct matches for common queries
const findDirectMatch = (query: string): string | null => {
  const queryLower = query.toLowerCase();
  
  // Check for topics that are outside the chatbot's domain
  const outsideKnowledgeDomainTerms = [
    'politics', 'religion', 'healthcare', 'medical', 'personal advice', 
    'legal advice', 'stock prediction', 'investment advice', 'future prices',
    'weather forecast', 'climate', 'coronavirus', 'covid', 'pandemic',
    'sports', 'entertainment', 'movies', 'celebrities', 'presidential',
    'election', 'vote', 'gambling', 'betting', 'lottery',
    'bitcoin', 'crypto', 'blockchain', 'doge', 'nft', 'mortgage rates',
    'dating', 'relationship', 'travel', 'tourism', 'hotel', 'flight',
    'recipe', 'cook', 'food', 'health', 'medicine', 'diagnosis',
    'treatment', 'cure', 'symptoms', 'disease'
  ];
  
  // Check if query contains terms outside knowledge domain
  if (outsideKnowledgeDomainTerms.some(term => queryLower.includes(term))) {
    return getUnknownQueryResponse();
  }
  
  // Check for service-related queries
  if (queryLower.includes('service') || queryLower.includes('offer') || queryLower.includes('provide')) {
    if (queryLower.includes('data analytic') || queryLower.includes('analytics')) {
      return `Our Data Analytics services help transform raw data into actionable insights to drive your business decisions and strategy. We offer: 
      
1. Business Intelligence - comprehensive solutions to visualize and understand your business data
2. Predictive Analytics - advanced analytics to forecast trends and anticipate future outcomes
3. Data Management - comprehensive strategies for data integration, warehousing, and governance
4. Custom Analytics Solutions - tailored specifically for your industry and business needs

For more details, please visit ${companyInfo.website} or contact us at ${companyInfo.contact.email}.`;
    }
    
    if (queryLower.includes('cyber') || queryLower.includes('security') && !queryLower.includes('data security')) {
      return `Our Cybersecurity Solutions provide comprehensive protection for your digital assets from evolving threats. We offer:
      
1. Security Audits & Assessment - thorough evaluation to identify vulnerabilities and security gaps
2. Managed Security Services - 24/7 monitoring and protection against cyber threats
3. Security Implementation - robust solutions tailored to your business needs
4. Incident Response - rapid response team to handle and mitigate security breaches

For more information or a personalized security assessment, please contact us at ${companyInfo.contact.email}.`;
    }
    
    if (queryLower.includes('data security') || queryLower.includes('data protection')) {
      return `Our Data Security services ensure the integrity, confidentiality, and safety of your data through logical corporate security procedures. We offer:
      
1. Data Protection Solutions - secure your sensitive data with advanced encryption and data loss prevention
2. Compliance Solutions - ensure your data practices comply with relevant regulations and standards
3. Data Privacy Management - comprehensive strategies to maintain data privacy across your organization
4. Secure Data Lifecycle Management - manage data securely throughout its entire lifecycle

To discuss your data security needs, please reach out to us at ${companyInfo.contact.email}.`;
    }
    
    if (queryLower.includes('cloud')) {
      return `Our Cloud Services provide comprehensive solutions to optimize your IT infrastructure and enable digital transformation. We offer:
      
1. Cloud Migration & Strategy - seamless transition to cloud infrastructure with minimal disruption
2. Cloud Infrastructure Management - ongoing management and optimization of your cloud environment
3. Cloud Application Development - development of cloud-native applications optimized for performance
4. Hybrid & Multi-Cloud Solutions - strategic implementation of hybrid and multi-cloud environments

Contact us at ${companyInfo.contact.email} to discuss your cloud computing needs.`;
    }
    
    if (queryLower.includes('outsourcing') || queryLower.includes('outsource') || queryLower.includes('staffing')) {
      return `Our IT Outsourcing services provide flexible solutions to optimize your technology operations and reduce costs. We offer:
      
1. Managed IT Services - comprehensive management of your IT infrastructure and operations
2. IT Staff Augmentation - skilled IT professionals to supplement your existing team
3. Software Development Outsourcing - expert development teams for your applications
4. IT Consulting Services - strategic IT advisory services to optimize your technology investments

To discuss how our IT outsourcing can benefit your business, contact us at ${companyInfo.contact.email}.`;
    }
    
    // General services query
    return `Suviksan Technologies offers a comprehensive range of IT services:

1. Data Analytics - transforming raw data into actionable insights
2. Cybersecurity Solutions - protecting your digital assets from evolving threats
3. Data Security - ensuring the integrity and confidentiality of your data
4. Cloud Services - optimizing your IT infrastructure for digital transformation
5. IT Outsourcing - flexible solutions to optimize operations and reduce costs

Each service is tailored to meet the specific needs of your business. For more information, please visit our website at ${companyInfo.website} or contact us at ${companyInfo.contact.email}.`;
  }
  
  // Check for social media queries
  if (queryLower.includes('social media') || queryLower.includes('facebook') || queryLower.includes('linkedin') || 
      queryLower.includes('twitter') || queryLower.includes('instagram')) {
    
    return `You can connect with Suviksan Technologies on various social media platforms:

• LinkedIn: ${companyInfo.socialMedia.linkedin}
• Twitter: ${companyInfo.socialMedia.twitter}
• Facebook: ${companyInfo.socialMedia.facebook}
• Instagram: ${companyInfo.socialMedia.instagram}

Follow us to stay updated with our latest news, events, and insights in the technology industry!`;
  }
  
  // Check for company size/employee queries
  if (queryLower.includes('employee') || queryLower.includes('company size') || queryLower.includes('how big') || 
      queryLower.includes('how many people') || queryLower.includes('team size')) {
    
    return `Suviksan Technologies has ${companyInfo.companySize.employees} with ${companyInfo.companySize.experience} in the IT industry. We have operations across ${companyInfo.companySize.countries} and a team of ${companyInfo.companySize.professionals} who are dedicated to delivering excellent solutions to our clients.`;
  }
  
  // Check for pricing/charges queries
  if (queryLower.includes('price') || queryLower.includes('cost') || queryLower.includes('charge') || 
      queryLower.includes('fee') || queryLower.includes('how much') || queryLower.includes('pricing')) {
    
    return `At Suviksan Technologies, we provide customized solutions with pricing tailored to your specific project requirements and scope. Our pricing models are flexible and designed to deliver maximum value while accommodating various budget considerations. 

For a personalized quote or detailed pricing information for your specific needs, please contact our team at ${companyInfo.contact.email} or call us directly at ${companyInfo.contact.phone}.`;
  }
  
  // Check for company management/founder queries
  if (queryLower.includes('founder') || queryLower.includes('ceo') || queryLower.includes('director') || 
      queryLower.includes('management') || queryLower.includes('lead') || queryLower.includes('executive')) {
    
    return `Suviksan Technologies was founded by a team of experienced IT professionals with expertise in various technology domains. Our leadership team brings decades of combined experience in the industry.

For more information about our management team and company structure, please visit our website at ${companyInfo.website}/about-us or contact us at ${companyInfo.contact.email}.`;
  }
  
  // Check for contact information queries
  if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('phone')) {
    return `You can reach ${companyInfo.name} via:

• Email: ${companyInfo.contact.email}
• Phone: ${companyInfo.contact.phone}
• Office: ${companyInfo.headquarters.address}, ${companyInfo.headquarters.city}, ${companyInfo.headquarters.state}
• Hours: ${companyInfo.workingHours.weekdays}

Our team is ready to assist you with any inquiries or requirements.`;
  }
  
  // Check for location queries
  if (queryLower.includes('location') || queryLower.includes('address') || queryLower.includes('office')) {
    return `Our headquarters is located at:

${companyInfo.headquarters.address}
${companyInfo.headquarters.city}, ${companyInfo.headquarters.state}
${companyInfo.headquarters.country} ${companyInfo.headquarters.postalCode}

We also have operations in Germany, Sweden, and the Philippines.`;
  }
  
  // Check for client queries
  if (queryLower.includes('client') || queryLower.includes('customer') || queryLower.includes('work with')) {
    return `Suviksan Technologies works with several prestigious clients across various industries, including ${companyInfo.clients.join(', ')}. Our collaborations span over many countries, where we've addressed diverse challenges with tailored strategies, helping our clients achieve success and growth.`;
  }
  
  // Check for company information queries
  if (queryLower.includes('about') || (queryLower.includes('company') && !queryLower.includes('company size'))) {
    return `${companyInfo.about.description} 

${companyInfo.about.expertise}

To learn more about us, visit ${companyInfo.website}.`;
  }
  
  return null;
};

// Function for unknown or unanswerable queries
const getUnknownQueryResponse = (): string => {
  const responses = [
    `I apologize, but I don't have enough information to answer this question accurately. As Suviksan's virtual assistant, I can help with questions about our services, company information, and how to contact us. Would you like to know about our Data Analytics services or Cybersecurity solutions?`,
    
    `I'm sorry, I don't have specific information about that topic. I'd be happy to tell you about Suviksan's Cloud Services or IT Outsourcing options instead. You can also ask "How can I book a demo?" or "What industries do you serve?"`,
    
    `That's beyond my current knowledge base. Instead, I can help you with information about our company, service offerings, or contact details. Perhaps you'd like to know "Where is your office located?" or "How can I contact your team?"`,
    
    `I don't have the specific information you're looking for. Would you prefer to learn about our company background, request a callback, or explore our international services? You can ask "Do you work with international clients?" or "Can I request a callback?"`,
    
    `I'm not trained on that particular topic. Let me help you with something related to Suviksan Technologies instead. You might want to ask "What services do you offer?" or "Are there any job openings?"`,
    
    `I don't have that information in my knowledge base. As Suviksan's assistant, I can help with questions about our services or company. Try asking "Do you provide cloud solutions?" or "How can I get technical support?"`,
    
    `I'm not able to answer that specific question. Would you like to know about our Data Security services or how to contact our support team? You could also ask "How can I book a demo?" or "What industries do you serve?"`,
    
    `That's outside my area of expertise. I'd be happy to tell you about Suviksan's main products, office locations, or how to report an issue with our services. Feel free to ask "What are the requirements to join Suviksan?" or "How can I report a problem?"`
  ];
  
  // Return a random response for variety
  return responses[Math.floor(Math.random() * responses.length)];
};

// Mock response function for development without API key
const getMockResponse = (userMessage: string): string => {
  const userMessageLower = userMessage.toLowerCase();
  
  // Try to find direct answers first
  const faqMatch = findFAQMatch(userMessage);
  if (faqMatch) {
    return faqMatch;
  }
  
  // Check for specific direct matches
  const directMatch = findDirectMatch(userMessage);
  if (directMatch) {
    return directMatch;
  }
  
  // Check for questions where bot should admit it doesn't know
  // Check for phrases indicating the user is asking about something very specific or technical
  const unknownIndicators = [
    "what is the best", "how do i", "explain how", "can you tell me about",
    "what do you think of", "opinion on", "thoughts on", "what are the steps to",
    "how can i become", "how many", "when will", "who is the", "where can i find",
    "compare", "difference between", "versus", "vs", "which one is better"
  ];
  
  // If the query is complex or specific and not about company services
  if (
    (unknownIndicators.some(phrase => userMessageLower.includes(phrase)) && 
    !userMessageLower.includes("suviksan") && 
    !userMessageLower.includes("service") && 
    !userMessageLower.includes("company")) ||
    userMessageLower.length > 100 // Long, complex questions
  ) {
    return getUnknownQueryResponse();
  }
  
  // Default response
  return `Thank you for your message. I'd be happy to help you with information about ${companyInfo.name} and our services in Data Analytics, Cybersecurity, Data Security, Cloud Services, and IT Outsourcing. How can I assist you specifically today?`;
};

// Function to classify user intent
export const classifyUserIntent = (message: string): string => {
  const messageLower = message.toLowerCase();
  
  // Simple keyword-based classification
  if (messageLower.includes('hi') || messageLower.includes('hello') || messageLower.includes('hey')) {
    return 'greeting';
  }
  
  if (messageLower.includes('bye') || messageLower.includes('goodbye')) {
    return 'farewell';
  }
  
  if (messageLower.includes('thank')) {
    return 'thanks';
  }
  
  if (messageLower.includes('contact') || messageLower.includes('call') || messageLower.includes('email')) {
    return 'contact';
  }
  
  if (messageLower.includes('service') || messageLower.includes('offer')) {
    return 'services';
  }
  
  if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote')) {
    return 'pricing';
  }
  
  if (messageLower.includes('location') || messageLower.includes('address') || messageLower.includes('office')) {
    return 'location';
  }
  
  if (messageLower.includes('social') || messageLower.includes('facebook') || messageLower.includes('linkedin')) {
    return 'social_media';
  }
  
  if (messageLower.includes('employee') || messageLower.includes('company size') || messageLower.includes('team')) {
    return 'company_size';
  }
  
  if (messageLower.includes('founder') || messageLower.includes('ceo') || messageLower.includes('management')) {
    return 'management';
  }
  
  return 'general';
}; 