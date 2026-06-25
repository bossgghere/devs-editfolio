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
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-brand-cream uppercase tracking-tighter leading-none select-none max-w-5xl transition-colors duration-300 hover:text-brand-accent">
            Let's build <br className="sm:hidden" /> something that <br /> feels alive
          </h1>
          
          <button
            onClick={onContactClick}
            className="flex items-center gap-2.5 bg-brand-cream text-brand-dark px-8 py-4 rounded-full text-sm font-mono font-bold tracking-widest uppercase transition-all duration-300 border-2 border-brand-cream shadow-[4px_4px_0px_#e3e3db] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer"
          >
            <Mail size={16} />
            Say Hello
          </button>
        </div>

        {/* Footer Metadata row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-brand-gray/30 text-xs font-mono text-brand-gray select-none">
          <div className="text-left md:text-left flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping" />
            <span>BHUBANESWAR, India</span>
            <span className="text-brand-cream font-bold">{localTime}</span>
          </div>

          <div className="text-left md:text-center uppercase font-bold tracking-wider flex items-center justify-start md:justify-center gap-1.5 flex-wrap">
            <span>Developed by</span>
            <a 
              href="https://www.gourav.fun/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-cream hover:text-brand-accent transition-colors underline"
            >
              Gourav Raut
            </a>
            <span className="text-brand-gray/30">/</span>
            <a 
              href="https://www.instagram.com/gourav_raut_/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-gray hover:text-brand-accent transition-colors lowercase font-normal"
            >
              @gourav_raut_
            </a>
          </div>

          <div className="text-left md:text-right uppercase font-bold tracking-wider">
            &copy; {new Date().getFullYear()} DEV JENA
          </div>
        </div>
      </div>
    </footer>
  );
}
