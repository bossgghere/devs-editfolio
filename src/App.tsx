import React, { useState } from 'react';
import { Video, Scissors } from 'lucide-react';
import ShowreelPlayer from './components/ShowreelPlayer';
import VideoGrid from './components/VideoGrid';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import Preloader from './components/Preloader';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');

  if (currentPage === 'contact') {
    return <ContactPage onBackToHome={() => setCurrentPage('home')} />;
  }

  return (
    <>
      <Preloader />
      <div className="min-h-screen blueprint-bg text-brand-dark font-sans selection:bg-brand-accent selection:text-white">
      
      {/* Fixed Floating Contact Button */}
      <button 
        onClick={() => setCurrentPage('contact')}
        className="fixed top-6 right-6 z-50 bg-brand-dark hover:bg-brand-accent text-white px-6 py-3 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        id="fixed-menu-btn"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
        Contact
      </button>


      {/* Full Screen Hero Section Wrapper */}
      <div className="min-h-screen flex items-center justify-center py-16 relative">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
          {/* HERO SECTION */}
          <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Big Bold Name and Bio Paragraph */}
            <div className="lg:col-span-7 space-y-8 z-10">
              <div className="space-y-4">
                <h1 className="font-display font-black text-[5.5rem] sm:text-[7.5rem] lg:text-[8.5rem] leading-[0.8] text-brand-dark uppercase tracking-tighter select-none">
                  <span className="block relative hover:text-brand-accent transition-colors duration-300">
                    DEV
                    <span className="inline-block w-3.5 h-3.5 bg-brand-accent rounded-full ml-2.5 align-middle animate-pulse" />
                  </span>
                  <span 
                    className="block text-transparent transition-colors duration-500 hover:text-brand-dark"
                    style={{ WebkitTextStroke: '2.5px var(--color-brand-dark)' }}
                  >
                    JENA
                  </span>
                </h1>
              </div>



              {/* Enhanced Bio Paragraph Card */}
              <div className="bg-white border-2 border-brand-dark p-6 sm:p-8 rounded-3xl shadow-[6px_6px_0px_#1a1614] hover:shadow-[3px_3px_0px_#1a1614] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300 relative overflow-hidden">
                
                {/* Dotted technical background design inside card */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#1a1614_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <p className="text-sm font-sans text-brand-dark leading-relaxed font-bold uppercase tracking-tight relative z-10">
                  I AM A CREATIVE VIDEO EDITOR DEDICATED TO TRANSFORMING IDEAS INTO HIGH-QUALITY VISUAL STORIES. WITH TWO YEARS OF EXPERIENCE, I BRING ADVANCED PACING, SOUND DESIGN, AND COLOR GRADING TO DELIVER POLISHED, HIGH-IMPACT VIDEOS FOR DIGITAL PLATFORMS, MODERN BRANDS, AND ENTERTAINMENT CREATORS. BY COMBINING METICULOUS FRAME-BY-FRAME TIMING, IMMERSIVE ACOUSTIC SOUNDSCAPES, AND SHARP VISUAL GRADIENTS, I FOCUS ON SECURING AUDIENCE RETENTION WITHIN THE FIRST THREE SECONDS. MY PROCESS ENSURES SEAMLESS FLOW AND STORYTELLING EXCELLENCE, TAILORED SPECIFICALLY TO SCALING CREATOR REACH, MAXIMIZING CONVERSION RATES, AND ELEVATING VALUE ACROSS EVERY DELIVERED SECOND.
                </p>
              </div>

              {/* Quick Stats Grid - Enhanced Neo-Brutalist Style */}
              <div className="grid grid-cols-3 gap-1 bg-white border-2 border-brand-dark p-5 rounded-3xl shadow-[6px_6px_0px_#1a1614] hover:shadow-[3px_3px_0px_#1a1614] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300">
                <div className="group flex flex-col justify-center items-center py-1">
                  <div className="text-4xl sm:text-5xl font-display font-black text-brand-dark group-hover:text-brand-accent transition-colors duration-300 leading-none">2</div>
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold mt-1.5 transition-colors duration-300 group-hover:text-brand-dark">YEARS OF PACE</div>
                </div>
                <div className="group flex flex-col justify-center items-center py-1 border-x border-brand-dark/10">
                  <div className="text-4xl sm:text-5xl font-display font-black text-brand-dark group-hover:text-brand-accent transition-colors duration-300 leading-none">100+</div>
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold mt-1.5 transition-colors duration-300 group-hover:text-brand-dark">PROJECTS COMPLETED</div>
                </div>
                <div className="group flex flex-col justify-center items-center py-1">
                  <div className="text-4xl sm:text-5xl font-display font-black text-brand-dark group-hover:text-brand-accent transition-colors duration-300 leading-none">1.5M</div>
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-bold mt-1.5 transition-colors duration-300 group-hover:text-brand-dark font-semibold">TOTAL VIEWS</div>
                </div>
              </div>
            </div>

            {/* Right Column: High-End Custom Hand-drawn effect & Portrait Collage */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Technical rotating vector targets behind portrait */}
              <div className="absolute w-[112%] aspect-square rounded-full border border-dashed border-brand-accent/20 animate-[spin_80s_linear_infinite] -z-10 pointer-events-none" />
              <div className="absolute w-[95%] aspect-square rounded-full border border-brand-dark/5 animate-[spin_120s_linear_infinite] -z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-radial from-brand-accent/5 to-transparent rounded-full filter blur-3xl -z-10" />

              {/* Portrait Card */}
              <div className="relative group w-full max-w-[380px] bg-white border-2 border-brand-dark p-4 rounded-3xl shadow-[8px_8px_0px_#0d0d0d] overflow-hidden transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#0d0d0d]">
                
                {/* Outer frame badge */}
                <div className="absolute top-6 left-6 bg-brand-accent text-white font-mono text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded shadow-md z-10">
                  DEV JENA
                </div>

                {/* Styled portrait image from Unsplash with curly hair & friendly smile (matching screenshot guy) */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 relative border border-zinc-200">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"
                    alt="Dev Jena Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  
                  {/* Pencil sketch texture overlay */}
                  <div className="absolute inset-0 bg-[#ffffff]/10 mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Sub-label */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-mono text-xs font-bold text-brand-dark">DEV JENA</h3>
                    <p className="text-[10px] font-sans text-zinc-500">Video Editor & Creative Director</p>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f] animate-pulse" title="Ready for booking" />
                </div>
              </div>

              {/* Secondary smaller photo on bottom left of collage */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block w-[140px] bg-white border border-brand-dark p-2 rounded-2xl shadow-lg rotate-[-6deg] hover:rotate-0 transition-transform">
                <div className="aspect-[4/5] rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                    alt="Dev Jena edit suite"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <p className="text-[9px] text-center font-mono mt-1 text-zinc-500">IN THE SUITE</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PORTFOLIO SHOWREEL SECTION - Full Width Dark */}
      <section id="portfolio-section" className="blueprint-bg-dark text-brand-cream py-24 border-t border-b border-brand-dark relative z-10 select-none">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 space-y-16">
          
          {/* Section Title matching Dev name style but centered */}
          <div className="text-center space-y-4">
            <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-brand-cream uppercase tracking-tighter leading-none select-none">
              PORTFOLIO
            </h2>
            <p className="text-xs font-mono text-zinc-400 max-w-xl mx-auto font-medium uppercase tracking-wider">
              Visual stories that shape brands and captivate audiences worldwide
            </p>
            <div className="w-16 h-1 bg-brand-accent mx-auto rounded" />
          </div>

          {/* Showreel Player Wrapper */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 text-zinc-300">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Scissors size={14} className="text-brand-accent" />
                Featured Show Reel
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">CLICK TO PLAY WORKSPACE</span>
            </div>
            <ShowreelPlayer />
          </div>
        </div>
      </section>

      {/* Video Grid Component (Handles alternating full-width bg sections inside) */}
      <VideoGrid />

      {/* FOOTER */}
      <Footer onContactClick={() => setCurrentPage('contact')} />

      </div>
    </>
  );
}
