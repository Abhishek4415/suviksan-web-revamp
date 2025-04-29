
# Suviksan Web Revamp - Odyssey

A modern React-based website for Suviksan Technologies featuring a clean UI, responsive design, and comprehensive content management.

## Overview

This project is a complete redesign of the Suviksan Technologies website, built with React, TypeScript, and Tailwind CSS. It features multiple content sections including blog, news, events, courses, and resources.

## Features

- **Dynamic Content:** Blog posts, news articles, events, and courses with detailed views
- **Responsive Design:** Mobile-first approach with responsive layouts for all screen sizes
- **Modern UI Components:** Built with Tailwind CSS and shadcn/ui
- **Filtering & Search:** Content filtering by categories and search functionality
- **Interactive Elements:** Animations, hover effects, and interactive cards
- **Form Integration:** Contact forms, event registration, and more

## Technologies Used

- **React** - Frontend library
- **TypeScript** - Type-safe JavaScript
- **React Router DOM** - Routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library
- **React Query** - Data fetching and state management

## Project Structure

```
suviksan-web-revamp/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── lib/               # Data models and sample data
│   ├── pages/             # Page components (Blog, Events, Courses, etc.)
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component with routing
│   └── index.tsx          # Application entry point
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/suviksan-web-revamp-odyssey.git
   cd suviksan-web-revamp-odyssey
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Deployment

This project is configured to deploy to GitHub Pages with a basename of `/suviksan-web-revamp`.

1. Build the project:
   ```
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Important Notes

- All routing in the application uses the basename `/suviksan-web-revamp`
- Always use React Router's `Link` component for navigation to ensure proper routing
- Content data is currently stored in `src/lib/blog-data.ts`

## Routing Structure

The application features various content types with consistent URL patterns:

- `/` - Home page
- `/blog` - Blog listing
- `/blog/:id` - Individual blog post
- `/news` - News listing
- `/news/:id` - Individual news article
- `/events` - Events listing
- `/events/:id` - Individual event details
- `/courses` - Courses listing
- `/courses/:id` - Individual course details
- `/resources` - Resources listing
- `/about` - About page
- `/services/*` - Service pages
- `/contact` - Contact page

## Future Improvements

- Integration with a CMS or backend API for dynamic content
- User authentication for member-only content
- Newsletter subscription functionality
- Enhanced SEO optimization
- Performance optimization for images and assets

## License

[License information]

## Contact

For any questions or feedback, please contact [contact information].
