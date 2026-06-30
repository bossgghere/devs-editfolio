import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Calendar, Shield, X, RotateCcw } from 'lucide-react';
import { ContactMessage } from '../types';

interface LeadInboxProps {
  onClose?: () => void;
}

const LEADS_STORAGE_KEY = 'devjena_portfolio_leads';

const SAMPLE_LEADS: ContactMessage[] = [
  {
    id: 'lead-1',
    name: 'Sarah Connor',
    email: 'sconnor@skynet.com',
    messageType: 'Commercial / Promo ($1.5K - $3K)',
    details: 'We need an explosive 30-second video edit for our new cybernetics startup launch. High energy, rapid cuts, heavy sound design. Can you work on a 2-week turnaround?',
    timestamp: 'Jun 24, 2026, 4:15 PM'
  },
  {
    id: 'lead-2',
    name: 'Logan Marshall',
    email: 'lmarshall@podcastco.fm',
    messageType: 'Podcast Cut ($500 - $1.5K)',
    details: 'Looking for a reliable long-term editor for our weekly tech and lifestyle podcast. We record 1-hour episodes, need a 9:16 short reel bundle (5 reels per episode) plus multicam cut of the full show.',
    timestamp: 'Jun 25, 2026, 9:30 AM'
  }
];

export default function LeadInbox({ onClose }: LeadInboxProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LEADS_STORAGE_KEY);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing leads', e);
      }
    } else {
      // Seed with some sample inquiries so the inbox is never empty on first load!
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(SAMPLE_LEADS));
      setMessages(SAMPLE_LEADS);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleResetSeeds = () => {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(SAMPLE_LEADS));
    setMessages(SAMPLE_LEADS);
  };

  return (
    <div className="w-full bg-[#fcfcf9] p-2 select-none space-y-5">
      {/* Title block */}
      <div className="flex items-center justify-between border-b-2 border-brand-dark/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-lg">
            <Shield size={16} className="text-brand-accent animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-brand-dark uppercase tracking-tight">
              Inquiries Control Dashboard
            </h3>
            <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-extrabold">
              Freelance Admin Workspace
            </p>
          </div>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 border border-brand-dark/20 hover:bg-zinc-100 text-brand-dark rounded-xl transition-all cursor-pointer"
            id="close-inbox-btn"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-brand-dark text-[9px] font-mono font-bold shadow-[3px_3px_0px_#1a1614]">
          <div className="text-zinc-600 uppercase">
            ACTIVE INBOX: <span className="text-brand-accent font-black">{messages.length} LEADS REGISTERED</span>
          </div>
          <div className="text-[8px] text-zinc-400 uppercase">
            LOCAL STORAGE STORAGE
          </div>
        </div>

        {/* Message Cards */}
        {messages.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-brand-dark/30 space-y-4">
            <div className="p-3 bg-zinc-50 rounded-full w-fit mx-auto border border-zinc-100">
              <Mail size={24} className="text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-brand-dark font-mono font-black uppercase">No active inquiries</p>
              <p className="text-[9px] text-zinc-400 uppercase max-w-[250px] mx-auto font-mono">
                Submit a creative brief in the other tab or load reference inquiries below
              </p>
            </div>
            <button
              onClick={handleResetSeeds}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-50 text-brand-dark border-2 border-brand-dark px-4 py-2 rounded-xl text-[9px] font-mono font-bold uppercase transition-all shadow-[2px_2px_0px_#1a1614] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
            >
              <RotateCcw size={10} />
              Reset Demo Seeds
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className="bg-white border-2 border-brand-dark p-4.5 rounded-2xl transition-all shadow-[3px_3px_0px_#1a1614] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1614]"
                id={`lead-item-${msg.id}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-black text-brand-accent uppercase">{msg.name}</span>
                      <span className="text-[9px] font-mono text-zinc-400">({msg.email})</span>
                    </div>
                    
                    <div className="flex items-center gap-2.5 flex-wrap text-[9px] font-mono font-bold">
                      <span className="bg-brand-cream/50 text-brand-dark px-2 py-0.5 rounded-lg border border-brand-dark/10 uppercase">
                        {msg.messageType}
                      </span>
                      <span className="text-zinc-400 flex items-center gap-1">
                        <Calendar size={10} />
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 border border-brand-dark/10 hover:border-red-500/30 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-xl transition-all cursor-pointer"
                    title="Delete inquiry"
                    id={`delete-lead-${msg.id}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <p className="text-[11px] text-zinc-700 bg-brand-cream/10 border border-brand-dark/5 p-3 rounded-xl leading-relaxed font-sans mt-3 select-text font-bold uppercase tracking-tight">
                  {msg.details}
                </p>
              </div>
            ))}

            <div className="text-center pt-2">
              <button
                onClick={handleResetSeeds}
                className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold text-zinc-400 hover:text-brand-dark uppercase tracking-wider transition-all cursor-pointer"
              >
                <RotateCcw size={10} />
                Force-Reset Demo Leads
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
