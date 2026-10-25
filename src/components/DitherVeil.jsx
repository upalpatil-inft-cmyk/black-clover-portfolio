import { useRef, useState } from 'react';

export default function DitherVeil({ src, alt }) {
  const frameRef = useRef(null);
  const [point, setPoint] = useState({ x: 50, y: 50, revealed: false });

  const revealAtPointer = (event) => {
    const frame = frameRef.current;
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setPoint({ x, y, revealed: true });
  };

  const handlePointerLeave = () => {
    setPoint(point => ({ ...point, revealed: false }));
  };

  return (
    <span
      ref={frameRef}
      className={`dither-veil ${point.revealed ? 'is-revealed' : ''}`}
      style={{ '--veil-x': `${point.x}%`, '--veil-y': `${point.y}%` }}
      onPointerMove={revealAtPointer}
      onPointerLeave={handlePointerLeave}
      onPointerDown={event => {
        if (event.pointerType === 'touch') setPoint({ x: 50, y: 50, revealed: true });
      }}
    >
      <img className="dither-veil__image dither-veil__image--ink" src={src} alt="" aria-hidden="true" />
      <img className="dither-veil__image dither-veil__image--color" src={src} alt={alt} />
      <span className="dither-veil__screen" aria-hidden="true" />
      <span className="dither-veil__hint" aria-hidden="true">UNCOVER THE PAGE</span>
    </span>
  );
}
