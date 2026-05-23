import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * BlurText — React Bits component
 * Reveals text with a blur-in animation, word by word or character by character.
 */
const BlurText = ({
  text = '',
  delay = 80,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
  stepDuration = 0.4,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const animatedCount = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(12px)', opacity: 0, y: -20 }
      : { filter: 'blur(12px)', opacity: 0, y: 20 };

  const defaultTo = [
    { filter: 'blur(6px)', opacity: 0.5, y: direction === 'top' ? -10 : 10 },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ];

  const handleAnimationComplete = () => {
    animatedCount.current += 1;
    if (animatedCount.current === elements.length && onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-[0.3em] ${className}`} style={{ margin: 0, padding: 0 }}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={defaultFrom}
          animate={inView ? defaultTo[1] : defaultFrom}
          transition={{
            duration: stepDuration,
            delay: (index * delay) / 1000,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onAnimationComplete={handleAnimationComplete}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {segment}
          {animateBy === 'words' && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
