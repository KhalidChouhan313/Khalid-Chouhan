/**
 * Shared Animation Variants & Constants
 * ──────────────────────────────────────
 * Typed Framer Motion variants used across the entire site.
 * Import these instead of defining inline animation objects.
 */

import type { Variants, Transition } from 'framer-motion';

// ── Easing Curves ──────────────────────────────────────────────────────
export const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
} as const;

// ── Shared Transitions ─────────────────────────────────────────────────
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: easings.smooth,
};

// ── Section / Element Reveal ───────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.smooth,
    },
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.smooth },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.smooth },
  },
};

// ── Stagger Containers ─────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ── Character / Word Reveal ────────────────────────────────────────────
export const letterReveal: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
};

export const wordReveal: Variants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(4px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
};

// ── Card Interactions ──────────────────────────────────────────────────
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: easings.smooth },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: easings.smooth },
  },
};

// ── Chat Bubble ────────────────────────────────────────────────────────
export const chatBubble: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: easings.snappy,
    },
  },
};

// ── Page / Route Transitions ───────────────────────────────────────────
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
    },
  },
};

// ── Utility: Viewport animation props ──────────────────────────────────
export const viewportOnce = {
  once: true,
  amount: 0.2,
} as const;

export const viewportRepeat = {
  once: false,
  amount: 0.15,
} as const;
