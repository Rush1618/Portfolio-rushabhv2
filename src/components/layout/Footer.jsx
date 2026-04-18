export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-bg-primary py-12 text-center text-slate-500 font-mono text-sm relative z-10">
      <p className="mb-2">
        Designed & Built by <span className="text-accent-cyan font-bold">Rushabh Singh</span>
      </p>
      <p className="text-xs text-slate-600">
        © {new Date().getFullYear()} Rushabh Singh. Built with React Three Fiber, Tailwind & GSAP.
      </p>
    </footer>
  );
}
