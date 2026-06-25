import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Inbox, Globe, Sparkles, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import LeadInbox from './LeadInbox';

interface ContactPageProps {
  onBackToHome: () => void;
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'inbox'>('form');
  const [leadsCount, setLeadsCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Read leads count on mount and when refreshTrigger changes
  useEffect(() => {
    const stored = localStorage.getItem('devjena_portfolio_leads');
    if (stored) {
      try {
        const leads = JSON.parse(stored);
        setLeadsCount(leads.length);
      } catch (e) {
        console.error(e);
      }
    } else {
      setLeadsCount(2); // default seeds count
    }
  }, [refreshTrigger]);

  const handleMessageSent = () => {
    setRefreshTrigger(prev => prev + 1);
    // Switch to inbox tab after a small delay to let the success animation show
    setTimeout(() => {
      setActiveTab('inbox');
    }, 1500);
  };

  return (
    <section className="contact-section-page min-h-screen flex flex-col justify-between blueprint-bg select-none">
      
      {/* Top Navigation Bar */}
      <div className="w-full relative px-6 py-6 z-20 flex items-center justify-between border-b border-brand-dark/5">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-2 bg-white text-brand-dark border-2 border-brand-dark px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[3px_3px_0px_#1a1614] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer"
          id="back-home-btn"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>

        {/* Live Clock / Status */}
        <div className="hidden sm:flex items-center gap-2 bg-brand-cream border border-brand-dark/15 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-wider font-extrabold text-zinc-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Accepting Q3 Projects
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl w-full mx-auto px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 flex-grow">
        
        {/* Left Column: Big Bold Statement & Contact Meta-data */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-8">
          
          <div className="space-y-4">
            <h2 className="font-display font-black text-6xl sm:text-7xl xl:text-8xl text-brand-dark uppercase tracking-tighter leading-none">
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
            <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-tight text-zinc-600 max-w-md leading-relaxed">
              I edit frame-by-frame stories that capture retention from the first second. Fill out the brief parameters to lock in a timeline or review local inbox inquiries instantly.
            </p>
          </div>

          {/* Quick technical stats/meta rows */}
          <div className="space-y-4 bg-white border-2 border-brand-dark p-5 rounded-3xl shadow-[5px_5px_0px_#1a1614]">
            
            {/* Base Row */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-cream rounded-xl border border-brand-dark/10">
                <MapPin size={14} className="text-brand-dark" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">Base location</p>
                <p className="text-xs font-sans font-black text-brand-dark uppercase">Bhubaneswar, Odisha, India</p>
              </div>
            </div>

            {/* Specialties Row */}
            <div className="flex items-start gap-3 border-t border-brand-dark/5 pt-4">
              <div className="p-2 bg-brand-cream rounded-xl border border-brand-dark/10">
                <Sparkles size={14} className="text-brand-dark" />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">Creative Focus</p>
                <p className="text-xs font-sans font-black text-brand-dark uppercase leading-tight">
                  Pacing, Foley Sound Design, Grading, Retention Engineering
                </p>
              </div>
            </div>

            {/* Direct contact Row */}
            <div className="flex items-center gap-3 border-t border-brand-dark/5 pt-4">
              <div className="p-2 bg-brand-cream rounded-xl border border-brand-dark/10">
                <Globe size={14} className="text-brand-dark" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">Inquire directly</p>
                <a 
                  href="mailto:DEVJENA03@GMAIL.COM" 
                  className="text-xs font-mono font-black text-brand-accent hover:underline uppercase"
                >
                  DEVJENA03@GMAIL.COM
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Tabbed interactive Neo-brutalist panel */}
        <div className="lg:col-span-7 bg-white border-2 border-brand-dark p-6 sm:p-8 rounded-3xl shadow-[6px_6px_0px_#1a1614]">
          
          {/* Tab switches */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-mono font-extrabold uppercase tracking-wider border-2 border-brand-dark transition-all duration-200 cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-brand-dark text-white shadow-none translate-y-0.5'
                  : 'bg-zinc-50 text-brand-dark shadow-[3px_3px_0px_#1a1614] hover:bg-zinc-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1614]'
              }`}
            >
              <Mail size={12} />
              Reel Brief Form
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-mono font-extrabold uppercase tracking-wider border-2 border-brand-dark transition-all duration-200 cursor-pointer relative ${
                activeTab === 'inbox'
                  ? 'bg-brand-dark text-white shadow-none translate-y-0.5'
                  : 'bg-zinc-50 text-brand-dark shadow-[3px_3px_0px_#1a1614] hover:bg-zinc-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1614]'
              }`}
            >
              <Inbox size={12} />
              Admin Inbox
              {leadsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-full bg-brand-accent text-white font-mono text-[8px] font-extrabold border border-brand-dark animate-bounce">
                  {leadsCount}
                </span>
              )}
            </button>
          </div>

          {/* Dynamic Content Pane */}
          <div className="bg-[#fcfcf9] p-3 rounded-2xl border border-brand-dark/10">
            {activeTab === 'form' ? (
              <ContactForm onMessageSent={handleMessageSent} />
            ) : (
              <LeadInbox />
            )}
          </div>

        </div>

      </div>

      {/* Page Footer bar */}
      <div className="contact-footer w-full select-none mt-auto">
        <div className="container-footer">
          <p className="select-none font-mono text-[9px] text-zinc-400 font-extrabold uppercase tracking-widest">
            Visual Storyteller
          </p>

          <div className="contact-socials font-mono text-xs uppercase tracking-wider font-extrabold">
            <a
              className="text-zinc-400 hover:text-brand-accent transition-all"
              href="https://github.com/bossgghere"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-zinc-400 hover:text-brand-accent transition-all"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-zinc-400 hover:text-brand-accent transition-all"
              href="https://instagram.com/devjena"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
          
          <p className="select-none font-mono text-[9px] text-zinc-400 font-extrabold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Dev Jena
          </p>
        </div>
      </div>
    </section>
  );
}
