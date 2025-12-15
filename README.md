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
- **Deployment**: Vercel

## 🏗️ Project Structure

```
FillGenie Website/
├── fillgenie-site/          # Main React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── common/      # Shared components (Button, Card, Section)
│   │   │   ├── home/        # Home page sections
│   │   │   ├── layout/      # Layout components (Header, Footer)
│   │   │   └── pricing/     # Pricing components
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── CaseStudies.tsx
│   │   │   ├── CustomSolutions.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── ...
│   │   └── App.tsx          # Main app component with routing
│   ├── public/
│   └── package.json
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
- `/login` - Login page (placeholder)

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

- Simplified design with reduced animations and spacing
- Added comprehensive FAQ section
- Created case studies page with BottleVision example
- Built custom solutions page for enterprise clients
- Enhanced pricing page with social proof
- Updated all contact information to fillgenie@gmail.com
- Improved SEO with visible FAQ content
