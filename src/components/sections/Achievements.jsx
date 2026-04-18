import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Star, Trophy, Award, Building2, Search } from 'lucide-react';
import achievementsData from '../../data/achievements.json';

// Helper for dynamic icon based on category
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'hackathon': return <Trophy size={20} />;
    case 'simulation': case 'case study': return <Building2 size={20} />;
    case 'coding': return <Search size={20} />;
    default: return <Award size={20} />;
  }
};

export default function Achievements({ preview = false }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const displayAchievements = preview ? achievementsData.slice(0, 3) : achievementsData;

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-bg-surface/50">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">
            Milestones & Honors
          </h2>
          <div className="h-1 w-20 bg-accent-gold rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAchievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass hover:border-accent-gold transition-all group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,215,0,0.15)] flex flex-col h-full"
            >
              {/* Top Row: Icon + Tier */}
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-slate-800/50 border border-slate-700 
                  ${achievement.tier === 'International' ? 'text-accent-gold border-accent-gold/50' : 
                    achievement.tier === 'National' ? 'text-accent-cyan border-accent-cyan/50' : 'text-accent-purple'}
                  shadow-inner`}
                >
                  {getCategoryIcon(achievement.category)}
                </div>
                
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border
                  ${achievement.tier === 'International' ? 'bg-accent-gold/10 text-accent-gold border-accent-gold/30' : 
                    achievement.tier === 'National' ? 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' : 
                    'bg-accent-purple/10 text-accent-purple border-accent-purple/30'}
                `}>
                  {achievement.tier}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-syne font-bold text-lg text-white mb-2 leading-tight group-hover:text-accent-gold transition-colors">
                {achievement.title}
              </h3>
              
              {achievement.issuer && (
                <p className="text-sm text-slate-400 font-medium mb-4 flex items-center gap-2">
                  <Building2 size={14} className="opacity-70"/>
                  {achievement.issuer}
                </p>
              )}

              {/* Bottom Row: Stars */}
              <div className="mt-auto pt-4 border-t border-slate-800/50 flex justify-between items-center">
                <div className="flex gap-1 text-accent-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < achievement.rating ? 'currentColor' : 'transparent'} 
                      className={i < achievement.rating ? 'text-accent-gold drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]' : 'text-slate-600'}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {achievement.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {preview && (
          <div className="mt-16 flex justify-center">
            <Link 
              to="/achievements"
              className="group flex items-center gap-3 px-8 py-4 bg-bg-glass backdrop-blur-xl border border-slate-700 hover:border-accent-gold rounded-full text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
            >
              <span>Explore All Milestones</span>
              <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
