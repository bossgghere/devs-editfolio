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
                <h1 className="font-display font-extrabold text-[4.5rem] sm:text-[6rem] lg:text-[7rem] leading-[0.85] text-brand-dark uppercase tracking-tighter">
                  DEV<br />JENA
                </h1>
              </div>



              {/* Core Bio Paragraph */}
              <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/80 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-dark" />
                <p className="text-sm font-sans text-zinc-700 leading-relaxed font-medium uppercase tracking-tight">
                  I AM A CREATIVE VIDEO EDITOR DEDICATED TO TRANSFORMING IDEAS INTO HIGH-QUALITY VISUAL STORIES. WITH TWO YEARS OF EXPERIENCE, I BRING ADVANCED PACING, SOUND DESIGN, AND COLOR GRADING TO DELIVER POLISHED, HIGH-IMPACT VIDEOS FOR DIGITAL PLATFORMS AND BRANDS.
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-4 text-center font-mono bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm">
                <div>
                  <div className="text-2xl font-black text-brand-dark">2</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">YEARS OF PACE</div>
                </div>
                <div className="border-x border-zinc-100">
                  <div className="text-2xl font-black text-brand-dark">100+</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">PROJECTS COMPLETED</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-dark">1.5M</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">TOTAL VIEWS DELIVERED</div>
                </div>
              </div>
            </div>

            {/* Right Column: High-End Custom Hand-drawn effect & Portrait Collage */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Sketch Background circles to represent hand-drawn elements */}
              <div className="absolute inset-0 bg-radial from-brand-accent/5 to-transparent rounded-full filter blur-2xl -z-10" />

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

      {/* Main Page Content Wrapper (Portfolio & Showreel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-24">

        {/* PORTFOLIO SECTION */}
        <section id="portfolio-section" className="space-y-12">
          
          {/* Section Title exactly matching the futuristic thick geometric "PORTFOLIO" title in screenshot */}
          <div className="text-center space-y-3">
            <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-brand-dark uppercase tracking-tighter leading-none select-none">
              PORTFOLIO
            </h2>
            <p className="text-sm font-mono text-zinc-500 max-w-xl mx-auto font-medium">
              Visual stories that shape brands and captivate audiences worldwide
            </p>
            <div className="w-16 h-1 bg-brand-dark mx-auto rounded" />
          </div>

          {/* Interactive Show Reel player with grading comparisons */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-mono text-xs font-bold text-zinc-700 uppercase tracking-widest flex items-center gap-1.5">
                <Scissors size={14} className="text-brand-accent" />
                Featured Show Reel
              </h3>
              <span className="text-[10px] font-mono text-zinc-400">CLICK TO PLAY WORKSPACE</span>
            </div>
            <ShowreelPlayer />
          </div>

          {/* Video Grid Component */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-mono text-xs font-bold text-zinc-700 uppercase tracking-widest">
                Selected Cuts & Case Studies
              </h3>
              <span className="text-[10px] font-mono text-zinc-400">SELECT CARD FOR CASE DETAILS</span>
            </div>
            <VideoGrid />
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <Footer onContactClick={() => setCurrentPage('contact')} />

      </div>
    </>
  );
}
