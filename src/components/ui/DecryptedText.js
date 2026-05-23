import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * DecryptedText — React Bits component
 * Matrix-style scramble/decrypt text reveal.
 */
const DecryptedText = ({
  text = '',
  className = '',
  speed = 50,
  maxIterations = 12,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?',
  onAnimationComplete,
  animateOn = 'view',
  parentClassName = '',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const iterationRef = useRef(0);

  const getNextIndex = useCallback(
    (revealedCount) => {
      if (revealDirection === 'start') return revealedCount;
      if (revealDirection === 'end') return text.length - 1 - revealedCount;
      if (revealDirection === 'center') {
        const mid = Math.floor(text.length / 2);
        const offset = Math.floor(revealedCount / 2);
        return revealedCount % 2 === 0 ? mid - offset : mid + offset + 1;
      }
      return revealedCount;
    },
    [text.length, revealDirection]
  );

  const animate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    iterationRef.current = 0;
    let revealedCount = 0;
    const revealedIndices = new Set();

    intervalRef.current = setInterval(() => {
      iterationRef.current++;
      if (iterationRef.current > maxIterations) {
        iterationRef.current = 0;
        revealedIndices.add(getNextIndex(revealedCount));
        revealedCount++;
      }

      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (revealedIndices.has(i)) return text[i];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (revealedCount >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setHasAnimated(true);
        if (onAnimationComplete) onAnimationComplete();
      }
    }, speed);
  }, [text, speed, maxIterations, characters, getNextIndex, onAnimationComplete]);

  useEffect(() => {
    if (animateOn !== 'view') return;
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animate();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animateOn, animate, hasAnimated]);

  useEffect(() => {
    if (animateOn !== 'hover') return;
    if (isHovered) animate();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, animateOn, animate]);

  return (
    <span
      ref={ref}
      className={parentClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={className}
        style={{ fontFamily: 'inherit', letterSpacing: '0.05em' }}
      >
        {displayText}
      </span>
    </span>
  );
};

export default DecryptedText;
