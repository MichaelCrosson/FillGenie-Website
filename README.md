# FillGenie Website

Official marketing website for FillGenie - an AI-powered form filling assistant that saves you hours every week.

## 🚀 Live Site

Visit us at: [fillgenie.com](https://fill-genie.com)

## 📋 Overview

FillGenie is an intelligent Chrome extension that automatically fills out forms using your existing data. Stop copy-pasting, start saving time.

## 🛠️ Tech Stack

- **Framework**: React 18.2.0 + TypeScript
- **Build Tool**: Vite 7.2.7
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: Heroicons
- **Authentication**: JWT with AWS backend integration
- **State Management**: React Context API
- **Deployment**: Vercel

## 🔐 Authentication System

FillGenie uses AWS-backed authentication that works seamlessly across the website, Chrome extension, and dashboard. When users register:

- **S3 Bucket Prefix**: `users/{user_id}/` for document storage
- **Pinecone Namespace**: `user_{user_id}` for vector embeddings
- **PostgreSQL Schema**: `user_{user_id}` with isolated tables

All resources are automatically provisioned on registration. See `AUTHENTICATION_SETUP.md` for complete details.

### Quick Setup

1. Create `.env` file in `fillgenie-site/`:
```bash
VITE_API_URL=http://localhost:8000
```

2. Ensure backend API is running on port 8000

3. Test login at `/login` - registration creates AWS resources automatically

For production, set `VITE_API_URL=https://api.fillgenie.com` in Vercel environment variables.

## 🏗️ Project Structure

```
FillGenie Website/
├── fillgenie-site/          # Main React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── common/      # Shared components (Button, Card, Section)
│   │   │   ├── home/        # Home page sections
│   │   │   ├── layout/      # Layout components (Header, Footer)
│   │   │   └── pricing/     # Pricing components
│   │   ├── contexts/        # React contexts
│   │   │   └── AuthContext.tsx  # Authentication state management
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Login.tsx    # Login/Register page
│   │   │   ├── Dashboard.tsx # User dashboard
│   │   │   ├── CaseStudies.tsx
│   │   │   ├── CustomSolutions.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── ...
│   │   └── App.tsx          # Main app with routing & AuthProvider
│   ├── public/
│   ├── .env                 # Environment variables (API URL)
│   └── package.json
├── AUTHENTICATION_SETUP.md  # Complete auth documentation
├── AWS_USER_RESOURCES_GUIDE.md  # AWS resources guide
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MichaelCrosson/FillGenie-Website.git
cd "FillGenie Website"
```

2. Navigate to the project directory:
```bash
cd fillgenie-site
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## 📄 Available Pages

- `/` - Home page with product overview
- `/pricing` - Pricing tiers and FAQs
- `/login` - Login/Register page with AWS integration
- `/dashboard` - User dashboard (protected route)
- `/case-studies` - Customer case studies (including BottleVision for Kaiser Permanente)
- `/custom-solutions` - Custom automation solutions for enterprises
- `/faq` - Frequently asked questions
- `/about` - Company information and story
- `/contact` - General contact form
- `/schedule-demo` - Demo request form for teams
- `/blog` - Blog directory (coming soon)
- `/security` - Security practices and data protection
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## 🎨 Design System

### Custom Colors

- **Warm Sand**: #FBF4E6 - Primary background
- **Sunlit Amber**: #D98C4A - Primary CTAs and accents
- **Lavender Mist**: #B7A5D8 - Secondary accents
- **Teal Softwave**: #6BA4A6 - Success states and highlights

### Typography

- Headings: Bold, large sizes (3xl-5xl)
- Body: Regular weight, readable sizes
- Spacing: Reduced for better scrolling (py-6 sm:py-8)

## 📞 Contact

- **Email**: fillgenie@gmail.com
- **Website**: [fillgenie.com](https://fillgenie.com)

## 📝 License

© 2025 FillGenie. All rights reserved.

## 🔄 Recent Updates

- **Authentication System**: Full JWT authentication with AWS backend integration
- **User Dashboard**: Protected dashboard page showing account info and AWS resources
- **Session Persistence**: Login state persists across page reloads and navigation
- **Dynamic Header**: Shows "My Dashboard" and logout when authenticated
- **Protected Routes**: Automatic redirect to login for protected pages
- Simplified design with reduced animations and spacing
- Added comprehensive FAQ section
- Created case studies page with BottleVision example
- Built custom solutions page for enterprise clients
- Enhanced pricing page with social proof
- Updated all contact information to fillgenie@gmail.com
- Improved SEO with visible FAQ content
