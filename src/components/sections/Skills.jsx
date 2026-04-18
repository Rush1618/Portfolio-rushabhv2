import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import skillsData from '../../data/skills.json';

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState('All');
  
  // Extract unique category names
  const categories = ['All', ...skillsData.categories.map(c => c.name)];
  
  // Flatten all skills into a single array
  const allSkills = skillsData.categories.flatMap(cat => 
    cat.skills.map(skill => ({ ...skill, category: cat.name }))
  );
  
  // Filter skills
  const filteredSkills = activeTab === 'All' 
    ? allSkills 
    : allSkills.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-900/20 backdrop-blur-sm border-y border-border-glass/50">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">
            Technical Arsenal
          </h2>
          <div className="h-1 w-20 bg-accent-blue rounded-full mb-10"></div>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 bg-bg-glass p-2 rounded-xl backdrop-blur-xl border border-border-glass max-w-3xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === cat 
                    ? 'bg-accent-blue/20 text-accent-cyan border border-accent-blue/50 shadow-[0_0_10px_rgba(0,102,255,0.2)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-bg-glass border border-slate-800 hover:border-accent-blue rounded-xl p-5 flex flex-col items-center justify-center gap-3 group hover:-translate-y-1 transition-all hover:shadow-[0_8px_20px_rgba(0,102,255,0.15)]"
              >
                <div className="text-5xl md:text-6xl text-slate-400 group-hover:text-white transition-colors duration-300">
                  <i className={`devicon-${skill.icon}-plain`}></i>
                </div>
                <h3 className="font-syne font-bold text-lg text-slate-200 text-center mt-2">{skill.name}</h3>
                
                {/* Level Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full"
                  />
                </div>
                <span className="text-xs text-slate-400 font-mono tracking-wider items-end uppercase mt-1">
                  {skill.level}% Mastery
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
