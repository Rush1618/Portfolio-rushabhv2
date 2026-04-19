import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const stats = [
  { label: 'Verified Certificates', value: 94, suffix: '+' },
  { label: 'Achievements', value: 12, suffix: '+' },
  { label: 'Projects Built', value: 4, suffix: '+' },
];

const interests = ['AI Safety', 'Competitive Coding', 'Full-Stack Web', 'Open Source'];

const timeline = [
  { year: '2023', text: 'Started B.Tech in Computer Science' },
  { year: '2024', text: 'Built CGPA Calculator · Got serious about open source' },
  { year: '2025', text: 'Built Shield Her & FoodConnect · Published IJCRT research · 94+ certificates' },
  { year: '2026', text: 'Seeking Summer SWE / AI Internships' },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">About Me</h2>
          <div className="h-1 w-20 bg-accent-cyan rounded-full" />
        </motion.div>

        {/* Bio + Stats row */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <div className="p-8 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass shadow-lg">
              <p className="text-slate-300 leading-relaxed text-lg mb-6">
                I'm a 2nd-year Computer Science student passionate about building high-impact tech solutions.
                From developing privacy-first AI safety ecosystems like{' '}
                <span className="text-accent-cyan font-bold">Shield Her</span> to scalable full-stack platforms like{' '}
                <span className="text-accent-cyan font-bold">FoodConnect Bharat</span>, I thrive on solving complex, real-world problems.
              </p>
              <p className="text-slate-300 leading-relaxed text-lg mb-8">
                My approach combines strong engineering fundamentals with a deep focus on user experience and safety.
                When I'm not coding, I'm competing in national-level hackathons or researching next-generation applied AI.
              </p>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 text-sm font-medium text-slate-200 hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 grid grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass hover:border-accent-cyan transition-colors flex flex-col items-center justify-center text-center group"
              >
                <div className="text-4xl md:text-5xl font-syne font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {inView ? <CountUp end={stat.value} duration={2.5} /> : '0'}
                  {stat.suffix}
                </div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-syne font-bold text-white mb-8">Journey</h3>
          <div className="relative border-l-2 border-border-glass pl-8 space-y-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + idx * 0.12 }}
                className="relative"
              >
                {/* Dot */}
                <span className="absolute -left-[2.7rem] top-1.5 w-4 h-4 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.6)] border-2 border-bg-primary" />
                <span className="text-xs font-mono text-accent-cyan tracking-widest uppercase">{item.year}</span>
                <p className="text-slate-300 mt-1">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
