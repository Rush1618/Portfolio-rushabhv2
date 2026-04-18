import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, Loader2, Github, Linkedin, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Fallback if env vars aren't set
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'pub_key';

    try {
      await emailjs.sendForm(serviceId, templateId, e.target, publicKey);
      setStatus('success');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-bg-surface/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-accent-cyan rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl text-lg">
            Whether you have a question, a project opportunity, or just want to say hi, my inbox is always open. I'll get back to you as soon as possible!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <div className="p-8 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass h-full">
              <h3 className="text-2xl font-syne font-bold text-white mb-6">Let's Connect</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-accent-cyan border border-slate-700">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest">Email</h4>
                    <a href="mailto:singh02.rushabh@gmail.com" className="text-slate-300 hover:text-accent-cyan transition-colors">
                      singh02.rushabh@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-accent-blue border border-slate-700">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest">LinkedIn</h4>
                    <a href="https://linkedin.com/in/rushabh-singh-22b23a2bb" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-accent-blue transition-colors">
                      rushabh-singh-22b23a2bb
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white border border-slate-700">
                    <Github size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest">GitHub</h4>
                    <a href="https://github.com/rush1618" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">
                      @rush1618
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-accent-cyan/5 rounded-xl border border-accent-cyan/20">
                <p className="text-sm text-accent-cyan flex gap-2 items-start">
                  <MessageSquare size={16} className="mt-1 flex-shrink-0" />
                  Currently looking for Summer 2026 SWE/AI Internships & exciting freelance opportunities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-[1.5]"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-bg-glass backdrop-blur-xl border border-border-glass flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-mono text-slate-400">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="user_name"
                  required
                  className="bg-bg-primary/80 border border-slate-700/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-cyan focus:bg-slate-800/50 transition-all font-sans"
                  placeholder="What should I call you?"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-mono text-slate-400">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="user_email"
                  required
                  className="bg-bg-primary/80 border border-slate-700/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-cyan focus:bg-slate-800/50 transition-all font-sans"
                  placeholder="Where can I reach you?"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-mono text-slate-400">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows={5}
                  className="bg-bg-primary/80 border border-slate-700/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-cyan focus:bg-slate-800/50 transition-all font-sans resize-none"
                  placeholder="Have a visionary idea? Want to collaborate on AI frameworks? Or just dropping by to say hi? Write your message here..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-accent-cyan text-bg-primary font-bold py-4 rounded-lg hover:bg-accent-cyan/90 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <><Loader2 className="animate-spin" size={20} /> Sending...</>
                ) : status === 'success' ? (
                  <>Message Sent! 🎉</>
                ) : status === 'error' ? (
                  <>Error Sending ❌</>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
