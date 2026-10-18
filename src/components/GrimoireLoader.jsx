import React, { useCallback, useEffect, useRef, useState } from 'react';
import './GrimoireLoader.css';

const stages = [
  { leaves: 3, progress: 0, label: 'THE GRIMOIRE STIRS', detail: 'A spark before the spell.' },
  { leaves: 4, progress: 50, label: 'MAGIC AWAKENS', detail: 'The fourth leaf finds its place.' },
  { leaves: 5, progress: 100, label: 'ANTI-MAGIC RELEASED', detail: 'The uncommon path begins.' },
];

function CloverSeal({ leaves }) {
  const rotations = Array.from({ length: leaves }, (_, index) => (360 / leaves) * index - 90);

  return (
    <svg className={`grimoire-loader__seal grimoire-loader__seal--${leaves}`} viewBox="0 0 120 120" role="img" aria-label={`${leaves}-leaf clover seal`}>
      <circle className="grimoire-loader__seal-ring" cx="60" cy="60" r="52" />
      <circle className="grimoire-loader__seal-ring grimoire-loader__seal-ring--inner" cx="60" cy="60" r="43" />
      {rotations.map((rotation, index) => (
        <g key={`${leaves}-${index}`} transform={`rotate(${rotation} 60 60)`}>
          <ellipse
            className="grimoire-loader__petal"
            cx="60"
            cy="35"
            rx="15.5"
            ry="24"
            pathLength="100"
            style={{ '--leaf-index': index }}
          />
        </g>
      ))}
      <circle className="grimoire-loader__seal-core" cx="60" cy="60" r="3.5" />
      <path className="grimoire-loader__stem" d="M60 62 C65 75 60 89 55 101" />
      <path className="grimoire-loader__seal-tick" d="M60 4v7 M60 109v7 M4 60h7 M109 60h7" />
    </svg>
  );
}

export default function GrimoireLoader({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timersRef = useRef([]);
  const skipButtonRef = useRef(null);
  const hasFinishedRef = useRef(false);

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const schedule = (callback, delay) => {
      const timer = window.setTimeout(callback, delay);
      timersRef.current.push(timer);
    };

    // The sequence is deliberately short: a reveal, not a fake wait for data.
    schedule(() => setStage(1), reducedMotion ? 120 : 850);
    schedule(() => setStage(2), reducedMotion ? 240 : 1650);
    schedule(() => setLeaving(true), reducedMotion ? 430 : 2250);
    schedule(finish, reducedMotion ? 500 : 2800);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    skipButtonRef.current?.focus({ preventScroll: true });

    return () => {
      timersRef.current.forEach(window.clearTimeout);
      timersRef.current = [];
      document.body.style.overflow = previousOverflow;
    };
  }, [finish]);

  const skipIntro = () => {
    if (hasFinishedRef.current) return;
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
    setLeaving(true);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(finish, reducedMotion ? 0 : 360);
    timersRef.current.push(timer);
  };

  const current = stages[stage];

  return (
    <div className={`grimoire-loader ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="grimoire-loading-title" onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); skipIntro(); } else if (event.key === 'Tab') { event.preventDefault(); skipButtonRef.current?.focus(); } }}>
      <div className="grimoire-loader__mist" aria-hidden="true" />
      <header className="grimoire-loader__minimal-head">
        <span>UPAL PATIL</span>
        <span>GRIMOIRE / 005</span>
      </header>
      <main className="grimoire-loader__center" aria-label="Grimoire opening sequence">
        <div className="grimoire-loader__rings" aria-hidden="true">
          <span className="grimoire-loader__ring grimoire-loader__ring--outer" />
          <span className="grimoire-loader__ring grimoire-loader__ring--middle" />
          <span className="grimoire-loader__ring grimoire-loader__ring--inner" />
          <span className="grimoire-loader__constellation" />
        </div>
        <div className="grimoire-loader__seal-wrap" key={current.leaves}>
          <CloverSeal leaves={current.leaves} />
          <span className="grimoire-loader__seal-orbit" aria-hidden="true" />
        </div>
        <div className="grimoire-loader__status">
          <span id="grimoire-loading-title">{current.label}</span>
          <strong>{String(current.progress).padStart(3, '0')}</strong>
        </div>
        <div className="grimoire-loader__sr-status" role="status">{current.detail}</div>
      </main>
      <footer className="grimoire-loader__minimal-foot">
        <span>THE CLOVER KINGDOM / DEVELOPER FILE</span>
        <button ref={skipButtonRef} type="button" onClick={skipIntro}>SKIP INTRO <span aria-hidden="true">↗</span></button>
      </footer>
    </div>
  );
}
