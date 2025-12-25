# Rotech Shiksha - Design Guidelines

## Design Philosophy
**Smallcase.com Inspired**: Premium fintech UI with clean white backgrounds, soft pastel accents, flat cartoon illustrations, and a modern, trustworthy appearance.

## Core Principles
1. **Premium & Clean**: White backgrounds, generous whitespace, calm aesthetic
2. **Card-Based Sections**: Content organized in rounded cards with subtle shadows
3. **Flat Illustrations**: Smallcase-style friendly cartoon characters (finance-themed)
4. **Soft Colors**: Pastel accents, not harsh or saturated
5. **Smooth Animations**: Subtle entrance effects, no distracting motion

## Color Palette

### Primary Colors
- **Background**: Pure white (#FFFFFF)
- **Surface/Cards**: White with soft shadow
- **Primary Accent**: Teal/Blue (#2F363F for dark text, #4A90D9 for CTAs)
- **Secondary Accent**: Soft green (#3DB589) - growth, success

### Pastel Accents (for illustrations & highlights)
- **Soft Blue**: #E8F4FD / #B8D9F8
- **Soft Green**: #E6F7F0 / #9ED8C0
- **Soft Purple**: #F3E8FF / #D4B8F8
- **Soft Yellow**: #FFF8E1 / #FFE082
- **Soft Pink**: #FCE4EC / #F8BBD9

### Text Colors
- **Primary Text**: Dark charcoal (#1A1A2E)
- **Secondary Text**: Gray (#6B7280)
- **Muted Text**: Light gray (#9CA3AF)

### Semantic Colors
- **Success**: #10B981 (emerald)
- **Warning**: #F59E0B (amber)
- **Error**: #EF4444 (red)
- **Info**: #3B82F6 (blue)

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif

### Font Sizes
- **H1 (Hero)**: 3rem (48px), font-weight: 700
- **H2 (Section)**: 2rem (32px), font-weight: 600
- **H3 (Card Title)**: 1.25rem (20px), font-weight: 600
- **Body**: 1rem (16px), line-height: 1.7
- **Small**: 0.875rem (14px)

## Card System

### Standard Card (Smallcase-style)
- Background: white
- Border: very subtle (1px border-gray-100/50)
- Border-radius: 16px (rounded-2xl)
- Shadow: soft ambient shadow
- Padding: 24-32px
- Hover: subtle lift effect

### Card Layout
- Section-based with illustrations beside text
- Rounded corners on all elements
- Generous internal spacing

## Video Hero Section (Onepeloton-style)

### Structure
- Full-width background video
- Dark gradient overlay for readability
- Auto-play, muted, looping
- Mobile: fallback image

### Overlay Content
- Centered or left-aligned text
- Bold headline: "Building a financially aware and confident India"
- CTA buttons over video
- Brand logo visible

## Illustrations Style (Smallcase-inspired)

### Character Guidelines
- Flat, minimal 2D vector style
- Friendly, approachable characters
- Finance/education themed (graphs, coins, charts)
- Soft pastel color palette
- No heavy outlines, smooth shapes

### Placement
- Hero sections
- Feature cards
- Empty states
- CTAs

## Animation Guidelines

### Allowed Effects
- Fade-in on scroll (300ms)
- Subtle slide-up (translate-y)
- Gentle hover lift on cards
- Light idle motion on illustrations (optional)

### Timing
- Fast: 150ms (buttons)
- Standard: 300ms (cards, sections)
- Slow: 500ms (page transitions)

## Layout System

### Container
- Max-width: 1280px (max-w-7xl)
- Padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)

### Section Spacing
- Between sections: py-20 to py-24
- Section title margin: mb-12

### Grid
- 2-4 columns depending on content
- Gap: gap-6 to gap-8

## Page Consistency

All pages (Home, Education, Calculators, IPO) must:
- Use same illustration style
- Same card system
- Same color palette
- Same typography
- Same animation timing
