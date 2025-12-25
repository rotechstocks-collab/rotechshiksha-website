# Rotech Shiksha

## Overview

Rotech Shiksha is a comprehensive stock market education platform targeting Indian retail investors. The platform provides free and paid educational content including ebooks, video tutorials, and financial calculators. It features OTP-based mobile authentication, a live market ticker with TradingView integration, course management across skill levels (Basic to Algo Trading), and an admin dashboard for lead and payment management.

## Recent Changes

- **Dec 2024**: Advanced Economic Calendar (Premium Upgrade)
  - Backend service with Finnhub API integration (optional FINNHUB_API_KEY)
  - 15-minute caching with auto-refresh background job
  - Comprehensive sample data fallback with 30+ event types
  - API route: GET /api/economic-calendar
  - **Clickable Event Detail Modal** with:
    - Full event description and explanation
    - Market impact analysis (Bullish/Bearish/Volatile/Neutral)
    - Affected markets (Stocks, Forex, Bonds, Sectors)
    - Sector classification and release frequency
  - Premium card-based UI with hover animations
  - "Upcoming High-Impact Events" spotlight section
  - Smart insights with beginner-friendly explanations
  - Impact statistics dashboard (High/Medium/Low counts)
  - Color-coded impact indicators with actual vs forecast comparisons
  - Trend arrows for better/worse than forecast
  - Country flags using flagcdn.com
  - Filters: Date range, Country, Impact level
  - Auto-refresh every 3 minutes for real-time feel
  - Navigation added in all 7 languages via Tools dropdown

- **Dec 2024**: IPO Tracking System
  - Backend IPO service with multi-tier fallback (ipoalerts.in → NSE → sample data)
  - 15-minute caching with auto-refresh background job
  - IPO API routes (/api/ipo, /api/ipo/:id, /api/ipo/news, /api/ipo/refresh)
  - Real-time IPO news from GNews API with MoneyControl fallback
  - Frontend React Query integration with 5-minute auto-refetch
  - IPO listing page with status tabs (All, Open, Upcoming, Closed)
  - IPO detail page with financials, subscription status, key dates
  - Loading skeletons, error states, stale data indicators
  - Navigation added in all 7 languages

- **Dec 2024**: Multi-language support (7 Indian languages)
  - Language selector dropdown in header with globe icon
  - Supported languages: English, Hindi, Marathi, Tamil, Kannada, Gujarati, Telugu
  - JSON-based translation files in `client/src/translations/`
  - LanguageContext with `useLanguage()` hook and `t()` function
  - Language preference saved to localStorage (persists across sessions)
  - SEO hreflang tags dynamically added for each language
  - Home page and Hero component fully translated
  - Scalable architecture for adding more translations

- **Dec 2024**: Live News & Videos feature (Legal Sources Only)
  - GNews API integration for news (free, legal, with sample data fallback)
  - Bilingual support (English/Hindi) with language toggle
  - Category filtering (All, Markets, Economy, Business, Tech, Banking, Mutual Funds)
  - "In Focus" section with top stories and featured story hero
  - Full article modal with image, title, summary, source, and timestamp
  - **Global Market Videos Section** with official YouTube embeds:
    - Reuters Business (auto-updating playlist)
    - Bloomberg Live (24/7 live stream)
    - Yahoo Finance (auto-updating playlist)
    - CNBC Latest (auto-updating playlist)
  - **India Market Videos Section** with official YouTube embeds:
    - CNBC TV18, ET Now, Zee Business, MoneyControl
  - Horizontal scroll layout for video cards
  - 60-second auto-refresh with visual countdown indicator
  - News/Videos tab switcher with Framer Motion animations
  - Proper data-testid attributes for testing
  - Navigation added via Tools dropdown in Header

- **Dec 2024**: Initial MVP build with all core features
  - PostgreSQL database with users, leads, otps, payments, chatMessages tables
  - OTP-based authentication with lead capture funnel
  - 4-level course system (Basic, Intermediate, Advanced, Algo Trading)
  - Trading calculators (SIP, Risk-Reward, Position Size, Brokerage)
  - Payment flow with screenshot upload (₹99 and ₹999 plans)
  - Admin panel for lead/payment/chat management
  - Live market ticker with simulated data

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state, React Context for auth/theme/language
- **Internationalization**: Custom LanguageContext with JSON translation files
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with Replit plugins

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Session Management**: express-session with 30-day cookie expiry
- **Database**: PostgreSQL with Drizzle ORM

### Database Schema
- **users**: Verified users with mobile, name, experience level
- **leads**: Captured before OTP verification for marketing
- **otps**: OTP codes with expiry timestamps
- **payments**: Payment records with base64 screenshot storage
- **chatMessages**: Live chat messages with session tracking

### Key Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, courses, pricing |
| `/about` | Company info, team, values |
| `/courses` | Course listing (4 levels) |
| `/courses/:level` | Course details with modules/topics |
| `/live-news` | Financial news (English/Hindi) |
| `/ipo` | IPO listing with status tabs |
| `/ipo/:id` | IPO detail with financials |
| `/economic-calendar` | Economic events calendar with filters |
| `/calculators` | Trading calculators |
| `/pricing` | Pricing plans with FAQ |
| `/payment/:planId` | Payment with screenshot upload |
| `/dashboard` | User dashboard |
| `/admin` | Admin panel (requires admin flag) |
| `/login` | Login page |

### Authentication Flow
1. User clicks any gated action → AuthModal opens
2. Step 1: Lead capture form (name, mobile, email, experience)
3. Step 2: 6-digit OTP verification
4. On success: User created/verified, session established

### Payment Flow
1. User selects plan (₹99 Starter or ₹999 Pro)
2. Payment page shows UPI ID and bank details
3. User uploads payment screenshot (converted to base64)
4. Admin reviews in admin panel and approves/rejects

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to mobile
- `POST /api/auth/verify-otp` - Verify OTP and create session
- `POST /api/auth/resend-otp` - Resend OTP
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Payments
- `POST /api/payments` - Create payment with screenshot
- `GET /api/payments/user` - Get user's payments

### Admin
- `GET /api/admin/leads` - Get all leads
- `GET /api/admin/payments` - Get all payments
- `PATCH /api/admin/payments/:id/approve` - Approve payment
- `PATCH /api/admin/payments/:id/reject` - Reject payment
- `GET /api/admin/chats` - Get all chat messages

### Market Data
- `GET /api/market/live` - Get live market indices
- `GET /api/market/search` - Search stocks by name/symbol
- `GET /api/market/quote/:symbol` - Get single stock quote

### News API
- `GET /api/news` - Get financial news (params: lang=en|hi, category, limit)
- `GET /api/news/featured` - Get featured/top stories
- `GET /api/news/categories` - Get available news categories

### Alpha Vantage API (Real-time Data)
- `GET /api/alphavantage/quote/:symbol` - Get real-time quote from Alpha Vantage
- `GET /api/alphavantage/intraday/:symbol` - Get intraday chart data (5min intervals)
- `GET /api/alphavantage/search` - Search stocks via Alpha Vantage API
- `GET /api/alphavantage/status` - Check API configuration status

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `ALPHAVANTAGE_API_KEY` - Alpha Vantage API key for real-time stock data
- `GNEWS_API_KEY` - GNews API key for live news integration

## Multi-Language System

### Supported Languages
| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| hi | Hindi | हिन्दी |
| mr | Marathi | मराठी |
| ta | Tamil | தமிழ் |
| kn | Kannada | ಕನ್ನಡ |
| gu | Gujarati | ગુજરાતી |
| te | Telugu | తెలుగు |

### Usage
```tsx
import { useLanguage } from "@/context/LanguageContext";

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  return <h1>{t("home.features.title")}</h1>;
}
```

### Adding Translations
1. Add new keys to all JSON files in `client/src/translations/`
2. Use the `t("key.path")` function in components
3. Translation files use flat key structure like `"nav.home": "Home"`

## Development Notes

- OTP is logged to console in development (integrate SMS provider for production)
- Market data uses Alpha Vantage API when configured, with Yahoo Finance fallback
- Payment screenshots stored as base64 in database
- Admin access requires `isAdmin: true` flag on user record
