export const theme = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  colors: {
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      blue: '#3b82f6',
      purple: '#8b5cf6',
      amber: '#f59e0b',
      coral: '#f97316',
    },
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
  },
  
  glassmorphism: {
    light: 'bg-white/70 backdrop-blur-xl border border-white/20',
    dark: 'dark:bg-slate-900/70 dark:backdrop-blur-xl dark:border-slate-700/30',
    navbar: 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 dark:bg-slate-900/80 dark:border-slate-700/40',
    bottomNav: 'bg-white/85 backdrop-blur-2xl border-t border-slate-200/40 dark:bg-slate-900/85 dark:border-slate-700/30',
    card: 'bg-white/60 backdrop-blur-lg border border-slate-200/30 dark:bg-slate-800/60 dark:border-slate-700/30',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  layout: {
    maxWidth: 'max-w-6xl',
    containerPadding: 'px-4 sm:px-6 lg:px-8',
    sectionPadding: 'py-12 md:py-16',
    heroPadding: 'pt-8 pb-12 md:pt-12 md:pb-16',
  },
} as const;

export const animations = {
  pageTransition: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
  
  cardHover: {
    whileHover: { 
      y: -2, 
      boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.08)',
      transition: { duration: 0.2 } 
    },
    whileTap: { scale: 0.995 },
  },
  
  buttonPress: {
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
  
  stagger: {
    container: {
      animate: { transition: { staggerChildren: 0.05 } },
    },
    item: {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
    },
  },
} as const;

export const containerClass = `${theme.layout.maxWidth} mx-auto ${theme.layout.containerPadding}`;
export const sectionClass = `${theme.layout.sectionPadding}`;
export const heroClass = `${theme.layout.heroPadding}`;

export type Theme = typeof theme;
export type Animations = typeof animations;
