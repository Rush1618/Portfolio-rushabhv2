import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Image, ExternalLink } from 'lucide-react';
import certificatesData from '../../data/certificates.json';

const BATCH_SIZE = 12;

export default function Certificates({ preview = false }) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  
  const [activeTab, setActiveTab] = useState('All');
  const [visibleCount, setVisibleCount] = useState(preview ? 4 : BATCH_SIZE);

  // Filter & Paginate & Sort
  const filteredCerts = useMemo(() => {
    let list = activeTab === 'All' 
      ? certificatesData.certificates 
      : certificatesData.certificates.filter(c => c.category === activeTab);
    
    // Sort by Date descending, then ID descending
    return [...list].sort((a, b) => {
      const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || '0');
      const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || '0');
      if (yearB !== yearA) return yearB - yearA;
      return b.id - a.id;
    });
  }, [activeTab]);

  const visibleCerts = filteredCerts.slice(0, visibleCount);

  // Handlers
  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setVisibleCount(BATCH_SIZE); // reset pagination
  };

  const handleLoadMore = () => setVisibleCount(p => p + BATCH_SIZE);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">
            Certifications & Honors
          </h2>
          <div className="h-1 w-20 bg-accent-cyan rounded-full mb-10"></div>

          {/* Filter Tabs */}
          {!preview && (
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
              {certificatesData.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === cat 
                      ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50 shadow-[0_0_10px_rgba(0,212,255,0.2)]' 
                      : 'bg-bg-glass text-slate-400 border border-slate-800 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Certificate Card Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {visibleCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col bg-bg-glass border border-border-glass rounded-xl overflow-hidden group hover:border-accent-cyan/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all p-6"
              >
                <div className="flex items-start justify-between mb-5">
                   <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-accent-cyan shrink-0 border border-slate-700/50">
                      <FileText size={24} />
                   </div>
                   <span className="text-[10px] font-mono text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded border border-accent-cyan/20">
                      {cert.date}
                   </span>
                </div>

                <h3 className="font-syne font-bold text-white text-lg mb-2 leading-tight group-hover:text-accent-cyan transition-colors">{cert.name}</h3>
                <div className="text-sm font-mono text-slate-400 mb-8 flex-1">{cert.issuer}</div>

                <a 
                  href={cert.image}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-accent-cyan hover:text-bg-primary text-white text-sm font-bold rounded-lg transition-all border border-slate-700 hover:border-transparent"
                >
                  View Credential <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination & Routing */}
        {!preview && visibleCount < filteredCerts.length && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-xl border border-slate-700 bg-bg-glass text-white font-bold hover:border-accent-cyan hover:text-accent-cyan transition-colors"
            >
              Load More ({filteredCerts.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {preview && (
          <div className="mt-16 flex justify-center">
            <Link 
              to="/certificates"
              className="group flex items-center gap-3 px-8 py-4 bg-bg-glass backdrop-blur-xl border border-slate-700 hover:border-accent-cyan rounded-full text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
            >
              <span>Explore Full Gallery ({certificatesData.certificates.length} Total)</span>
              <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
