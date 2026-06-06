import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.997 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 90, damping: 14 },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 160, damping: 20 },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28, skewX: 2 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { type: 'spring', stiffness: 100, damping: 16 },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28, skewX: -2 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { type: 'spring', stiffness: 100, damping: 16 },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
}

export const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

export const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2 },
  },
}

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.04,
    y: -4,
    transition: { type: 'spring', stiffness: 300, damping: 22 },
  },
}

export const defaultViewport = { once: true, margin: '-80px' as const }
