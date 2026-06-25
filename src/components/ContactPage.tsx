import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  onBackToHome: () => void;
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  return (
    <section className="contact-section-page min-h-screen flex flex-col justify-between blueprint-bg select-none">
      
      {/* Top Bar Navigation */}
      <div className="w-full relative px-6 py-6 z-20 flex items-center justify-between">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-2 bg-white text-brand-dark border-2 border-brand-dark px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[3px_3px_0px_#1a1614] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer"
          id="back-home-btn"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
      </div>

      {/* Main Grid Layout for Statement & 4 components */}
      <div className="max-w-6xl w-full mx-auto px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 flex-grow">
        
        {/* Left Column: Big Bold Statement */}
        <motion.div 
          className="md:col-span-6 select-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-brand-dark uppercase tracking-tighter leading-none">
            THINGS IN <br />
            <span 
              className="text-transparent"
              style={{ WebkitTextStroke: '2.5px var(--color-brand-dark)' }}
            >
              MOTION
            </span> <br />
            STAY <br />
            INTERESTING.
          </h2>
        </motion.div>

        {/* Right Column: 4 Cohesive Neo-Brutalist Components */}
        <div className="md:col-span-6 space-y-6">
          
          {/* Component 1: Focus */}
          <motion.div 
            className="bg-white border-2 border-brand-dark p-6 rounded-3xl shadow-[5px_5px_0px_#1a1614] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 select-none"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-[10px] font-mono text-zinc-500 font-extrabold uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping" />
              Focus
            </p>
            <div className="space-y-1.5 text-brand-dark font-sans font-black uppercase text-xs sm:text-sm tracking-tight">
              <p>Cinematic Video Assembly</p>
              <p>Sound Design & Foley</p>
              <p>Color Grading & Grading LUTS</p>
            </div>
          </motion.div>

          {/* Component 2: Base */}
          <motion.div 
            className="bg-white border-2 border-brand-dark p-6 rounded-3xl shadow-[5px_5px_0px_#1a1614] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 select-none"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-[10px] font-mono text-zinc-500 font-extrabold uppercase tracking-widest mb-2">
              Base
            </p>
            <p className="font-sans font-black text-brand-dark text-xs sm:text-sm uppercase tracking-tight">
              Bhubaneswar, Odisha, India
            </p>
          </motion.div>

          {/* Component 3: Mail Button */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a 
              href="mailto:DEVJENA03@GMAIL.COM"
              className="inline-flex items-center justify-center gap-3 bg-brand-accent text-white border-2 border-brand-dark px-8 py-5 rounded-3xl text-sm font-mono font-black tracking-widest uppercase transition-all shadow-[5px_5px_0px_#1a1614] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] w-full text-center cursor-pointer"
            >
              <Mail size={16} />
              DEVJENA03@GMAIL.COM
            </a>
          </motion.div>

          {/* Component 4: Credits */}
          <motion.div 
            className="bg-white border-2 border-brand-dark p-6 rounded-3xl shadow-[5px_5px_0px_#1a1614] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 select-none"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <p className="text-[10px] font-mono text-zinc-500 font-extrabold uppercase tracking-widest mb-2">
              Credits
            </p>
            <div className="flex justify-between items-center text-xs font-sans font-black text-brand-dark uppercase tracking-tight">
              <span>Created by Dev Jena</span>
              <span className="font-mono text-zinc-400">Edition 2026</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Contact Page Footer */}
      <div className="contact-footer w-full select-none mt-auto">
        <div className="container-footer">
          <p className="select-none font-mono text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest">
            Code & Logic
          </p>

          <div className="contact-socials font-mono text-xs uppercase tracking-wider font-extrabold">
            <a
              className="text-zinc-500 hover:text-brand-accent transition-all"
              href="https://github.com/bossgghere"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-zinc-500 hover:text-brand-accent transition-all"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-zinc-500 hover:text-brand-accent transition-all"
              href="https://instagram.com/devjena"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
          
          <p className="select-none font-mono text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Dev Jena
          </p>
        </div>
      </div>
    </section>
  );
}
