# Rotech Shiksha - Design Guidelines

## Design Approach
**Hybrid System**: Material Design principles + Modern Indian Fintech aesthetics (Zerodha Varsity + Groww simplicity)
- Professional, trustworthy interface for financial education
- Clear information hierarchy for complex content
- Data-dense layouts optimized for learning

## Core Design Elements

### Typography
- **Primary Font**: Inter (via Google Fonts) - clean, readable for educational content
- **Headings**: 
  - H1: 2.5rem (40px), font-weight: 700
  - H2: 2rem (32px), font-weight: 600
  - H3: 1.5rem (24px), font-weight: 600
- **Body**: 1rem (16px), font-weight: 400, line-height: 1.6
- **Small/Meta**: 0.875rem (14px), font-weight: 500

### Layout System
**Tailwind Spacing Units**: Consistently use 2, 4, 6, 8, 12, 16, 20 for spacing
- **Container**: max-w-7xl with px-4 on mobile, px-8 on desktop
- **Section Padding**: py-12 mobile, py-20 desktop
- **Card Spacing**: p-6 internal padding, gap-6 between cards
- **Grid Gaps**: gap-4 for tight layouts, gap-6 for standard, gap-8 for spacious

### Component Library

**Live Market Ticker (Top Bar)**
- Fixed top position, full-width
- Height: h-12, scrolling animation
- Stock cards with price + change indicator (up/down arrows)
- Sticky across all pages

**Navigation**
- Transparent header with backdrop blur
- Mobile: Hamburger menu
- Desktop: Horizontal nav with dropdown for course sections
- CTA: "Login with Mobile" button (prominent)

**Hero Section**
- NO large hero image - instead: Split layout
- Left (60%): Headline + subtext + CTA
- Right (40%): Animated chart/graph illustration OR TradingView mini widget
- Height: 80vh desktop, auto mobile

**Course Structure Cards**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Cards with:
  - Icon/number badge at top
  - Title
  - 4-5 bullet points
  - "View Content" link
- Hover: subtle lift effect (shadow increase)

**OTP Popup Modal**
- Centered overlay with backdrop blur
- Two-step form design:
  - Step 1: Contact form (compact, single column)
  - Step 2: OTP input (large digit boxes, 4 or 6 digits)
- Progress indicator at top
- Clean, minimal design with focus on form fields

**Calculator Widgets**
- Card-based layout with shadow
- Input fields on left, results on right (desktop)
- Stacked on mobile
- Live calculation display
- "Locked" state overlay before OTP verification

**Payment Plans**
- 3-column grid (desktop), stacked (mobile)
- Card design with:
  - Plan name at top
  - Large price display
  - Feature list with checkmarks
  - CTA button at bottom
- Highlight ₹999 plan (scale slightly larger, border accent)

**User Dashboard**
- Sidebar navigation (desktop), bottom tabs (mobile)
- Sections: Profile, My Learning, Resources, Payments
- Card-based content display
- Progress indicators for courses

**Live Chat Button**
- Fixed bottom-right position
- Circular button with chat icon
- Notification badge for unread
- Chat window: 400px wide, 600px tall (desktop)

### Spacing & Rhythm
- Consistent 8px base grid
- Section breaks: mb-20 between major sections
- Card internal spacing: p-6
- Form field spacing: space-y-4

### Interactive Elements
**Buttons**
- Primary: Solid fill, rounded-lg, px-6 py-3
- Secondary: Outline style
- Text buttons: Underline on hover
- States: Clear hover (brightness/shadow), active (scale-95)

**Inputs**
- Border style with focus ring
- Rounded-lg corners
- Height: h-12
- Padding: px-4

**Links**
- Underline on hover for text links
- Arrow indicators for external/action links

### Animations
**Minimal Approach** - Use sparingly:
- Live ticker: smooth horizontal scroll
- Card hover: subtle lift (translate-y)
- Modal: fade in with scale
- Transitions: 200-300ms duration

## Images

**Hero Section**: Small chart/graph illustration or animated market visualization (right side, ~400x400px) - NOT a large background image

**Course Icons**: Simple line icons for each course section level (Basic/Intermediate/Advanced/Algo)

**Trust Indicators**: Small logos/badges if partnerships exist (footer area)

**NO large hero background image** - keep focus on clean, data-driven interface

## Mobile Optimization
- Stack all multi-column layouts to single column
- Sticky live ticker remains at top
- Bottom navigation for dashboard
- Touch-friendly button sizes (min 44px height)
- Simplified forms with larger inputs

## Critical UX Patterns
- **Gated Content**: Clear visual indicators (lock icons) before OTP
- **Trust Signals**: Disclaimers visible, "100% Free" messaging prominent
- **Progress Indicators**: For multi-step forms and course completion
- **Loading States**: For live data and OTP verification
- **Error States**: Clear error messages for form validation