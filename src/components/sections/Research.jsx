import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Quote, FileText, Check } from 'lucide-react';
import { useState } from 'react';
import researchData from '../../data/research.json';

export default function Research({ preview = false }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [copied, setCopied] = useState(false);

  // If no research data is present, the component can just return null
  if (!researchData) return null;

  const copyCitation = () => {
    navigator.clipboard.writeText(researchData.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="research" className="py-24 relative overflow-hidden bg-bg-primary">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">
            Academic Research
          </h2>
          <div className="h-1 w-20 bg-accent-purple rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Metadata Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="p-8 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Quote size={120} />
              </div>
              
              <div className="relative z-10">
                <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple border border-accent-purple/30 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
                  {researchData.journal} • {researchData.publicationDate}
                </span>

                <h3 className="text-2xl md:text-3xl font-syne font-bold text-white mb-6 leading-tight">
                  {researchData.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed mb-8 text-sm md:text-base">
                  {researchData.abstract}
                </p>

                <div className="mb-8">
                  <h4 className="text-xs text-slate-500 font-mono uppercase mb-3 tracking-widest">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {researchData.keywords.map(kw => (
                      <span key={kw} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs text-slate-500 font-mono uppercase tracking-widest">Citation</h4>
                    <button 
                      onClick={copyCitation}
                      className="text-xs flex items-center gap-1 text-accent-purple hover:text-white transition-colors"
                    >
                      {copied ? <><Check size={14} /> Copied</> : <><FileText size={14} /> Copy</>}
                    </button>
                  </div>
                  <p className="text-sm text-slate-400 font-serif italic">
                    {researchData.citation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PDF Viewer Column - Hidden in Preview */}
          {!preview && (
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 w-full flex flex-col h-[600px] bg-slate-900 rounded-2xl border border-border-glass overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group relative"
            >
              <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <FileText size={14} /> IJCRT2604158.pdf
                </span>
                <a 
                  href={`/${researchData.paperUrl}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-400 hover:text-accent-cyan transition-colors"
                  title="Open PDF"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <div className="flex-1 w-full bg-slate-100">
                <iframe 
                  src={`/${researchData.paperUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-none"
                  title="Research Paper PDF"
                />
              </div>
            </motion.div>
          )}

        </div>

        {preview && (
          <div className="mt-12 flex justify-center">
            <Link 
              to="/research"
              className="group flex items-center gap-3 px-8 py-4 bg-bg-glass backdrop-blur-xl border border-slate-700 hover:border-accent-purple rounded-full text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <span>View Full Publication & Access PDF</span>
              <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
