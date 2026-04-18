import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, FileText, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

import projectsData from '../../data/projects.json';
import Modal from '../ui/Modal';
import { useGitHubReadme } from '../../hooks/useGitHubReadme';

import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

function ProjectReadme({ repoUrl }) {
  const { content, loading, error } = useGitHubReadme(repoUrl);
  
  if (loading) {
    return <div className="flex items-center justify-center p-20 text-accent-cyan"><Loader2 className="animate-spin" size={32} /></div>;
  }
  
  return (
    <div className="prose prose-invert prose-cyan max-w-none 
                    prose-headings:font-syne prose-headings:font-bold prose-headings:text-white
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-strong:text-accent-cyan prose-code:text-accent-blue prose-border-slate-800
                    prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-800
                    prose-a:text-accent-cyan hover:prose-a:text-white prose-img:rounded-xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function Projects({ preview = false }) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState(null);

  const displayProjects = preview ? projectsData.slice(0, 3) : projectsData;

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-bg-primary min-h-screen">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-accent-cyan rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`flex flex-col bg-bg-glass backdrop-blur-xl border border-border-glass rounded-2xl overflow-hidden group hover:border-accent-cyan transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,212,255,0.15)] ${project.featured ? 'md:col-span-2 lg:col-span-1 border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' : ''}`}
            >
              {/* Card Header Pattern/Gradient instead of Thumbnail for now */}
              <div className="h-40 w-full bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiM2NFREQ0IiLz48L3N2Zz4=')]"></div>
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-bg-primary/80 text-accent-cyan text-xs font-mono font-bold rounded-full border border-accent-cyan/30">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-syne font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {project.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">
                  {project.longDesc || project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-800">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex flex-1 items-center justify-center gap-2 px-4 py-2 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan hover:text-bg-primary rounded-lg font-medium transition-colors border border-accent-cyan/50"
                  >
                    <FileText size={18} />
                    <span>README</span>
                  </button>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-400 rounded-lg transition-colors"
                    title="Source Code"
                  >
                    <Github size={20} />
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 border border-slate-700 text-slate-300 hover:text-accent-cyan hover:border-accent-cyan rounded-lg transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {preview && (
          <div className="mt-16 flex justify-center">
            <Link 
              to="/projects"
              className="group flex items-center gap-3 px-8 py-4 bg-bg-glass backdrop-blur-xl border border-slate-700 hover:border-accent-cyan rounded-full text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
            >
              <span>Explore Full Archive</span>
              <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </Link>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name || 'Project Details'}
      >
        {selectedProject && <ProjectReadme repoUrl={selectedProject.github} />}
      </Modal>
    </section>
  );
}
