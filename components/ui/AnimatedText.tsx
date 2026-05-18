'use client'

import { motion, Variants } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  variant?: 'slideUp' | 'fadeIn' | 'stagger'
  className?: string
  delay?: number
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
}

const wordVariants: Record<string, Variants> = {
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  stagger: {
    hidden: { opacity: 0, y: 20, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
}

export default function AnimatedText({
  text,
  variant = 'slideUp',
  className = '',
  delay = 0,
  as: Tag = 'span',
}: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={delay}
      className={`overflow-hidden ${className}`}
    >
      <Tag className="flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants[variant]}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
