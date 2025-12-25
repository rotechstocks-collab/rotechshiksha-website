# Rotech Shiksha - Design Guidelines

## Design Philosophy
**Zerodha Varsity Inspired**: Clean, minimal, educational-first design with white-based layouts, cartoon illustrations, and card-based content organization.

## Core Principles
1. **Minimalist & Clean**: White backgrounds, ample whitespace, distraction-free
2. **Card-Based Layout**: All content organized in rounded, shadowed cards
3. **Educational Aesthetic**: Flat cartoon illustrations, soft colors
4. **Mobile-First**: Responsive design prioritizing mobile experience
5. **Fast Loading**: Lightweight assets, optimized performance

## Color Palette

### Primary Colors
- **Background**: Pure white (#FFFFFF) / Very light gray (#FAFBFC)
- **Surface/Cards**: White with subtle shadow
- **Primary Accent**: Soft blue (#387ED1) - educational, trustworthy
- **Secondary Accent**: Soft green (#10B981) - growth, success

### Text Colors
- **Primary Text**: Dark charcoal (#1F2937)
- **Secondary Text**: Medium gray (#6B7280)
- **Muted Text**: Light gray (#9CA3AF)

### Semantic Colors
- **Success**: Soft green (#10B981)
- **Warning**: Soft amber (#F59E0B)
- **Error**: Soft red (#EF4444)
- **Info**: Soft blue (#3B82F6)

### Accent Backgrounds (for cards/sections)
- **Blue tint**: #EFF6FF (very light blue)
- **Green tint**: #ECFDF5 (very light green)
- **Amber tint**: #FFFBEB (very light amber)
- **Gray tint**: #F9FAFB (very light gray)

## Typography

### Font Family
- **Primary**: Inter (Google Fonts) - clean, highly readable
- **Fallback**: system-ui, sans-serif

### Font Sizes
- **H1 (Page Title)**: 2.25rem (36px), font-weight: 700
- **H2 (Section Title)**: 1.75rem (28px), font-weight: 600
- **H3 (Card Title)**: 1.25rem (20px), font-weight: 600
- **H4 (Subsection)**: 1.125rem (18px), font-weight: 600
- **Body**: 1rem (16px), font-weight: 400, line-height: 1.7
- **Small**: 0.875rem (14px)
- **Caption**: 0.75rem (12px)

## Card System (Varsity-Style)

### Standard Card
```
- Background: white
- Border: none or very subtle (1px border-gray-100)
- Border-radius: 12px (rounded-xl)
- Shadow: subtle (shadow-sm) - 0 1px 3px rgba(0,0,0,0.1)
- Padding: 24px (p-6)
- Hover: slightly elevated shadow
```

### Card Variants
1. **Content Card**: Standard white card with title, description, optional icon
2. **Module Card**: Card with numbered badge, icon, title, bullet points
3. **Feature Card**: Icon + title + short description, center-aligned
4. **Stat Card**: Large number/value + label, minimal design

### Card Spacing
- Between cards: gap-6 (24px)
- Internal padding: p-6 (24px)
- Icon to title: mb-4 (16px)
- Title to description: mb-2 (8px)

## Layout System

### Container
- Max width: max-w-7xl (1280px)
- Padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)

### Section Spacing
- Between sections: py-16 (64px) mobile, py-20 (80px) desktop
- Section title margin: mb-12 (48px)

### Grid Layouts
- 2 columns: grid-cols-1 md:grid-cols-2
- 3 columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- 4 columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Gap: gap-6 (standard), gap-8 (spacious)

## Component Styles

### Navigation
- Background: white with subtle shadow
- Height: h-16 (64px)
- Logo: left-aligned
- Links: center or right
- Mobile: hamburger menu

### Hero Section
- Background: white or very light gradient
- Layout: Content left (60%), Illustration right (40%)
- Max-height: auto, content-driven
- Illustration: Flat cartoon style, finance-themed

### Buttons
- **Primary**: bg-primary text-white, rounded-lg, px-6 py-3
- **Secondary**: bg-secondary/10 text-secondary, rounded-lg
- **Outline**: border-2 border-primary text-primary
- **Ghost**: transparent, text-primary, hover:bg-primary/5
- Height: h-11 (44px) for touch-friendly
- No harsh shadows, soft hover transitions

### Form Inputs
- Background: white
- Border: 1px border-gray-200
- Border-radius: rounded-lg (8px)
- Height: h-12 (48px)
- Focus: ring-2 ring-primary/20 border-primary

### Badges
- Small, rounded-full
- Soft background colors with matching text
- Example: bg-blue-100 text-blue-700

## Illustrations & Icons

### Style Guidelines
- **Type**: Flat, 2D vector illustrations
- **Colors**: Soft, muted palette matching site colors
- **Theme**: Finance, education, growth
- **Characters**: Friendly, approachable cartoon people
- **Placement**: Near headings, in cards, hero sections

### Icon Usage
- Use Lucide React icons
- Size: w-5 h-5 (standard), w-6 h-6 (featured)
- Color: text-primary or text-muted-foreground
- Inside cards: w-10 h-10 with bg-primary/10 circle

## Animation Guidelines

### Principles
- Subtle and purposeful
- No distracting animations
- Enhance user experience

### Allowed Animations
- Card hover: translate-y-1, shadow increase
- Button hover: subtle brightness change
- Page transitions: fade-in (300ms)
- Loading states: gentle pulse or skeleton

### Timing
- Fast: 150ms (buttons, small elements)
- Standard: 300ms (cards, modals)
- Slow: 500ms (page transitions)

## Page-Specific Guidelines

### Home Page
- Hero with headline + illustration
- Module cards grid (4 columns on desktop)
- Features section with icon cards
- Testimonials (if any)
- CTA section

### Courses Page
- Category filters (tabs or buttons)
- Course module cards in grid
- Each card: icon, title, description, level badge
- Progress indicators for logged-in users

### Calculator Pages
- Calculator cards with input forms
- Live results display
- Clean, labeled inputs
- Mobile: stacked layout

### IPO Pages
- IPO listing with filter tabs
- IPO cards with key metrics
- Detail page with organized sections
- Timeline and subscription status

## Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## Accessibility
- Minimum touch target: 44x44px
- Color contrast: WCAG AA compliant
- Focus states: visible ring
- Alt text for all images
- Semantic HTML structure

## Performance
- Lazy load images below fold
- Use SVG for icons and illustrations
- Optimize images (WebP when possible)
- Minimize CSS/JS bundle size
