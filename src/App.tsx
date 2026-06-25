import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageCircle, Instagram, ShieldCheck, FileText, ArrowRight, Video, Scissors } from 'lucide-react';
import ShowreelPlayer from './components/ShowreelPlayer';
import VideoGrid from './components/VideoGrid';

import ContactForm from './components/ContactForm';
import LeadInbox from './components/LeadInbox';

export default function App() {
  const [showAdminInbox, setShowAdminInbox] = useState(false);
  const [inboxCount, setInboxCount] = useState(2);

  // Read message count to show notification badge
  const updateInboxCount = () => {
    const stored = localStorage.getItem('aamir_portfolio_leads');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setInboxCount(parsed.length);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    updateInboxCount();
    // Synchronize count every 2 seconds
    const interval = setInterval(updateInboxCount, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen blueprint-bg text-brand-dark font-sans selection:bg-brand-accent selection:text-white">
      
      {/* Decorative Blueprint Header Line */}
      <div className="border-b border-brand-dark/10 bg-white/40 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="text-brand-accent" size={18} />
            <span className="font-mono text-xs font-bold tracking-widest text-zinc-800">AAMIR NAQVI // EDITOR</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="#portfolio-section" 
              className="text-xs font-mono text-zinc-500 hover:text-brand-dark transition-all hidden sm:inline"
            >
              PORTFOLIO
            </a>
            <a 
              href="#showreel-section" 
              className="text-xs font-mono text-zinc-500 hover:text-brand-dark transition-all hidden sm:inline"
            >
              SHOW REEL
            </a>
            <a 
              href="#contact-section" 
              className="bg-brand-dark hover:bg-brand-accent text-white px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all shadow-sm"
              id="header-book-btn"
            >
              BOOK PROJECT
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-24">

        {/* HERO SECTION */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Bold Name and Bio Paragraph */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div className="space-y-4">
              <span className="text-xs font-mono text-brand-accent tracking-widest font-bold bg-brand-accent/5 px-3 py-1 rounded-full border border-brand-accent/10">
                I EDIT VISUALS THAT BUILD BRANDS
              </span>
              <h1 className="font-display font-extrabold text-[4.5rem] sm:text-[6rem] lg:text-[7rem] leading-[0.85] text-brand-dark uppercase tracking-tighter">
                AAMIR<br />NAQVI
              </h1>
            </div>



            {/* Core Bio Paragraph */}
            <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/80 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-dark" />
              <p className="text-sm font-sans text-zinc-700 leading-relaxed font-medium uppercase tracking-tight">
                I AM AN EXPERIENCED VIDEO EDITOR WITH OVER THREE YEARS OF PROFESSIONAL EXPERIENCE DEDICATED TO TRANSFORMING IDEAS INTO HIGH-QUALITY VISUAL CONTENT. MY WORK IS DEFINED BY A STRONG CREATIVE VISION—I DON'T JUST ASSEMBLE CLIPS; I METICULOUSLY CRAFT NARRATIVES THAT CONNECT WITH AUDIENCES. I BRING ADVANCED TECHNICAL SKILLS IN PACING, SOUND DESIGN, AND COLOR GRADING, ENSURING A SEAMLESS AND POLISHED FINAL PRODUCT EVERY TIME. MY THREE YEARS IN THE INDUSTRY HAVE GIVEN ME A ROBUST UNDERSTANDING OF WHAT IT TAKES TO DELIVER IMPACTFUL VIDEOS, WHETHER FOR MARKETING CAMPAIGNS, DIGITAL PLATFORMS, OR COMPELLING BRAND STORIES. I THRIVE ON BRINGING A UNIQUE, FRESH PERSPECTIVE TO EVERY PROJECT I UNDERTAKE.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 text-center font-mono bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm">
              <div>
                <div className="text-2xl font-black text-brand-dark">3+</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">YEARS OF PACE</div>
              </div>
              <div className="border-x border-zinc-100">
                <div className="text-2xl font-black text-brand-dark">120+</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">PROJECTS COMPLETED</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-dark">15M+</div>
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
                AAMIR NAQVI
              </div>

              {/* Styled portrait image from Unsplash with curly hair & friendly smile (matching screenshot guy) */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 relative border border-zinc-200">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"
                  alt="Aamir Naqvi Portrait"
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
                  <h3 className="font-mono text-xs font-bold text-brand-dark">AAMIR NAQVI</h3>
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
                  alt="Aamir Naqvi edit suite"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <p className="text-[9px] text-center font-mono mt-1 text-zinc-500">IN THE SUITE</p>
            </div>
          </div>
        </section>



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

        {/* LET'S START A CONVERSATION SECTION */}
        <section id="contact-section" className="space-y-10 border-t border-zinc-200 pt-16">
          <div className="text-center space-y-2">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-brand-dark uppercase tracking-tight">
              LET'S START A CONVERSATION
            </h2>
            <p className="text-sm font-sans text-zinc-500 font-medium">
              Drop me a message, let's make something users will love.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Information & Channels */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Profile Card / Repeating text from screenshot */}
              <div className="bg-[#121212] text-white p-6 rounded-2xl space-y-4 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-accent font-bold">
                  <span>AAMIR NAQVI</span>
                  <span>//</span>
                  <span>BOOKING OFFICE</span>
                </div>
                <p className="text-[11px] font-sans text-zinc-400 uppercase tracking-tight leading-relaxed">
                  I AM AN EXPERIENCED VIDEO EDITOR WITH OVER THREE YEARS OF PROFESSIONAL EXPERIENCE DEDICATED TO TRANSFORMING IDEAS INTO HIGH-QUALITY VISUAL CONTENT. MY WORK IS DEFINED BY A STRONG CREATIVE VISION...
                </p>
              </div>

              {/* Channels Grid matching design layout */}
              <div className="space-y-4">
                
                {/* Email block */}
                <a 
                  href="mailto:AAMIRNAQVI03@GMAIL.COM"
                  className="block bg-white border border-zinc-200 p-5 rounded-2xl hover:border-brand-dark hover:shadow-md transition-all group"
                  id="contact-email-link"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-100 text-brand-dark rounded-xl group-hover:bg-brand-dark group-hover:text-white transition-all">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 block font-bold uppercase tracking-wider">EMAIL DIRECT</span>
                      <span className="font-mono text-xs font-extrabold text-brand-dark uppercase tracking-wider block">AAMIRNAQVI03@GMAIL.COM</span>
                      <span className="text-[11px] text-zinc-500 font-sans block mt-1">Let's create something that actually works.</span>
                    </div>
                  </div>
                </a>

                {/* WhatsApp block */}
                <a 
                  href="https://wa.me/911234567890" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block bg-white border border-zinc-200 p-5 rounded-2xl hover:border-brand-dark hover:shadow-md transition-all group"
                  id="contact-whatsapp-link"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-100 text-brand-dark rounded-xl group-hover:bg-brand-dark group-hover:text-white transition-all">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 block font-bold uppercase tracking-wider">WHATSAPP</span>
                      <span className="font-mono text-xs font-extrabold text-brand-dark uppercase tracking-wider block">LETS TALK MORE FURTHER</span>
                      <span className="text-[11px] text-zinc-500 font-sans block mt-1">Tap in to chat direct about concepts, timeline, & rates.</span>
                    </div>
                  </div>
                </a>

                {/* Instagram block */}
                <a 
                  href="https://instagram.com/aamirnaqvi" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block bg-white border border-zinc-200 p-5 rounded-2xl hover:border-brand-dark hover:shadow-md transition-all group"
                  id="contact-instagram-link"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-100 text-brand-dark rounded-xl group-hover:bg-brand-dark group-hover:text-white transition-all">
                      <Instagram size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 block font-bold uppercase tracking-wider">INSTAGRAM</span>
                      <span className="font-mono text-xs font-extrabold text-brand-dark uppercase tracking-wider block">FOLLOW THE FLOW</span>
                      <span className="text-[11px] text-zinc-500 font-sans block mt-1">Tap in for visuals with purpose.</span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Admin Inbox Toggle Widget */}
              <div className="bg-[#f1f1eb] p-4 rounded-2xl border border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <ShieldCheck size={20} className="text-zinc-700" />
                    {inboxCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-zinc-800">Review Inquiries Inbox</h4>
                    <p className="text-[10px] text-zinc-500">Review incoming leads in real-time</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAdminInbox(!showAdminInbox)}
                  className="bg-brand-dark hover:bg-zinc-800 text-white px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all"
                  id="toggle-admin-inbox-btn"
                >
                  {showAdminInbox ? 'CLOSE PANEL' : `VIEW INBOX (${inboxCount})`}
                </button>
              </div>

            </div>

            {/* Right Column: Contact Booking Form */}
            <div className="lg:col-span-7">
              <ContactForm onMessageSent={updateInboxCount} />
            </div>
          </div>
        </section>

        {/* ADMIN INBOX DRAWER DISPLAY */}
        <AnimatePresence>
          {showAdminInbox && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="border-t-2 border-brand-dark pt-8"
              id="admin-dashboard-section"
            >
              <LeadInbox onClose={() => setShowAdminInbox(false)} />
            </motion.section>
          )}
        </AnimatePresence>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-white py-12 mt-24 text-center space-y-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} AAMIR NAQVI. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
            <span>I EDIT VISUALS THAT BUILD BRANDS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
