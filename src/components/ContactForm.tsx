import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface ContactFormProps {
  onMessageSent: () => void;
}

const BUDGET_RANGES = [
  'Under $500',
  '$500 - $1.5K',
  '$1.5K - $3K',
  '$3K+'
];

const PROJECT_TYPES = [
  'Shorts Bundle',
  'Commercial / Promo',
  'Podcast Cut',
  'YouTube Edit',
  'Custom Motion'
];

export default function ContactForm({ onMessageSent }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [budget, setBudget] = useState(BUDGET_RANGES[1]);
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !details) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Form message object
      const newMessage: ContactMessage = {
        id: `lead-${Date.now()}`,
        name,
        email,
        messageType: `${projectType} (${budget})`,
        details,
        timestamp: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };

      // Save to localStorage
      const existing = localStorage.getItem('devjena_portfolio_leads');
      let leads: ContactMessage[] = [];
      if (existing) {
        try {
          leads = JSON.parse(existing);
        } catch (err) {
          console.error(err);
        }
      }
      leads.unshift(newMessage);
      localStorage.setItem('devjena_portfolio_leads', JSON.stringify(leads));

      setIsSubmitting(false);
      setSuccess(true);
      onMessageSent();

      // Reset form fields
      setName('');
      setEmail('');
      setDetails('');

      // Auto dismiss success screen after 4 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#fcfcf9] p-2 select-none">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form 
            key="contact-form"
            onSubmit={handleSubmit}
            className="space-y-6"
            id="client-contact-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Input Row for Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name field */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-extrabold">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Holt"
                  className="w-full bg-white border-2 border-brand-dark px-4 py-3 rounded-2xl text-xs font-sans text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-dark transition-all placeholder:text-zinc-400/70 shadow-[3px_3px_0px_#1a1614] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px]"
                  id="contact-name-input"
                />
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-extrabold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@ironcrest.com"
                  className="w-full bg-white border-2 border-brand-dark px-4 py-3 rounded-2xl text-xs font-sans text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-dark transition-all placeholder:text-zinc-400/70 shadow-[3px_3px_0px_#1a1614] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px]"
                  id="contact-email-input"
                />
              </div>
            </div>

            {/* Project Type Pills */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-extrabold">
                Project Format
              </label>
              <div className="flex flex-wrap gap-2.5">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = projectType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`px-4 py-2.5 rounded-2xl text-[10px] font-mono font-extrabold uppercase tracking-wider text-center border-2 border-brand-dark transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-accent text-white shadow-none translate-x-[2px] translate-y-[2px]' 
                          : 'bg-white text-brand-dark shadow-[3px_3px_0px_#1a1614] hover:bg-zinc-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1614]'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Estimations */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-extrabold">
                Estimated Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BUDGET_RANGES.map((range) => {
                  const isSelected = budget === range;
                  return (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setBudget(range)}
                      className={`py-2.5 rounded-2xl text-[10px] font-mono font-extrabold uppercase tracking-wider text-center border-2 border-brand-dark transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-accent text-white shadow-none translate-x-[2px] translate-y-[2px]' 
                          : 'bg-white text-brand-dark shadow-[3px_3px_0px_#1a1614] hover:bg-zinc-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1614]'
                      }`}
                    >
                      {range}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project description details */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-extrabold">
                Briefing details
              </label>
              <textarea
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe your raw footage duration, editing style, reference pace, and delivery expectations..."
                className="w-full bg-white border-2 border-brand-dark p-4 rounded-2xl text-xs font-sans text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-dark transition-all placeholder:text-zinc-400/70 shadow-[3px_3px_0px_#1a1614] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] resize-none"
                id="contact-details-textarea"
              />
            </div>

            {/* Submission button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-accent text-white border-2 border-brand-dark py-4 rounded-2xl text-xs font-mono font-black tracking-widest uppercase transition-all shadow-[4px_4px_0px_#1a1614] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-400 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
              id="contact-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Reel Outline...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Transmit Reel Brief</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="py-12 text-center space-y-6"
            id="form-success-alert"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-brand-dark shadow-[3px_3px_0px_#1a1614]">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h4 className="font-display font-black text-2xl text-brand-dark uppercase tracking-tight">
                Brief Logged Successfully
              </h4>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto font-sans leading-relaxed font-bold uppercase tracking-tight">
                Your parameters have been queued. Toggle the "Admin Inbox" tab above to view your lead inside the browser local cache instantly!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
