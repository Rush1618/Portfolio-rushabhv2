import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LETTERS = 'RUSHABH SINGH'.split('');

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [lettersDone, setLettersDone] = useState(false);

  useEffect(() => {
    // Fake progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 12;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLettersDone(true), LETTERS.length * 60 + 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center gap-12">
      {/* Name reveal */}
      <div className="flex gap-[0.1em] overflow-hidden" aria-label="Rushabh Singh">
        {LETTERS.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`font-evoxsy text-3xl md:text-5xl text-white tracking-widest ${char === ' ' ? 'w-4' : ''}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: lettersDone ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs tracking-[0.3em] text-accent-cyan uppercase"
      >
        Initializing Experience
      </motion.p>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-[2px] bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}
