import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedCounter — React Bits CountUp component
 * Counts from 0 to a target value when scrolled into view.
 * Uses IntersectionObserver instead of framer-motion useInView.
 */
const AnimatedCounter = ({
  from = 0,
  to = 100,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  separator = ',',
}) => {
  const ref = useRef(null);
  const [count, setCount] = useState(from);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;
    const startValue = from;
    const endValue = to;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = easeOut(progress);
      const current = startValue + (endValue - startValue) * eased;
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [hasStarted, from, to, duration]);

  const formatNumber = (num) => {
    const fixed = num.toFixed(decimals);
    if (separator) {
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return parts.join('.');
    }
    return fixed;
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default AnimatedCounter;
