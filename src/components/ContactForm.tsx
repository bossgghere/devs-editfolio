import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface ContactFormProps {
  onMessageSent: () => void;
}

const BUDGET_RANGES = [
  'Under $500',
  '$500 - $1,500',
  '$1,500 - $3,000',
  '$3,000+'
];

const PROJECT_TYPES = [
  'TikTok / Shorts / Reels Bundle',
  'Commercial / Promo Video',
  'Podcast Multi-cam Editing',
  'YouTube Full Video Edit',
  'Custom Motion Graphics'
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
        } catch (e) {
          console.error(e);
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
    <div className="bg-white border border-zinc-200 p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form 
            key="contact-form"
            onSubmit={handleSubmit}
            className="space-y-5"
            id="client-contact-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Holt"
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xl text-xs font-sans text-zinc-950 focus:outline-none focus:border-brand-dark transition-all placeholder:text-zinc-400"
                  id="contact-name-input"
                />
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@ironcrest.com"
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xl text-xs font-sans text-zinc-950 focus:outline-none focus:border-brand-dark transition-all placeholder:text-zinc-400"
                  id="contact-email-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Project Type */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 rounded-xl text-xs font-sans text-zinc-950 focus:outline-none focus:border-brand-dark transition-all"
                  id="contact-type-select"
                >
                  {PROJECT_TYPES.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Budget Estimation */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Estimated Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 rounded-xl text-xs font-sans text-zinc-950 focus:outline-none focus:border-brand-dark transition-all"
                  id="contact-budget-select"
                >
                  {BUDGET_RANGES.map((range, idx) => (
                    <option key={idx} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project description details */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Project Details & Creative Brief</label>
              <textarea
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Briefly describe your footage, desired pacing, style reference, and timeline goals..."
                className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-xs font-sans text-zinc-950 focus:outline-none focus:border-brand-dark transition-all placeholder:text-zinc-400 resize-none"
                id="contact-details-textarea"
              />
            </div>

            {/* Submission button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-dark hover:bg-brand-accent text-white py-3 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-zinc-400 hover:scale-[1.01]"
              id="contact-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>TRANSMITTING REEL BRIEF...</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>SEND REEL BRIEF</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="py-12 text-center space-y-4"
            id="form-success-alert"
          >
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-md border border-green-100">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h4 className="font-display font-black text-xl text-zinc-900 uppercase">Brief Transmitted Successfully</h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto font-sans leading-relaxed">
                Thank you! Your creative outline has been logged. Open the **Admin Inbox Panel** below to see your lead listed instantly!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
