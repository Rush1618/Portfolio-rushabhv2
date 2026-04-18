import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const stats = [
  { label: 'Verified Certificates', value: 94, suffix: '+' },
  { label: 'Achievements', value: 12, suffix: '+' },
  { label: 'Projects Built', value: 4, suffix: '+' },
];

const interests = ['AI Safety', 'Competitive Coding', 'Full-Stack Web', 'Open Source'];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">
            About Me
          </h2>
          <div className="h-1 w-20 bg-accent-cyan rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Bio Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="p-8 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass shadow-lg">
              <p className="text-slate-300 leading-relaxed text-lg mb-6">
                I'm a 2nd-year Computer Science student passionate about building high-impact tech solutions. From developing privacy-first AI safety ecosystems like <span className="text-accent-cyan font-bold">Shield Her</span> to scalable full-stack platforms like <span className="text-accent-cyan font-bold">FoodConnect Bharat</span>, I thrive on solving complex, real-world problems.
              </p>
              <p className="text-slate-300 leading-relaxed text-lg mb-8">
                My approach combines strong engineering fundamentals with a deep focus on user experience and safety. When I'm not coding, you can find me competing in national-level hackathons or researching next-generation applied AI.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 text-sm font-medium text-slate-200"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 w-full grid grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass hover:border-accent-cyan transition-colors flex flex-col items-center justify-center text-center group"
              >
                <div className="text-4xl md:text-5xl font-syne font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {inView ? (
                    <CountUp 
                      end={stat.value} 
                      duration={2.5} 
                      decimals={stat.decimals || 0}
                    />
                  ) : '0'}
                  {stat.suffix}
                </div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
