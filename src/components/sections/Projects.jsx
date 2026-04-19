import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, FileText, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import projectsData from '../../data/projects.json';
import Modal from '../ui/Modal';
import { useGitHubReadme } from '../../hooks/useGitHubReadme';

// Tech tag color by type
const TAG_COLORS = {
  'React': 'text-cyan-400 border-cyan-800 bg-cyan-950/40',
  'React Native': 'text-cyan-400 border-cyan-800 bg-cyan-950/40',
  'Next.js': 'text-white border-slate-600 bg-slate-800/60',
  'Python': 'text-yellow-400 border-yellow-800 bg-yellow-950/40',
  'FastAPI': 'text-green-400 border-green-800 bg-green-950/40',
  'MongoDB': 'text-green-400 border-green-800 bg-green-950/40',
  'TensorFlow Lite': 'text-orange-400 border-orange-800 bg-orange-950/40',
  'Node.js': 'text-green-400 border-green-800 bg-green-950/40',
  'TailwindCSS': 'text-sky-400 border-sky-800 bg-sky-950/40',
  'JavaScript': 'text-yellow-300 border-yellow-700 bg-yellow-950/40',
  'CSS3': 'text-purple-400 border-purple-800 bg-purple-950/40',
  'LocalStorage': 'text-slate-300 border-slate-700 bg-slate-800/40',
  'Leaflet.js': 'text-lime-400 border-lime-800 bg-lime-950/40',
};
const defaultTag = 'text-slate-300 border-slate-700 bg-slate-800/40';

function ProjectReadme({ repoUrl }) {
  const { content, loading } = useGitHubReadme(repoUrl);
  if (loading) return <div className="flex items-center justify-center p-20 text-accent-cyan"><Loader2 className="animate-spin" size={32} /></div>;
  return (
    <div className="prose prose-invert prose-cyan max-w-none
                    prose-headings:font-syne prose-headings:font-bold prose-headings:text-white
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-strong:text-accent-cyan prose-code:text-accent-blue
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
    <section id="projects" className="py-24 relative overflow-hidden min-h-screen">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-accent-cyan rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col bg-bg-glass backdrop-blur-xl border border-border-glass rounded-2xl overflow-hidden group
                         hover:border-accent-cyan/60 transition-all duration-300
                         hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,212,255,0.12)]"
            >
              {/* Thumbnail */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                {/* Color overlay for depth */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: `linear-gradient(135deg, ${project.color}22, transparent 60%)` }}
                />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-glass to-transparent" />

                {/* Year badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-3 py-1 bg-bg-primary/80 text-xs font-mono font-bold rounded-full border"
                    style={{ color: project.color, borderColor: `${project.color}50` }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-accent-cyan/20 text-accent-cyan text-xs font-bold rounded-full border border-accent-cyan/40">
                      ★ Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-syne font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {project.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4 flex-1 leading-relaxed">
                  {project.longDesc || project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className={`text-xs font-mono px-2 py-1 rounded border ${TAG_COLORS[t] || defaultTag}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex flex-1 items-center justify-center gap-2 px-4 py-2 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan hover:text-bg-primary rounded-lg font-medium transition-colors border border-accent-cyan/50 text-sm"
                  >
                    <FileText size={16} />
                    README
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-400 rounded-lg transition-colors"
                    title="Source Code"
                  >
                    <Github size={18} />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 border border-slate-700 text-slate-300 hover:text-accent-cyan hover:border-accent-cyan rounded-lg transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
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
              <span className="group-hover:translate-x-1 transition-transform">→</span>
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
