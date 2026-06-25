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
        className="absolute top-6 left-6 flex items-center gap-2 bg-brand-dark/10 hover:bg-brand-dark hover:text-white px-4 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all z-20 cursor-pointer"
        id="back-home-btn"
      >
        <ArrowLeft size={14} />
        Back to Home
      </button>

      {/* Copy Column Details */}
      <div className="contact-copy">
        <div className="contact-col">
          <h2 className="text-zinc-950">
            Things in motion stay interesting.
          </h2>
        </div>

        <div className="contact-col select-none">
          <div className="contact-group">
            <p className="sm">Focus</p>
            <p className="font-sans font-bold text-zinc-800 text-lg uppercase tracking-tight">Full-Stack Web</p>
            <p className="font-sans font-bold text-zinc-800 text-lg uppercase tracking-tight">Cinematic Video & Audio</p>
            <p className="font-sans font-bold text-zinc-800 text-lg uppercase tracking-tight">UX Interaction & GSAP</p>
          </div>

          <div className="contact-group">
            <p className="sm">Base</p>
            <p className="font-sans font-semibold text-zinc-700 text-base">KIIT University, Bhubaneswar</p>
          </div>

          <div className="contact-mail pt-2">
            <a 
              href="mailto:DEVJENA03@GMAIL.COM"
              className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all hover:bg-brand-accent hover:scale-105"
            >
              <Mail size={13} />
              DEVJENA03@GMAIL.COM
            </a>
          </div>

          <div className="contact-group">
            <p className="sm">Credits</p>
            <p className="font-sans text-zinc-500 text-xs">Created by Dev Jena</p>
            <p className="font-sans text-zinc-500 text-xs">Edition 2026</p>
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
