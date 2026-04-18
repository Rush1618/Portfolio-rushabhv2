import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Certificates', href: '/certificates' },
  { name: 'Research', href: '/research' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-bg-glass backdrop-blur-md border-border-glass py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-syne font-bold text-white tracking-widest group-hover:text-accent-cyan transition-colors">
            RS <span className="text-accent-cyan opacity-80">&lt;/&gt;</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            link.href.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-medium text-slate-300 hover:text-accent-cyan transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href}
                className={`text-xs font-medium transition-colors ${
                   location.pathname === link.href ? 'text-accent-cyan' : 'text-slate-300 hover:text-accent-cyan'
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
          <a 
            href="/assets/resume.pdf" 
            target="_blank"
            className="px-4 py-1.5 text-xs font-bold text-accent-cyan border border-accent-cyan/30 rounded-lg hover:bg-accent-cyan/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all ml-4"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
