import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * SplitText — React Bits component
 * Staggered character-by-character text reveal animation.
 */
const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 0.6,
  ease = 'easeOut',
  splitBy = 'chars',
  from = { opacity: 0, y: 40, rotateX: -90 },
  to = { opacity: 1, y: 0, rotateX: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
  textAlign = 'left',
  tag = 'span',
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

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

  const words = text.split(' ');

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'block',
        textAlign,
        perspective: '600px',
        overflow: 'hidden',
        padding: '0.1em 0',
      }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          {word.split('').map((char, ci) => {
            const index = words.slice(0, wi).join('').length + wi + ci;
            return (
              <motion.span
                key={ci}
                initial={from}
                animate={inView ? to : from}
                transition={{
                  duration,
                  delay: (index * delay) / 1000,
                  ease,
                }}
                onAnimationComplete={
                  wi === words.length - 1 && ci === word.length - 1 && onAnimationComplete
                    ? onAnimationComplete
                    : undefined
                }
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
