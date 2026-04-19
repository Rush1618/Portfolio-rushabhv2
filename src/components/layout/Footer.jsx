import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const LINKS = [
  { name: 'Home',         href: '/' },
  { name: 'Projects',     href: '/projects' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Certificates', href: '/certificates' },
  { name: 'Research',     href: '/research' },
  { name: 'Contact',      href: '/contact' },
];

const SOCIALS = [
  { icon: <Github size={18} />,   href: 'https://github.com/Rush1618',                          label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/rushabh-singh-22b23a2bb',      label: 'LinkedIn' },
  { icon: <Mail size={18} />,     href: 'mailto:singh02.rushabh@gmail.com',                      label: 'Email' },
];

const STACK = ['React', 'Three.js', 'Framer Motion', 'Tailwind'];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-glass bg-bg-glass/60 backdrop-blur-xl">
      {/* Glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-syne font-bold text-white tracking-widest hover:text-accent-cyan transition-colors">
              RS <span className="text-accent-cyan opacity-80">&lt;/&gt;</span>
            </Link>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xs">
              CS Student · AI Builder · Full-Stack Dev.<br />
              Currently seeking Summer 2026 internships.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">Navigate</h4>
            <ul className="space-y-2">
              {LINKS.map(l => (
                <li key={l.name}>
                  <Link to={l.href} className="text-slate-400 hover:text-accent-cyan transition-colors text-sm">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + resume */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">Connect</h4>
            <div className="flex gap-3 mb-6">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent-cyan border border-accent-cyan/30 px-4 py-2 rounded-lg hover:bg-accent-cyan/10 transition-all"
            >
              <ExternalLink size={14} /> Resume
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2">
            {STACK.map(t => (
              <span key={t} className="text-xs font-mono text-slate-600 border border-slate-800 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()} Rushabh Singh — Designed &amp; Built with ♥
          </p>
        </div>
      </div>
    </footer>
  );
}
