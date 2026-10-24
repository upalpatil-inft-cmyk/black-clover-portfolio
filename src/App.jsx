import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Clover, Github, Sparkles, Code2, ExternalLink, Upload, X, WandSparkles, ShieldCheck, Trophy } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import GrimoireLoader from './components/GrimoireLoader.jsx';
import { useTheme } from './hooks/useTheme.js';

const projects = [
  {
    number: '01', title: 'Campus Connect', category: 'Full-stack platform', type: 'FLAGSHIP MISSION',
    description: 'A campus-focused platform designed to bring student and faculty academic workflows into one place.',
    tags: ['React', 'Spring Boot', 'MySQL'],
    live: 'https://campus-connect-umber-eight.vercel.app/', github: 'https://github.com/upalpatil-inft-cmyk/CampusConnect',
    kind: 'campus-screenshot', image: '/images/campus-connect-login.png', alt: 'Genuine Campus Connect sign-in screen for Atharva University'
  },
  {
    number: '02', title: 'Pet Store', category: 'E-commerce storefront', type: 'COMMERCE MISSION',
    description: 'A friendly storefront concept for browsing pet products, built around a playful visual identity.',
    tags: ['HTML', 'CSS', 'Responsive UI'], live: 'https://pet-store-kappa-umber.vercel.app/',
    github: 'https://github.com/upalpatil-inft-cmyk/pet-store', image: '/images/pet-store-logo.png', kind: 'logo', alt: 'Pet Store project logo asset'
  },
  {
    number: '03', title: 'Stayora', category: 'Hotel booking experience', type: 'TRAVEL MISSION',
    description: 'A hotel-booking interface focused on browsing stays and moving through a clear booking journey.',
    tags: ['React', 'UI Design', 'Booking Flow'], live: 'https://stayora-hotel-booking-jade.vercel.app/',
    github: 'https://github.com/upalpatil-inft-cmyk/stayora-hotel-booking', image: '/images/stayora-home.png', kind: 'photo', alt: 'Stayora hotel booking website screenshot'
  },
  {
    number: '04', title: 'Noira', category: 'Skincare storefront', type: 'BRAND MISSION',
    description: 'A minimal skincare storefront with a premium product-led look and a calm editorial aesthetic.',
    tags: ['HTML', 'CSS', 'E-commerce UI'], live: 'https://noira-skincare.vercel.app/',
    github: 'https://github.com/upalpatil-inft-cmyk/noira-skincare', image: '/images/noira-hero.jpg', kind: 'photo', alt: 'Noira skincare storefront hero asset'
  },
];

function ProjectVisual({ project }) {
  return <div className={`project-image-frame ${project.kind === 'logo' ? 'logo-frame' : ''} ${project.kind === 'campus-screenshot' ? 'campus-screenshot-frame' : ''}`}><img src={project.image} alt={project.alt} loading="lazy" /></div>;
}

function ProfilePhoto() {
  const inputRef = useRef(null);
  const [photo, setPhoto] = useState(() => {
    try { return localStorage.getItem('upal-grimoire-profile-photo') || ''; } catch { return ''; }
  });
  const [message, setMessage] = useState('');

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setMessage('Please choose an image file.'); return; }
    if (file.size > 8 * 1024 * 1024) { setMessage('Choose an image under 8 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 640;
        const scale = Math.min(1, size / Math.max(image.width, image.height));
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
        const optimized = canvas.toDataURL('image/jpeg', 0.84);
        try { localStorage.setItem('upal-grimoire-profile-photo', optimized); } catch { /* Still display the image for this session. */ }
        setPhoto(optimized);
        setMessage('Profile image updated on this browser.');
      };
      image.onerror = () => setMessage('That image could not be opened. Try another one.');
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };
  const removePhoto = () => {
    setPhoto(''); setMessage('');
    try { localStorage.removeItem('upal-grimoire-profile-photo'); } catch { /* Ignore unavailable storage. */ }
  };

  return <div className="profile-visual">
    <div className="profile-orbit profile-orbit-a" /><div className="profile-orbit profile-orbit-b" />
    <div className="profile-photo-shell">{photo ? <img src={photo} alt="Your uploaded profile" /> : <div className="profile-placeholder"><Clover size={56} strokeWidth={1.1} /><span>YOUR PORTRAIT</span><small>UPLOAD TO PERSONALIZE</small></div>}</div>
    <button className="photo-upload" onClick={() => inputRef.current?.click()}><Upload size={15} /> {photo ? 'CHANGE PHOTO' : 'UPLOAD PHOTO'}</button>
    {photo && <button className="photo-remove" onClick={removePhoto} aria-label="Remove profile photo"><X size={14} /></button>}
    <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} hidden />
    <p className="photo-status" aria-live="polite">{message || 'Your image stays in this browser.'}</p>
  </div>;
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) { node.classList.add('is-visible'); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('is-visible'); observer.unobserve(node); }
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const achievements = [
  { number: '01', title: 'Built Campus Connect', date: '2025 / FULL-STACK', description: 'Turned a real campus workflow into one connected experience for students and faculty.', image: '' },
  { number: '02', title: 'Found a visual voice', date: '2025 / INTERFACE CRAFT', description: 'Explored storefronts, booking flows, and the details that make a product feel considered.', image: '' },
  { number: '03', title: 'Kept shipping', date: '2026 / MOMENTUM', description: 'Four launches later, curiosity is still the most useful tool in the spellbook.', image: '' },
  { number: '04', title: 'Your next milestone', date: 'OPEN / COLLABORATION', description: 'Add a photo, memory, certificate, or note here and make this archive yours.', image: '' },
];

function AchievementsArchive() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [photos, setPhotos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('upal-achievement-photos') || '{}'); } catch { return {}; }
  });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;
    const updatePosition = () => {
      if (window.innerWidth <= 760) {
        track.style.transform = '';
        return;
      }
      const distance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      track.style.transform = `translate3d(${-progress * (track.scrollWidth - window.innerWidth)}px, 0, 0)`;
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  const uploadPhoto = (event, number) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 8 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => {
      const nextPhotos = { ...photos, [number]: String(reader.result) };
      setPhotos(nextPhotos);
      try { localStorage.setItem('upal-achievement-photos', JSON.stringify(nextPhotos)); } catch { /* Keep the upload visible for this session. */ }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return <section className="achievements-section" id="contribute" ref={sectionRef}>
    <div className="achievements-sticky">
      <div className="section-wrap achievements-intro"><Reveal><div className="section-heading"><div><span className="section-index">04 — ACHIEVEMENT ARCHIVE</span><h2>Scroll through the <span>milestones.</span></h2></div><p>A living record of things built,<br />learned, and worth remembering.</p></div></Reveal><span className="horizontal-hint"><ArrowDownRight size={15} /> KEEP SCROLLING TO EXPLORE</span></div>
      <div className="achievements-track" ref={trackRef}>
        {achievements.map(item => {
          const image = photos[item.number] || item.image;
          return <article className="achievement-card" key={item.number}>
            <div className="achievement-photo">{image ? <img src={image} alt="" loading="lazy" /> : <div className="achievement-empty"><Trophy size={42} /><span>YOUR PHOTO</span></div>}<span className="achievement-number">{item.number}</span><label className="achievement-upload"><Upload size={14} /> {image && photos[item.number] ? 'CHANGE PHOTO' : 'ADD PHOTO'}<input type="file" accept="image/*" onChange={event => uploadPhoto(event, item.number)} /></label></div>
            <div className="achievement-copy"><span className="achievement-date">{item.date}</span><h3>{item.title}</h3><p>{item.description}</p></div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState('All');
  const [artifactOpen, setArtifactOpen] = useState(false);
  const [skillTracker, setSkillTracker] = useState({ x: 50, y: 50, active: false });
  const [showGrimoire, setShowGrimoire] = useState(true);
  const completeGrimoire = useCallback(() => {
    setShowGrimoire(false);
  }, []);
  const filters = ['All', 'Full-stack', 'E-commerce', 'Web UI'];
  const trackedSkills = ['REACT', 'JAVASCRIPT', 'UI / UX', 'SPRING BOOT', 'MYSQL'];
  const skillIndex = Math.min(trackedSkills.length - 1, Math.floor((skillTracker.x / 100) * trackedSkills.length));
  const trackedSkill = trackedSkills[skillIndex];
  const trackSkill = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setSkillTracker({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
      active: true,
    });
  };
  const visibleProjects = projects.filter(project => filter === 'All' ||
    (filter === 'Full-stack' && project.number === '01') ||
    (filter === 'E-commerce' && ['02', '04'].includes(project.number)) ||
    (filter === 'Web UI' && ['03'].includes(project.number)));

  return <>{showGrimoire && <GrimoireLoader onComplete={completeGrimoire} />}<div aria-hidden={showGrimoire} className={`app-shell ${showGrimoire ? '' : 'intro-ready'}`}>
    <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <Navbar theme={theme} toggleTheme={toggleTheme} />
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy hero-enter">
          <div className="eyebrow"><span className="status-dot" /> OPEN TO COLLABORATION <span className="eyebrow-line" /></div>
          <p className="hero-kicker">THE CLOVER KINGDOM / DEVELOPER FILE</p>
          <h1>NO MAGIC?<br /><span>NO PROBLEM.</span></h1>
          <p className="hero-description">I’m <strong>Upal Patil</strong> — a developer building useful digital experiences with curiosity, code, and a little anti-magic energy.</p>
          <div className="hero-actions"><a className="button button-primary" href="#missions">Explore my work <ArrowUpRight size={17} /></a><a className="button button-quiet" href="#about">Get to know me <ArrowDownRight size={17} /></a></div>
          <div className="hero-meta"><span><span className="meta-symbol">✳</span> BUILDING WITH PURPOSE</span><span className="meta-divider" /><span>INDIA <span className="meta-muted">/ IST</span></span></div>
        </div>
        <div className={`anime-hero-stage hero-enter ${artifactOpen ? 'artifact-is-open' : ''}`} aria-label="Interactive grimoire artifact">
          <div className="anime-panel-top"><span>GRIMOIRE ARCHIVE / DEVELOPER FILE</span><span>REF. 001 — ANTI-MAGIC</span></div>
          <button className="anime-artwork-wrap" type="button" onClick={() => setArtifactOpen(open => !open)} onPointerMove={trackSkill} onPointerEnter={trackSkill} onPointerLeave={() => setSkillTracker(tracker => ({ ...tracker, active: false }))} aria-expanded={artifactOpen} aria-controls="grimoire-inspection" aria-label={artifactOpen ? 'Close grimoire inspection' : 'Inspect the grimoire'}>
            <img className="anime-artwork" src="/images/grimoire-artifact.webp" alt="Original dark parchment grimoire illustration with a five-leaf clover seal" loading="eager" />
            <div className="anime-artwork-shade" />
            <span className={`skill-tracker ${skillTracker.active ? 'is-active' : ''}`} style={{ '--tracker-x': `${skillTracker.x}%`, '--tracker-y': `${skillTracker.y}%` }} aria-hidden="true">
              <span className="skill-tracker-blob" />
              <span className="skill-tracker-label"><i>SKILL DETECTED</i><strong>{trackedSkill}</strong></span>
            </span>
            <div className="anime-vertical-stamp">五葉 <span>FIVE LEAVES</span></div>
            <div className="anime-artwork-title"><span>THE DEVELOPER FILE / 005</span><strong>GRIMOIRE.</strong><small>NO MAGIC. NO LIMITS.</small></div>
            <span className="anime-artwork-mark">♣</span>
            <span className="artifact-inspect-prompt">{artifactOpen ? 'CLOSE FILE −' : 'INSPECT GRIMOIRE +'}</span>
            <span className="artifact-sigil" aria-hidden="true">✳</span>
          </button>
          <div className="artifact-inspection" id="grimoire-inspection" aria-hidden={!artifactOpen}>
            <div className="artifact-inspection-head"><span>SEALED PAGE / 005</span><span>STATUS: <b>ACTIVE</b></span></div>
            <p className="artifact-inspection-title">THE SPELL INDEX</p>
            <div className="artifact-spells"><span><i>01</i> BUILD WITH PURPOSE</span><span><i>02</i> LEARN BY BUILDING</span><span><i>03</i> NEVER STOP ITERATING</span></div>
            <a href="#missions" onClick={() => setArtifactOpen(false)}>VIEW COMPLETED MISSIONS <ArrowUpRight size={14} /></a>
          </div>
          <div className="anime-panel-bottom"><span>{artifactOpen ? 'SEALED PAGE OPENED' : 'ORIGINAL GRIMOIRE ARTIFACT'}</span><button type="button" onClick={() => setArtifactOpen(open => !open)} aria-expanded={artifactOpen}>{artifactOpen ? 'CLOSE FILE −' : 'OPEN THE GRIMOIRE ↗'}</button></div>
        </div>
        <a href="#about" className="scroll-cue"><span className="scroll-cue-line" /> SCROLL TO UNLOCK</a><div className="hero-side-label">DESIGN / CODE / CURIOSITY</div>
      </section>

      <section className="intro-strip" id="about"><div className="section-wrap intro-inner"><span className="section-index">01 — THE MAGE</span><p>Not born with every answer.<br /><em>Built by learning, one spell at a time.</em></p><a href="#attributes" aria-label="Continue to attributes"><ArrowDownRight size={22} /></a></div></section>

      <section className="about-section section-wrap">
        <Reveal className="about-copy"><span className="section-index">A LITTLE ABOUT THE MAGE</span><h2>Curiosity is my<br /><span>strongest spell.</span></h2><p>I enjoy turning ideas into interfaces people can actually use. I’m learning by building — from campus tools to storefronts and booking experiences — and getting better with every iteration.</p><div className="about-points"><span><ShieldCheck size={16} /> Learn by building</span><span><Code2 size={16} /> Code with intention</span><span><WandSparkles size={16} /> Keep experimenting</span></div><a className="text-link" href="https://github.com/upalpatil-inft-cmyk" target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight size={16} /></a></Reveal>
        <Reveal className="about-photo"><ProfilePhoto /></Reveal>
      </section>

      <section className="coming-section section-wrap" id="attributes"><Reveal><div className="section-heading"><div><span className="section-index">02 — MAGIC ATTRIBUTES</span><h2>My kind of <span>magic.</span></h2></div><p>Tools are the spellbook.<br />What you make is the magic.</p></div></Reveal>
        <div className="attribute-grid"><Reveal><article className="attribute-card"><span className="attribute-number">A / 01</span><div className="attribute-icon"><Code2 size={23} /></div><h3>Engineering</h3><p>Turning ideas into reliable, working experiences.</p><span className="attribute-tag">LOGIC · STRUCTURE</span></article></Reveal><Reveal><article className="attribute-card"><span className="attribute-number">B / 02</span><div className="attribute-icon">✳</div><h3>Interface craft</h3><p>Building interfaces that feel clear, considered, and alive.</p><span className="attribute-tag">DESIGN · DETAIL</span></article></Reveal><Reveal><article className="attribute-card"><span className="attribute-number">C / 03</span><div className="attribute-icon"><Sparkles size={23} /></div><h3>Curiosity</h3><p>Learning fast, experimenting often, improving every build.</p><span className="attribute-tag">GROWTH · ITERATION</span></article></Reveal></div>
      </section>

      <section className="missions-section" id="missions"><div className="section-wrap missions-inner"><Reveal><div className="section-heading"><div><span className="section-index">03 — MISSION ARCHIVE</span><h2>Proof over <span>promises.</span></h2></div><p>Four builds. Different challenges.<br />One more spell learned each time.</p></div></Reveal>
        <div className="project-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
        <div className="project-grid">{visibleProjects.map(project => <Reveal key={project.number} className={`project-card-wrap ${project.number === '01' ? 'project-featured-wrap' : ''}`}><article className={`project-card ${project.number === '01' ? 'project-featured' : ''}`}>
          <div className="project-visual"><ProjectVisual project={project} /><span className="project-index">MISSION / {project.number}</span>{project.number === '01' && <><span className="featured-label"><Clover size={12} /> FLAGSHIP MISSION</span><span className="featured-orbit featured-orbit-one"/><span className="featured-orbit featured-orbit-two"/></>}</div>
          <div className="project-body">{project.number === '01' && <div className="featured-overline"><span className="featured-pulse"/> PRIORITY MISSION <span>•</span> CAMPUS SYSTEMS</div>}<div className="project-type">{project.type}</div><div className="project-title-row"><h3>{project.title}</h3><span className="project-category">{project.category}</span></div><p>{project.description}</p>{project.number === '01' && <div className="featured-points"><span><Clover size={14}/> Student-focused workflows</span><span><Clover size={14}/> Faculty-facing academic tools</span><span><Clover size={14}/> One connected campus experience</span></div>}<div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a className="project-live-link" href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Launch live demo <ArrowUpRight size={14}/></a><a href={project.github} target="_blank" rel="noreferrer"><Github size={15} /> Source code</a></div></div>
        </article></Reveal>)}</div>
      </div></section>

      <AchievementsArchive />

      <section className="contact-section section-wrap" id="contact"><Reveal><span className="section-index">05 — OPEN A PORTAL</span><h2>Got a good<br /><span>mission in mind?</span></h2><p>Let's build something worth opening a grimoire for.</p><a className="button button-primary" href="https://github.com/upalpatil-inft-cmyk" target="_blank" rel="noreferrer">Connect on GitHub <ArrowUpRight size={17} /></a></Reveal><div className="contact-foot"><span>UPAL PATIL © 2026</span><span>MADE WITH INTENTION <Clover size={13} /></span><a href="https://github.com/upalpatil-inft-cmyk" target="_blank" rel="noreferrer"><Github size={14} /> GITHUB</a></div></section>
    </main>
  </div></>;
}
