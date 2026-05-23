import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * ScrollReveal — React Bits AnimatedContent component
 * Wraps children with a scroll-triggered reveal animation.
 */
const ScrollReveal = ({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  stagger = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    rotateIn: {
      hidden: { opacity: 0, rotateX: -20, y: 30 },
      visible: { opacity: 1, rotateX: 0, y: 0 },
    },
    none: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const chosen = animations[animation] || animations.fadeUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={chosen}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: stagger,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
