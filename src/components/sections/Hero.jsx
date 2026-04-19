import { motion } from 'framer-motion';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, FileText, ChevronDown } from 'lucide-react';

const Hero = memo(() => {
  return (
    <>
      <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* 3D Background is global — rendered in App.jsx */}
        
        {/* Content */}
        <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-evoxsy text-6xl md:text-8xl lg:text-[10rem] tracking-tight text-white mb-4 
                          drop-shadow-[0_0_25px_rgba(0,212,255,0.4)]">
              RUSHABH SINGH
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="font-evoxsy text-2xl md:text-3xl lg:text-4xl text-slate-300 mb-8 max-w-3xl font-light">
               CS Student <span className="text-accent-cyan mx-3">•</span> Full-Stack Dev <span className="text-accent-cyan mx-3">•</span> AI Builder
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-4"
          >
            <Link to="/projects" className="px-8 py-3 bg-accent-cyan/10 border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-bg-primary font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] backdrop-blur-sm">
              View Projects
            </Link>
            
            <a href="https://github.com/Rush1618" target="_blank" rel="noreferrer" className="p-3 bg-bg-glass border border-slate-700 hover:border-accent-cyan text-white rounded-lg transition-colors hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]">
              <Github size={24} />
            </a>
            
            <a href="https://linkedin.com/in/rushabh-singh-22b23a2bb" target="_blank" rel="noreferrer" className="p-3 bg-bg-glass border border-slate-700 hover:border-accent-blue text-white rounded-lg transition-colors hover:shadow-[0_0_15px_rgba(0,102,255,0.3)]">
              <Linkedin size={24} />
            </a>
            
            <a href="/assets/resume.pdf" target="_blank" rel="noreferrer" className="p-3 bg-bg-glass border border-slate-700 hover:border-accent-gold text-white rounded-lg transition-colors hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] group flex items-center gap-2">
              <FileText size={24} />
              <span className="hidden sm:inline-block pr-2 font-medium text-sm group-hover:text-accent-gold transition-colors">Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 z-10 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={32} className="opacity-60" />
        </motion.div>
      </section>
    </>
  );
});

export default Hero;
