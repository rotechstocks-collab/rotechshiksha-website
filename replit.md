# Rotech Shiksha

## Overview

Rotech Shiksha is an educational platform for Indian retail investors, offering free and paid content like e-books, videos, and financial calculators. It supports OTP-based mobile authentication, features a live market ticker, manages courses across various skill levels (Basic to Algo Trading), and includes an admin dashboard for lead and payment management. The platform aims to empower investors with knowledge and tools for informed decision-making in the stock market.

## User Preferences

I prefer clear, concise explanations and a structured approach to development. I value iterative development with regular feedback. Please ask for confirmation before implementing significant changes or making major architectural decisions. Ensure code is well-documented and follows modern best practices. I want the agent to maintain the existing design aesthetic and color palette as defined by the UI/UX decisions, especially regarding the Zerodha-style glow animations and premium typography. Do not make changes to any files or folders without explicit instruction.

## System Architecture

### UI/UX Decisions
The platform features a premium design with a focus on responsive layouts, mobile-first optimization, and subtle animations. A centered content wrapper (`max-w-[1200px] mx-auto px-3 md:px-6`) ensures consistent presentation. Typography is scaled responsively, with heading sizes adjusting for different devices. Subtle, slow Zerodha-style glow animations (2-3.5s duration) enhance user engagement. Character components (Priya & Rohit) are integrated for interactive, storytelling-based learning in Hinglish, using various poses to convey emotions and context. Minimum 44px touch targets are enforced for accessibility, and safe-area support is included for notched mobile devices. Professional logo implementation is consistent across the site.

### Technical Implementations
- **Frontend**: React 18 with TypeScript, Wouter for routing, TanStack React Query for server state, React Context for global state (auth, theme, language). Styling is managed with Tailwind CSS and `shadcn/ui`. Vite is used for building. React.lazy is used for code splitting across routes (except Home) for faster initial loads. Error boundaries provide a friendly Hindi error UI.
- **Backend**: Express.js with TypeScript, using RESTful APIs under `/api/*`. `express-session` handles session management with a 30-day cookie expiry.
- **Database**: PostgreSQL with Drizzle ORM.
- **Authentication**: OTP-based mobile verification with a lead capture funnel. Security hardening includes mandatory `SESSION_SECRET`, `httpOnly`, `sameSite=strict`, and `secure` cookies in production, 30-day session expiry, and rate limiting (Auth: 5 req/15 min/IP; General API: 200 req/15 min/IP). Strict CORS policies and Helmet for security headers are implemented.
- **Internationalization**: Custom `LanguageContext` supports 13 languages (including 2 RTL languages: Arabic, Urdu) with JSON translation files and dynamic `hreflang` tags for SEO. Language preference is saved to `localStorage`.
- **Performance**: Lazy loading for images, static hero animations on mobile, reduced motion support, and `webkit-overflow-scrolling touch` for smooth mobile scrolling.

### Feature Specifications
- **Character System**: Interactive learning with mascot characters Priya (guide) and Rohit (learner) using `CharacterTip`, `CharacterChat`, `ComicModal`, and `HeroCharacterChat` components.
- **Loans & Credit Cards Module**: Comparison page for various financial products (Home Loan, Personal Loan, etc.) with 16 providers, an EMI calculator, and responsive UI with Framer Motion animations.
- **Advanced Economic Calendar**: Backend service using Finnhub API (with sample data fallback) providing real-time economic events, detailed modals, market impact analysis, and filtering capabilities. Includes 15-minute caching and auto-refresh.
- **IPO Tracking System**: Backend service with multi-tier fallback (ipoalerts.in → NSE → sample data) for real-time IPO data and news. Features listing pages with status tabs and detailed IPO pages. Uses React Query for frontend data fetching with auto-refetch.
- **Live News & Videos**: Integrates GNews API for financial news (English/Hindi) with category filtering and "In Focus" sections. Features embedded YouTube playlists from official financial channels (Reuters, Bloomberg, CNBC, ET Now, etc.) for global and Indian market videos. Includes 60-second auto-refresh for news.
- **Core Features**: PostgreSQL database with `users`, `leads`, `otps`, `payments`, `chatMessages` tables. 4-level course system (Basic, Intermediate, Advanced, Algo Trading). Trading calculators (SIP, Risk-Reward, Position Size, Brokerage). Payment flow with screenshot upload for plan purchases. Admin panel for lead, payment, and chat management. Live market ticker with simulated data.

### System Design Choices
The system is designed for scalability and maintainability, using a modular approach with clear separation of concerns between frontend and backend. Data caching and fallbacks are implemented for external API integrations to ensure robustness. The mobile-first design philosophy ensures optimal user experience across devices.

## External Dependencies

- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Real-time Stock Data**: Alpha Vantage API
- **Financial News**: GNews API
- **Economic Calendar Data**: Finnhub API
- **IPO Data**: ipoalerts.in, NSE (National Stock Exchange)
- **News Fallback**: MoneyControl
- **Video Content**: YouTube (embedded official channels like Reuters Business, Bloomberg Live, CNBC, ET Now, Zee Business, etc.)
- **Country Flags**: flagcdn.com