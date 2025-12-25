# Rotech Shiksha - Design Guidelines

## Design Philosophy
**Zerodha Varsity Inspired**: Clean, minimal, education-focused UI with white backgrounds, calm colors, smooth micro-interactions, and premium feel.

## Core Principles
1. **Clean & Minimal**: White backgrounds, generous whitespace, no clutter
2. **Education-Focused**: Content-first design, easy readability
3. **Micro-Interactions**: Subtle hover effects, smooth transitions, motion feedback
4. **Card-Based Navigation**: Varsity-style clickable category cards
5. **No Background Video**: Clean static design with animated elements

## Color Palette

### Primary Colors
- **Background**: Pure white (#FFFFFF)
- **Surface/Cards**: White with soft tints
- **Primary Accent**: Blue (#2563EB / primary)
- **Secondary Accent**: Emerald (#10B981) - growth, success

### Category Card Colors
- **Modules (Blue)**: bg-blue-50, icon bg-blue-100
- **Live Market (Emerald)**: bg-emerald-50, icon bg-emerald-100
- **Videos (Purple)**: bg-purple-50, icon bg-purple-100
- **Calculators (Amber)**: bg-amber-50, icon bg-amber-100
- **Certified (Rose)**: bg-rose-50, icon bg-rose-100

### Text Colors
- **Primary Text**: Dark charcoal (foreground)
- **Secondary Text**: Gray (muted-foreground)
- **Links/CTAs**: Primary blue

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif

### Font Sizes
- **H1 (Hero)**: 3rem-3.75rem (48-60px), font-weight: 700
- **H2 (Section)**: 2rem (32px), font-weight: 600
- **H3 (Card Title)**: 1.25rem (20px), font-weight: 700
- **Body**: 1rem (16px), line-height: 1.7
- **Small**: 0.875rem (14px)

## Animation System (Varsity-style)

### Micro-Interactions
All animations should be subtle and purposeful:
- **Hover on Cards**: Lift up (-8px), slight scale (1.02)
- **Click/Tap**: Scale down (0.98)
- **Page Transitions**: Slide + fade (300-500ms)
- **Icon Hover**: Gentle wiggle or pulse

### Transition Timings
- **Fast**: 150-200ms (buttons, small elements)
- **Standard**: 300ms (cards, content)
- **Slow**: 500ms (page transitions, large sections)

### Framer Motion Defaults
```tsx
// Fade in up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Card hover
whileHover={{ y: -8, scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

## Card System (Varsity-style)

### Category Cards
- Background: Soft color tint (blue-50, emerald-50, etc.)
- Border-radius: 16px (rounded-2xl)
- Padding: 24-32px
- Hover: Lift + border appears + "Explore →" reveals
- Icon: Rounded background with matching color

### Standard Content Cards
- Background: white
- Border: very subtle (border-gray-100)
- Border-radius: 16px
- Shadow: none or very subtle
- Hover: subtle lift if interactive

## Layout System

### Container
- Max-width: 1280px (max-w-7xl)
- Padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)

### Hero Section
- Clean background (no video)
- Centered text alignment
- Stats/badges with icons
- 5-column category card grid below

### Section Spacing
- Between sections: py-16 to py-24
- Section title margin: mb-8 to mb-12
- Card grid gap: gap-4 to gap-6

## Navigation Categories (Varsity-style)

The home page features 5 main clickable categories:
1. **Modules** - Structured learning paths (→ /courses)
2. **Live Market** - Real-time data & IPOs (→ /ipo)
3. **Videos** - Tutorial content (→ /courses)
4. **Calculators** - Financial tools (→ /calculators)
5. **Certified** - Certification courses (→ /courses)

Each category has:
- Distinct color theme
- Icon with colored background
- Title + description
- Hover animation (lift + reveal)
- Click animation (press)

## Page Consistency

All pages must follow:
- Same animation timing and style
- Same card border-radius (rounded-2xl)
- Same spacing system
- Same color palette
- Same typography scale
- Consistent micro-interactions

## Accessibility

- All interactive elements need data-testid
- Hover states should not rely solely on color
- Focus states visible for keyboard navigation
- Animations respect reduced-motion preferences
