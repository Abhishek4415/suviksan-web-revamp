import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client with error handling
let prisma: PrismaClient;

try {
  prisma = new PrismaClient();
} catch (error) {
  console.error('Failed to initialize Prisma client:', error);
  throw error;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate request body
    if (!req.body) {
      console.error('No request body received');
      return res.status(400).json({ message: 'Request body is required' });
    }

    const {
      eventId,
      name,
      email,
      phone,
      company,
      designation,
      message,
    } = req.body;

    console.log('Received registration data:', {
      eventId,
      name,
      email,
      phone,
      company,
      designation,
      message,
    });

    // Validate required fields
    if (!eventId || !name || !email || !phone) {
      console.error('Missing required fields:', { eventId, name, email, phone });
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          eventId: !eventId ? 'Event ID is required' : undefined,
          name: !name ? 'Name is required' : undefined,
          email: !email ? 'Email is required' : undefined,
          phone: !phone ? 'Phone is required' : undefined,
        }
      });
    }

    // Check if event exists
    let event;
    try {
      event = await prisma.event.findUnique({
        where: { id: eventId },
      });
    } catch (dbError) {
      console.error('Database error while finding event:', dbError);
      return res.status(500).json({ 
        message: 'Database error while finding event',
        error: dbError instanceof Error ? dbError.message : 'Unknown database error'
      });
    }

    if (!event) {
      console.error('Event not found:', eventId);
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create registration
    let registration;
    try {
      registration = await prisma.eventRegistration.create({
        data: {
          eventId,
          name,
          email,
          phone,
          company: company || null,
          designation: designation || null,
          message: message || null,
          status: 'PENDING',
        },
      });
    } catch (dbError) {
      console.error('Database error while creating registration:', dbError);
      return res.status(500).json({ 
        message: 'Database error while creating registration',
        error: dbError instanceof Error ? dbError.message : 'Unknown database error'
      });
    }

    console.log('Registration created successfully:', registration);

    return res.status(201).json({
      message: 'Registration successful',
      registration,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 