/**
 * Design System Tokens
 * ─────────────────────
 * Single source of truth for all visual design decisions.
 * Dark Brown / Black theme with teal accent used sparingly.
 */

// ── Color Palette ──────────────────────────────────────────────────────
export const colors = {
  /** Base backgrounds — layered from deepest to surface */
  bg: {
    base: '#0f0c09',       // deepest background
    elevated: '#1a1410',   // card / section background
    surface: '#241c16',    // hover / active / input background
    overlay: '#2e241c',    // modal / dropdown overlay
  },

  /** Text hierarchy */
  text: {
    primary: '#ffffff',
    secondary: '#f5f3f0',
    muted: '#a8a29e',      // stone-400 equivalent — captions, meta
    faint: '#78716c',      // stone-500 — disabled, placeholder
  },

  /** Accent — teal, used sparingly for headings, CTAs, focus states */
  accent: {
    DEFAULT: '#5eead4',    // teal-300 — primary accent
    dim: '#2dd4bf',        // teal-400 — hover/active
    dark: '#0d9488',       // teal-600 — subtle indicators
    glow: 'rgba(94, 234, 212, 0.15)', // glow overlays
  },

  /** Borders */
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    DEFAULT: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
    accent: 'rgba(94, 234, 212, 0.3)',
  },

  /** Semantic */
  semantic: {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
  },
} as const;

// ── Typography Scale ───────────────────────────────────────────────────
export const typography = {
  fontFamily: {
    display: 'var(--font-geist-sans), system-ui, sans-serif',
    body: 'var(--font-geist-sans), system-ui, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
  },
  fontSize: {
    'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
    'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '800' }],
    'display': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
    'heading-lg': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
    'heading': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
    'heading-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
    'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
    'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
    'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
    'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],
  },
} as const;

// ── Spacing Scale ──────────────────────────────────────────────────────
export const spacing = {
  section: {
    y: 'py-20 md:py-28',         // vertical section padding
    x: 'px-5 md:px-8 lg:px-12',  // horizontal section padding
  },
  container: 'max-w-6xl mx-auto w-full',
} as const;

// ── Border Radius ──────────────────────────────────────────────────────
export const radius = {
  sm: '0.375rem',    // 6px
  DEFAULT: '0.75rem', // 12px
  lg: '1rem',        // 16px
  xl: '1.5rem',      // 24px
  full: '9999px',
} as const;

// ── Shadows / Elevation ────────────────────────────────────────────────
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  DEFAULT: '0 4px 12px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
  glow: '0 0 40px rgba(94, 234, 212, 0.08)',
  'glow-strong': '0 0 60px rgba(94, 234, 212, 0.15)',
} as const;

// ── Z-index Scale ──────────────────────────────────────────────────────
export const zIndex = {
  base: 0,
  above: 10,
  nav: 50,
  modal: 100,
  cursor: 200,
  loader: 9999,
} as const;

// ── Transition Presets ─────────────────────────────────────────────────
export const transitions = {
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  DEFAULT: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/** CSS custom properties string for injection into :root */
export function getThemeCSSVariables(): string {
  return `
    --color-bg-base: ${colors.bg.base};
    --color-bg-elevated: ${colors.bg.elevated};
    --color-bg-surface: ${colors.bg.surface};
    --color-bg-overlay: ${colors.bg.overlay};
    --color-text-primary: ${colors.text.primary};
    --color-text-secondary: ${colors.text.secondary};
    --color-text-muted: ${colors.text.muted};
    --color-text-faint: ${colors.text.faint};
    --color-accent: ${colors.accent.DEFAULT};
    --color-accent-dim: ${colors.accent.dim};
    --color-accent-dark: ${colors.accent.dark};
    --color-accent-glow: ${colors.accent.glow};
    --color-border-subtle: ${colors.border.subtle};
    --color-border: ${colors.border.DEFAULT};
    --color-border-strong: ${colors.border.strong};
    --color-border-accent: ${colors.border.accent};
    --radius-sm: ${radius.sm};
    --radius: ${radius.DEFAULT};
    --radius-lg: ${radius.lg};
    --radius-xl: ${radius.xl};
    --shadow-sm: ${shadows.sm};
    --shadow: ${shadows.DEFAULT};
    --shadow-lg: ${shadows.lg};
    --shadow-glow: ${shadows.glow};
  `;
}
