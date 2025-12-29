# Fintech Education Platform - Smallcase-Inspired Design Guidelines

## Design Philosophy
**Smallcase Inspired**: Premium fintech aesthetic with soft gradients, pastel colors, flat cartoon illustrations, and smooth micro-interactions throughout.

## Core Principles
1. **Clean & Modern**: Soft gradients, ample whitespace, premium feel
2. **Animated Experience**: Micro-interactions on every touchpoint
3. **Cartoon Illustrations**: Flat, friendly finance-themed characters with idle animations
4. **Card-Based Layout**: Rounded cards with subtle shadows and hover effects
5. **Smooth Transitions**: No jarring movements, everything flows naturally

## Color Palette

### Primary Colors (Smallcase-Inspired)
- **Background**: White (#FFFFFF) with soft gradient accents
- **Surface/Cards**: White with soft shadows
- **Primary Accent**: Soft blue (#4A90E2) - trustworthy, premium
- **Secondary Accent**: Coral/Salmon (#FF7B7B) - friendly, approachable
- **Tertiary Accent**: Soft teal (#4ECDC4) - growth, success

### Soft Pastel Gradients
- **Hero Gradient**: From warm beige (#FDF6F0) to soft peach (#FFEEE4)
- **Section Gradient 1**: From light blue (#F0F9FF) to white
- **Section Gradient 2**: From soft mint (#F0FDF9) to white
- **Accent Gradient**: From blue (#4A90E2) to teal (#4ECDC4)

### Text Colors
- **Primary Text**: Dark slate (#1E293B)
- **Secondary Text**: Slate gray (#64748B)
- **Muted Text**: Light gray (#94A3B8)

### Character Color Palette
- **Skin Tones**: Warm beige (#F5D0C5), (#E8B4A0)
- **Hair Colors**: Dark brown (#4A3728), Black (#1A1A2E)
- **Clothing**: Blue (#4A90E2), Coral (#FF7B7B), Teal (#4ECDC4), Purple (#9B8CD7)
- **Accents**: Gold (#FFD93D), Mint (#A8E6CF)

## Typography

### Font Family
- **Primary**: Inter (Google Fonts) - clean, highly readable
- **Fallback**: system-ui, sans-serif

### Font Sizes
- **H1 (Hero Title)**: 3rem (48px), font-weight: 700
- **H2 (Section Title)**: 2rem (32px), font-weight: 600
- **H3 (Card Title)**: 1.25rem (20px), font-weight: 600
- **Body**: 1rem (16px), font-weight: 400, line-height: 1.7
- **Small**: 0.875rem (14px)

## Animation System

### Micro-Interactions
1. **Hover Effects**:
   - Scale: transform scale(1.02) to scale(1.05)
   - Shadow: Increase shadow depth on hover
   - Glow: Subtle color glow for buttons
   
2. **Click Effects**:
   - Scale down briefly: scale(0.98)
   - Smooth spring animation

3. **Scroll Animations**:
   - Fade in from bottom: opacity 0 → 1, translateY(20px) → 0
   - Stagger children: 0.1s delay between items
   - Once: Animations trigger once, not on scroll back

### Character Animations
1. **Floating**: Gentle up-down motion (3s loop)
2. **Idle Sway**: Subtle side-to-side movement
3. **Breathing**: Very subtle scale pulse
4. **Waving**: Hand wave animation for greetings

### Timing Functions
- **Fast**: 150ms (hover states)
- **Standard**: 300ms (most transitions)
- **Slow**: 500ms (page transitions)
- **Ease**: cubic-bezier(0.4, 0, 0.2, 1)

## Component Styles

### Cards
- Background: white
- Border-radius: 16px (rounded-2xl)
- Shadow: 0 4px 20px rgba(0,0,0,0.08)
- Hover Shadow: 0 8px 30px rgba(0,0,0,0.12)
- Padding: 24px
- Transition: all 300ms ease

### Buttons
- **Primary**: bg-gradient-to-r from-blue to-teal, text-white
- **Secondary**: bg-white border-2 border-primary
- **Ghost**: transparent with hover bg
- Border-radius: 12px (rounded-xl)
- Padding: 16px 32px
- Hover: scale(1.02), shadow increase

### Hero Section
- Background: Warm gradient (beige to peach)
- Layout: 60% content, 40% illustration
- Illustration: Animated cartoon scene
- CTA: Prominent gradient button

### Navigation
- Background: white/glass-morphism
- Shadow: subtle bottom shadow
- Height: 72px
- Logo: left, nav: center, actions: right

## Illustration Style Guide

### Character Design
- **Style**: Flat 2D vector, no gradients on characters
- **Proportions**: Slightly exaggerated, friendly
- **Expressions**: Warm, approachable smiles
- **Poses**: Dynamic, engaged in finance activities

### Scene Elements
- Buildings/Cityscape: Soft geometric shapes
- Charts/Graphs: Stylized, colorful
- Coins/Money: Gold with shine effects
- Plants/Nature: Soft mint green accents

### Placement
- Hero: Full scene with multiple characters
- Cards: Single character or icon
- Sections: Scattered decorative elements

## Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## Consistent Section Spacing
- **Section Padding**: py-16 md:py-24 (standard sections)
- **Section Padding (Compact)**: py-12 md:py-16 (dense content)
- **Container Max-Width**: max-w-6xl mx-auto px-4 (full width)
- **Content Max-Width**: max-w-4xl mx-auto px-4 (reading)
- **Card Padding**: p-5 md:p-6 (standard cards)
- **Gap Between Cards**: gap-4 md:gap-6 (card grids)

## Performance Guidelines
- Use SVG for all illustrations (scalable, small file size)
- Lazy load below-fold content
- Use CSS animations over JS when possible
- Debounce scroll event handlers
- Preload critical assets
