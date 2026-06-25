import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, Trash2, Calendar, Shield, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface LeadInboxProps {
  onClose: () => void;
}

export default function LeadInbox({ onClose }: LeadInboxProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Unread' | 'Contacted'>('all');

  // Load submissions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('devjena_portfolio_leads');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing leads', e);
      }
    } else {
      // Seed with some sample inquiries so the inbox is never empty on first load!
      const initialSeed: ContactMessage[] = [
        {
          id: 'lead-1',
          name: 'Sarah Connor',
          email: 'sconnor@skynet.com',
          messageType: 'Commercial Promo',
          details: 'We need an explosive 30-second video edit for our new cybernetics startup launch. High energy, rapid cuts, heavy sound design. Can you work on a 2-week turnaround?',
          timestamp: 'June 24, 2026, 4:15 PM'
        },
        {
          id: 'lead-2',
          name: 'Logan Marshall',
          email: 'lmarshall@podcastco.fm',
          messageType: 'Podcast Multi-cam',
          details: 'Looking for a reliable long-term editor for our weekly tech and lifestyle podcast. We record 1-hour episodes, need a 9:16 short reel bundle (5 reels per episode) plus multicam cut of the full show.',
          timestamp: 'June 25, 2026, 9:30 AM'
        }
      ];
      localStorage.setItem('devjena_portfolio_leads', JSON.stringify(initialSeed));
      setMessages(initialSeed);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('devjena_portfolio_leads', JSON.stringify(updated));
  };

  return (
    <div className="bg-[#111] text-white p-6 rounded-2xl border border-white/10 shadow-2xl relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-all"
        id="close-inbox-btn"
      >
        <X size={18} />
      </button>

      {/* Title block */}
      <div className="flex items-center gap-2 mb-6">
        <Shield size={18} className="text-brand-accent animate-pulse" />
        <div>
          <h3 className="font-display font-black text-xl uppercase tracking-tight">Leads & Inquiries Dashboard</h3>
          <p className="text-[10px] font-mono text-zinc-500">FREELANCE WORKSPACE / ADMIN CONTROL</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#181818] p-3 rounded-lg border border-white/5 text-xs font-mono">
          <div className="text-zinc-400">
            TOTAL INBOX: <span className="text-white font-bold">{messages.length} inquiries</span>
          </div>
          <div className="text-[10px] text-zinc-500">
            SAVED IN SECURE BROWSER CACHE
          </div>
        </div>

        {/* Message Cards */}
        {messages.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/40 rounded-xl border border-dashed border-zinc-800">
            <Mail size={32} className="mx-auto text-zinc-600 mb-3" />
            <p className="text-xs text-zinc-400 font-mono">No active inquiries at the moment.</p>
            <p className="text-[10px] text-zinc-600 mt-1">Submit a test message in the form below to watch it appear here!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className="bg-[#181818] hover:bg-[#1e1e1e] border border-white/5 p-4 rounded-xl transition-all"
                id={`lead-item-${msg.id}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-bold font-mono text-brand-accent uppercase">{msg.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500">({msg.email})</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[9px] bg-white/10 text-zinc-300 font-mono px-2 py-0.5 rounded border border-white/5 uppercase">
                        {msg.messageType}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono flex items-center gap-1">
                        <Calendar size={10} />
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 rounded-lg transition-all"
                    title="Delete inquiry"
                    id={`delete-lead-${msg.id}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <p className="text-xs text-zinc-300 bg-black/30 p-2.5 rounded border border-white/5 leading-relaxed font-sans mt-1">
                  {msg.details}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
