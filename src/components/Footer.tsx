import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateLocalTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      setLocalTime(formatter.format(new Date()));
    };

    updateLocalTime();
    const timeInterval = setInterval(updateLocalTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <footer className="footer-section">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-between py-16 relative z-10">
        
        {/* Footer Header Area */}
        <div className="flex flex-col items-center justify-center text-center my-auto space-y-8">
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-brand-cream uppercase tracking-tighter leading-none select-none max-w-4xl">
            Let's build something that feels alive
          </h1>
          
          <button
            onClick={onContactClick}
            className="flex items-center gap-2.5 bg-brand-cream text-brand-dark px-8 py-4 rounded-full text-sm font-mono font-bold tracking-widest uppercase transition-all duration-300 hover:bg-brand-accent hover:text-white border-2 border-brand-cream hover:border-brand-accent shadow-md cursor-pointer hover:scale-105"
          >
            <Mail size={16} />
            Say Hello
          </button>
        </div>

        {/* Footer Metadata row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-brand-gray/30 text-xs font-mono text-brand-gray">
          <div className="text-left md:text-left">
            BHUBANESWAR, OD <span className="text-brand-cream ml-1.5">{localTime}</span>
          </div>

          <div className="text-left md:text-center">
            DEVELOPED BY DEV JENA
          </div>

          <div className="text-left md:text-right">
            &copy; {new Date().getFullYear()} DEV JENA
          </div>
        </div>
      </div>
    </footer>
  );
}
