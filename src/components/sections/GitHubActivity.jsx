import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function GitHubActivity() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="github" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">
            Open Source Footprint
          </h2>
          <div className="h-1 w-20 bg-accent-cyan rounded-full mb-10"></div>
          <p className="text-slate-400 max-w-2xl text-lg mb-12">
            A live overview of my contributions, development patterns, and language ecosystem on GitHub.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={inView ? { opacity: 1, scale: 1 } : {}}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="w-full max-w-6xl mx-auto relative group flex flex-col gap-8"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan/20 to-accent-blue/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            
            {/* Top Row: Overall Stats & Languages */}
            <div className="relative p-8 md:p-10 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass flex flex-col md:flex-row gap-8 items-center justify-center shadow-xl">
                
                {/* Main Stats */}
                <div className="w-full md:w-1/2 flex justify-center hover:-translate-y-2 transition-transform duration-300">
                   <a href="https://github.com/rush1618" target="_blank" rel="noreferrer" className="w-full max-w-md bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                     <img 
                        src="https://github-readme-stats.vercel.app/api?username=rush1618&theme=transparent&hide_border=true&title_color=00ffcc&text_color=cbd5e1&icon_color=00ffcc&show_icons=true" 
                        alt="GitHub Stats" 
                        className="w-full object-contain" 
                     />
                   </a>
                </div>

                {/* Top Languages */}
                <div className="w-full md:w-1/2 flex justify-center hover:-translate-y-2 transition-transform duration-300">
                   <a href="https://github.com/rush1618" target="_blank" rel="noreferrer" className="w-full max-w-md bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                     <img 
                        src="https://github-readme-stats.vercel.app/api/top-langs/?username=rush1618&theme=transparent&hide_border=true&title_color=00ffcc&text_color=cbd5e1&layout=compact" 
                        alt="Top Languages" 
                        className="w-full object-contain" 
                     />
                   </a>
                </div>
            </div>

            {/* Bottom Row: Activity Lines & Streaks */}
            <div className="relative p-8 md:p-10 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass flex flex-col lg:flex-row gap-8 items-center justify-center shadow-xl">
                
                {/* Streak Stats */}
                <div className="w-full lg:w-5/12 flex justify-center hover:-translate-y-2 transition-transform duration-300">
                   <a href="https://github.com/rush1618" target="_blank" rel="noreferrer" className="w-full bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                     <img 
                        src="https://github-readme-streak-stats.herokuapp.com/?user=rush1618&theme=transparent&hide_border=true&title_color=00ffcc&text=cbd5e1&icon=00ffcc&background=transparent&ring=00ffcc&fire=00ffcc" 
                        alt="GitHub Streak" 
                        loading="lazy"
                        className="w-full object-contain max-h-48" 
                     />
                   </a>
                </div>

                {/* Contribution Activity Graph */}
                <div className="w-full lg:w-7/12 flex justify-center hover:-translate-y-2 transition-transform duration-300">
                   <a href="https://github.com/rush1618" target="_blank" rel="noreferrer" className="w-full bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                     <img 
                        src="https://github-readme-activity-graph.vercel.app/graph?username=rush1618&bg_color=transparent&color=00ffcc&line=00ffcc&point=ffffff&area=true&hide_border=true" 
                        alt="Activity Graph" 
                        loading="lazy"
                        className="w-full object-contain" 
                     />
                   </a>
                 </div>

            </div>

            {/* Third Row: 365-Day Contribution Calendar */}
            <div className="relative p-8 md:p-10 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass flex flex-col items-center justify-center shadow-xl">
                <h3 className="text-xl font-syne font-bold mb-6 text-white w-full text-center">Day-Wise 365 Contribution Matrix</h3>
                <div className="w-full overflow-x-auto overflow-y-hidden flex justify-center hover:-translate-y-2 transition-transform duration-300">
                   <a href="https://github.com/rush1618" target="_blank" rel="noreferrer" className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex items-center justify-center min-w-max">
                     {/* The ghchart.rshah.org service generates a live 2D contribution graph colored by the hex code passed */}
                     <img 
                        src="https://ghchart.rshah.org/00ffcc/rush1618" 
                        alt="365 Days GitHub Activity Calendar" 
                        className="object-contain filter drop-shadow-[0_0_8px_rgba(0,255,204,0.3)] opacity-90" 
                     />
                   </a>
                 </div>
            </div>

        </motion.div>
      </div>
    </section>
  );
}
