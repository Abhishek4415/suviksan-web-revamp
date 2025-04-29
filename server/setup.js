import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Suviksan backend server...');

// Check if .env file exists, create it if not
const envFilePath = path.join(__dirname, '.env');
if (!fs.existsSync(envFilePath)) {
  console.log('📝 Creating .env file...');
  const envContent = `PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/suviksan
NODE_ENV=development

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=contact@yourdomain.com
CONTACT_EMAIL=siyaabhi441@gmail.com`;
  
  fs.writeFileSync(envFilePath, envContent);
  console.log('✅ .env file created successfully');
  console.log('⚠️ Please update the MONGODB_URI and SendGrid API key in .env with your credentials');
} else {
  console.log('✅ .env file already exists');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

console.log(`
🎉 Setup completed successfully!

To start the server:
- Development mode: npm run dev
- Production mode: npm start

Don't forget to:
1. Update your MongoDB Atlas connection string in the .env file
2. Update your SendGrid API key in the .env file:
   - Create a free account at https://sendgrid.com/
   - Generate an API key in your SendGrid dashboard
   - Set SENDGRID_API_KEY in your .env file
   - Verify your FROM_EMAIL in SendGrid (must be a verified sender)
   - CONTACT_EMAIL is the recipient email address (default is siyaabhi441@gmail.com)
3. Set the API endpoint in your frontend (.env file with VITE_API_URL=http://localhost:5000)

Happy coding! 🚀
`); 