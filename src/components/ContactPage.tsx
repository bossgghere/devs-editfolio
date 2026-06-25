import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  return (
    <section className="contact-section-page">
      
      {/* Back button */}
      <button 
        onClick={onBackToHome}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white text-brand-dark border-2 border-brand-dark px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[3px_3px_0px_#1a1614] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] z-20 cursor-pointer"
        id="back-home-btn"
      >
        <ArrowLeft size={14} />
        Back to Home
      </button>

      {/* Copy Column Details */}
      <div className="contact-copy">
        <div className="contact-col">
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-brand-dark uppercase tracking-tighter leading-none select-none">
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
        </div>

        <div className="contact-col space-y-6">
          <div className="bg-white border-2 border-brand-dark p-6 rounded-3xl shadow-[4px_4px_0px_#1a1614] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 select-none">
            <p className="sm !m-0 !mb-1 text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest">Focus</p>
            <p className="font-sans font-extrabold text-zinc-800 text-sm uppercase tracking-tight">Cinematic Video Assembly</p>
            <p className="font-sans font-extrabold text-zinc-800 text-sm uppercase tracking-tight">Sound Design & Foley</p>
            <p className="font-sans font-extrabold text-zinc-800 text-sm uppercase tracking-tight">Color Grading & Grading LUTS</p>
          </div>

          <div className="bg-white border-2 border-brand-dark p-6 rounded-3xl shadow-[4px_4px_0px_#1a1614] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 select-none">
            <p className="sm !m-0 !mb-1 text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest">Base</p>
            <p className="font-sans font-extrabold text-zinc-800 text-sm uppercase tracking-tight">Bhubaneswar, Odisha, India</p>
          </div>

          <div className="contact-mail">
            <a 
              href="mailto:DEVJENA03@GMAIL.COM"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-accent text-white border-2 border-brand-dark px-8 py-4 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[4px_4px_0px_#1a1614] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] w-full"
            >
              <Mail size={14} />
              DEVJENA03@GMAIL.COM
            </a>
          </div>

          <div className="bg-white border-2 border-brand-dark p-6 rounded-3xl shadow-[4px_4px_0px_#1a1614] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 select-none">
            <p className="sm !m-0 !mb-1 text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest">Credits</p>
            <p className="font-sans font-extrabold text-zinc-800 text-[10px] uppercase tracking-tight">Created by Dev Jena</p>
            <p className="font-sans font-extrabold text-zinc-800 text-[10px] uppercase tracking-tight">Edition 2026</p>
          </div>
        </div>
      </div>

      {/* Contact page footer */}
      <div className="contact-footer">
        <div className="container-footer">
          <p className="sm select-none">Code & Logic</p>

          <div className="contact-socials">
            <a
              className="sm text-zinc-500 hover:text-brand-accent transition-all"
              href="https://github.com/bossgghere"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="sm text-zinc-500 hover:text-brand-accent transition-all"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="sm text-zinc-500 hover:text-brand-accent transition-all"
              href="https://instagram.com/devjena"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
          
          <p className="sm select-none">&copy; Dev Jena</p>
        </div>
      </div>
    </section>
  );
}
