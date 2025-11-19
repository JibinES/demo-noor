# Noor Modest Wear - E-Commerce Platform

An elegant, culturally-sensitive e-commerce platform for burkhas, abayas, hijabs, and modest Islamic fashion. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

### Core Functionality
- **Homepage** with hero section, category navigation, featured products, and customer testimonials
- **Product Listing Pages** with advanced filtering (price, size, color, fabric) and sorting
- **Product Detail Pages** with image gallery, size/color selection, and detailed specifications
- **Shopping Cart** with quantity management and order summary
- **Wishlist** functionality to save favorite items
- **Checkout Flow** with delivery information and payment options
- **User Authentication** pages (Login/Signup)
- **Customer Account Dashboard** with order history and profile management

### Design Features
- **Elegant Color Scheme**: Emerald green, antique gold, and burgundy on cream background
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Islamic Design Elements**: Subtle geometric patterns and culturally appropriate imagery
- **Premium Typography**: Playfair Display for headings, Inter for body text
- **Smooth Animations**: Elegant transitions and hover effects
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels

### Technical Features
- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Zustand** for state management (cart & wishlist)
- **Persistent Storage**: Cart and wishlist saved in localStorage
- **100+ Mock Products**: Comprehensive product data for demonstration
- **SEO Optimized**: Proper metadata and semantic HTML

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd burkha
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) (or http://localhost:3001 if 3000 is in use) in your browser

## 📁 Project Structure

```
burkha/
├── app/                      # Next.js 14 App Router pages
│   ├── category/[slug]/      # Category listing pages
│   ├── products/[slug]/      # Product detail pages
│   ├── cart/                 # Shopping cart page
│   ├── checkout/             # Checkout flow
│   ├── wishlist/             # Wishlist page
│   ├── login/                # Authentication pages
│   ├── account/              # Customer dashboard
│   ├── layout.tsx            # Root layout with Header & Footer
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/
│   ├── layout/               # Layout components
│   │   ├── Header.tsx        # Main navigation header
│   │   └── Footer.tsx        # Footer with newsletter
│   ├── products/             # Product components
│   │   └── ProductCard.tsx   # Reusable product card
│   └── ui/                   # UI components
│       ├── Button.tsx        # Custom button component
│       ├── Badge.tsx         # Badge component
│       └── Input.tsx         # Form input component
├── data/
│   └── products.ts           # Mock product data (100+ products)
├── lib/
│   ├── store.ts              # Zustand store (cart & wishlist)
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald Green (#047857) - Main brand color, CTAs
- **Secondary**: Antique Gold (#D4AF37) - Luxury accents, highlights
- **Accent**: Burgundy (#7F1D1D) - Sale items, urgency
- **Neutrals**: Cream (#FAF9F6), Charcoal (#262626)

### Typography
- **Display/Headings**: Playfair Display
- **Body Text**: Inter
- **Decorative**: Great Vibes

### Components
All components follow consistent design patterns with:
- Rounded corners (8-12px)
- Subtle shadows for depth
- Smooth transitions (200-300ms)
- Hover states with scale effects
- Focus states with gold rings

## 🛠️ Technologies

- **Framework**: Next.js 14.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.0
- **State Management**: Zustand 4.5.0
- **Icons**: Lucide React 0.363.0
- **Animations**: Framer Motion 11.0.0 (ready to use)
- **Forms**: React Hook Form 7.51.0 + Zod validation

## 📄 Available Pages

### Public Pages
- `/` - Homepage
- `/category/[slug]` - Category listing (abayas, burkhas, hijabs, maxi-dresses)
- `/products/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/wishlist` - Saved items
- `/checkout` - Checkout flow
- `/login` - Login/Signup

### Account Pages (Demo)
- `/account` - Account dashboard
- `/account/orders` - Order history
- More account pages can be added as needed

## 🔧 Key Features Implementation

### State Management
The application uses Zustand for global state:
- **Cart**: Add/remove items, update quantities, calculate totals
- **Wishlist**: Save/remove favorite products
- **Persistence**: All data saved to localStorage

### Product Filtering
The category pages include comprehensive filtering:
- Price range slider
- Size selection
- Color selection with visual swatches
- Fabric/material filters
- Sorting options (featured, price, rating, newest)

### Responsive Design
- Mobile hamburger menu
- Collapsible filters on mobile
- Responsive product grids (1-4 columns)
- Touch-friendly interactions
- Optimized images with Next.js Image component

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1279px
- Large Desktop: 1280px+

## 🎯 Future Enhancements

- Backend integration with real API
- User authentication with JWT
- Payment gateway integration
- Order tracking functionality
- Product reviews and ratings
- Admin dashboard for product management
- Email notifications
- Advanced search with autocomplete
- Product recommendations using AI
- Multi-language support (Arabic, Urdu)

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

This project is ready to deploy on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** (configuration included in project structure)

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 👥 Target Audience

- Muslim women aged 18-55
- Seeking modest, fashionable Islamic clothing
- Tech-savvy shoppers comfortable with online purchases
- Located primarily in urban areas (India, Middle East, Southeast Asia)

## 🎨 Brand Values

- **Modesty**: Respectful representation of Islamic values
- **Elegance**: Premium design and quality products
- **Authenticity**: Genuine modest fashion expertise
- **Community**: Building a supportive modest fashion community

## 📞 Support

For issues or questions about the codebase:
1. Check the component documentation in source files
2. Review the TypeScript types in `lib/types.ts`
3. Examine the design system in `tailwind.config.ts`

## 📄 License

This is a demonstration project created for portfolio purposes.

## 🙏 Acknowledgments

- Design inspired by premium modest fashion retailers
- Islamic geometric patterns from traditional art
- Color palette selected for cultural appropriateness
- Built with modern web development best practices

---

**Built with ❤️ for the Modest Fashion Community**
