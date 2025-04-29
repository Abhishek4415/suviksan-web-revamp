interface RegistrationData {
  eventId: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  designation?: string;
  message?: string;
}

export const registerForEvent = async (data: RegistrationData) => {
  try {
    // In a real application, this would be an API call to your backend
    // For now, we'll simulate a successful registration
    console.log('Registering for event:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful registration
    return {
      success: true,
      message: 'Registration successful',
      registration: {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      }
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Failed to register for the event');
  }
}; 