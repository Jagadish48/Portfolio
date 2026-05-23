import { useState } from 'react';

/**
 * GlitchText — React Bits component
 * Cyberpunk RGB-split glitch effect on hover or continuous.
 */
const GlitchText = ({
  children,
  className = '',
  enableOnHover = false,
  speed = 'medium',
  enableShadows = true,
  color1 = '#6366f1',
  color2 = '#22d3ee',
}) => {
  const speeds = { slow: '8s', medium: '4s', fast: '2s' };
  const duration = speeds[speed] || speeds.medium;
  const [isHovered, setIsHovered] = useState(false);

  const shouldAnimate = enableOnHover ? isHovered : true;

  return (
    <span
      className={`glitch-text ${className}`}
      data-text={typeof children === 'string' ? children : ''}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes glitch-anim {
          0% { clip-path: inset(50% 0 50% 0); transform: translate(-4px, -2px); }
          10% { clip-path: inset(30% 0 60% 0); transform: translate(4px, 2px); }
          20% { clip-path: inset(70% 0 10% 0); transform: translate(-4px, 3px); }
          30% { clip-path: inset(10% 0 80% 0); transform: translate(3px, -2px); }
          40% { clip-path: inset(80% 0 5% 0); transform: translate(-3px, 2px); }
          50% { clip-path: inset(40% 0 40% 0); transform: translate(4px, -3px); }
          60% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 2px); }
          70% { clip-path: inset(20% 0 70% 0); transform: translate(3px, -1px); }
          80% { clip-path: inset(90% 0 2% 0); transform: translate(-4px, 3px); }
          90% { clip-path: inset(5% 0 85% 0); transform: translate(4px, -2px); }
          100% { clip-path: inset(50% 0 50% 0); transform: translate(-4px, 2px); }
        }
        @keyframes glitch-anim2 {
          0% { clip-path: inset(20% 0 60% 0); transform: translate(4px, 2px); }
          15% { clip-path: inset(70% 0 15% 0); transform: translate(-3px, -2px); }
          30% { clip-path: inset(5% 0 85% 0); transform: translate(4px, 3px); }
          45% { clip-path: inset(55% 0 30% 0); transform: translate(-4px, -1px); }
          60% { clip-path: inset(85% 0 5% 0); transform: translate(3px, 2px); }
          75% { clip-path: inset(35% 0 50% 0); transform: translate(-3px, -3px); }
          90% { clip-path: inset(65% 0 25% 0); transform: translate(4px, 1px); }
          100% { clip-path: inset(20% 0 60% 0); transform: translate(4px, 2px); }
        }
        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          color: ${color1};
          opacity: ${shouldAnimate ? 0.8 : 0};
          animation: ${shouldAnimate ? `glitch-anim ${duration} infinite` : 'none'};
          text-shadow: ${enableShadows ? `-2px 0 ${color1}` : 'none'};
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          color: ${color2};
          opacity: ${shouldAnimate ? 0.8 : 0};
          animation: ${shouldAnimate ? `glitch-anim2 ${duration} infinite` : 'none'};
          text-shadow: ${enableShadows ? `2px 0 ${color2}` : 'none'};
          pointer-events: none;
          transition: opacity 0.3s;
        }
      `}</style>
      {children}
    </span>
  );
};

export default GlitchText;
