# Rotech Shiksha

## Overview

Rotech Shiksha is a comprehensive stock market education platform targeting Indian retail investors. The platform provides free and paid educational content including ebooks, video tutorials, and financial calculators. It features OTP-based mobile authentication, a live market ticker with TradingView integration, course management across skill levels (Basic to Algo Trading), and an admin dashboard for lead and payment management.

## Recent Changes

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
- **State Management**: TanStack React Query for server state, React Context for auth/theme
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
| `/live-market` | Real-time market data |
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

### Alpha Vantage API (Real-time Data)
- `GET /api/alphavantage/quote/:symbol` - Get real-time quote from Alpha Vantage
- `GET /api/alphavantage/intraday/:symbol` - Get intraday chart data (5min intervals)
- `GET /api/alphavantage/search` - Search stocks via Alpha Vantage API
- `GET /api/alphavantage/status` - Check API configuration status

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `ALPHAVANTAGE_API_KEY` - Alpha Vantage API key for real-time stock data

## Development Notes

- OTP is logged to console in development (integrate SMS provider for production)
- Market data uses Alpha Vantage API when configured, with Yahoo Finance fallback
- Payment screenshots stored as base64 in database
- Admin access requires `isAdmin: true` flag on user record
