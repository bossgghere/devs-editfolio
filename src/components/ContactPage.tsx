import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  onBackToHome: () => void;
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  return (
    <section className="contact-section-page min-h-screen flex flex-col justify-between blueprint-bg select-none p-6 sm:p-8 md:p-12">
      
      {/* Top Navigation Row */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-2 bg-white text-brand-dark border-2 border-brand-dark px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[3px_3px_0px_#1a1614] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer"
          id="back-home-btn"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
      </div>

      {/* Main Grid Content Layout (Perfectly Vertically Centered on Desktop) */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 flex-grow py-12">
        
        {/* Left Column: Big Bold Statement */}
        <motion.div 
          className="lg:col-span-7 select-none text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-brand-dark uppercase tracking-tighter leading-[0.9] select-none">
            THINGS IN <br />
            <span 
              className="text-transparent"
              style={{ WebkitTextStroke: '2px var(--color-brand-dark)' }}
            >
              MOTION
            </span> <br />
            STAY <br />
            INTERESTING.
          </h2>
        </motion.div>

        {/* Right Column: Exactly the 4 Original Cohesive Components */}
        <div className="lg:col-span-5 space-y-6 w-full max-w-xl lg:ml-auto">
          
          {/* Card 1: Focus */}
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

          {/* Card 2: Base */}
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

          {/* Card 3: Mail CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a 
              href="mailto:workwithdev.editzz@gmail.com"
              className="inline-flex items-center justify-center gap-3 bg-brand-accent text-white border-2 border-brand-dark px-8 py-5 rounded-3xl text-sm font-mono font-black tracking-widest uppercase transition-all shadow-[5px_5px_0px_#1a1614] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] w-full text-center cursor-pointer"
            >
              <Mail size={16} />
              workwithdev.editzz@gmail.com
            </a>
          </motion.div>

          {/* Card 4: Credits */}
          <motion.div 
            className="bg-white border-2 border-brand-dark p-6 rounded-3xl shadow-[5px_5px_0px_#1a1614] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 select-none"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <p className="text-[10px] font-mono text-zinc-500 font-extrabold uppercase tracking-widest mb-3">
              Credits
            </p>
            <div className="space-y-2 text-xs font-sans font-black text-brand-dark uppercase tracking-tight">
              <div className="flex justify-between items-center">
                <span>Created by</span>
                <span className="text-zinc-500">Dev Jena</span>
              </div>
              <div className="flex justify-between items-center border-t border-brand-dark/5 pt-2 flex-wrap gap-1">
                <span>Developed by</span>
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold lowercase">
                  <a 
                    href="https://www.gourav.fun/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-accent hover:underline"
                  >
                    Gourav Raut
                  </a>
                  <span className="text-zinc-300">/</span>
                  <a 
                    href="https://www.instagram.com/gourav_raut_/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-400 hover:text-brand-accent"
                  >
                    @gourav_raut_
                  </a>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-brand-dark/5 pt-2">
                <span>Edition</span>
                <span className="font-mono text-zinc-400 font-bold">2026</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Contact Page Footer (Fully Statically Positioned at the bottom) */}
      <div className="w-full max-w-7xl mx-auto border-t border-brand-dark/15 pt-6 mt-auto z-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-500 font-extrabold uppercase tracking-widest">
          <p className="select-none">
            Code & Logic
          </p>

          <div className="flex items-center gap-6 font-bold tracking-wider">
            <a
              className="hover:text-brand-accent transition-all"
              href="https://github.com/bossgghere"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="hover:text-brand-accent transition-all"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="hover:text-brand-accent transition-all"
              href="https://www.instagram.com/gamer__dev"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
          
          <p className="select-none">
            &copy; {new Date().getFullYear()} Dev Jena
          </p>
        </div>
      </div>
    </section>
  );
}
