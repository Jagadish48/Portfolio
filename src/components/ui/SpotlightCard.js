import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * SpotlightCard — React Bits component
 * A card with a radial spotlight glow that follows the mouse cursor.
 */
const SpotlightCard = ({
  children,
  className = '',
  style = {},
  spotlightColor = 'rgba(99, 102, 241, 0.15)',
  borderColor = 'rgba(255,255,255,0.08)',
  glowColor = 'rgba(99, 102, 241, 0.35)',
}) => {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? glowColor : borderColor}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${glowColor}`
          : '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Spotlight radial */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
      }} />
      {/* Edge glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        background: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 65%)`,
        filter: 'blur(4px)',
      }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
