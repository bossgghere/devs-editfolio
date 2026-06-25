import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail } from 'lucide-react';

gsap.registerPlugin(useGSAP);

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const explosionContainerRef = useRef<HTMLDivElement>(null);
  const [localTime, setLocalTime] = useState('');

  const config = {
    gravity: 0.25,
    friction: 0.99,
    imageSize: 300,
    horizontalForce: 20,
    verticalForce: 15,
    rotationSpeed: 10,
  };

  const imageParticleCount = 10;
  const imagePaths = Array.from(
    { length: imageParticleCount },
    (_, i) => `/objects/obj-${i + 1}.png`
  );

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

  class Particle {
    element: HTMLImageElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;

    constructor(element: HTMLImageElement) {
      this.element = element;
      this.x = 0;
      this.y = 0;
      this.vx = (Math.random() - 0.5) * config.horizontalForce;
      this.vy = -config.verticalForce - Math.random() * 10;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
    }

    update() {
      this.vy += config.gravity;
      this.vx *= config.friction;
      this.vy *= config.friction;
      this.rotationSpeed *= config.friction;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
  }

  useGSAP(
    () => {
      let hasExploded = false;
      let animationId: number;
      let checkTimeout: NodeJS.Timeout;

      // Preload images
      imagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;
      });

      const getComputedImageSize = () => {
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        const baseOnWidth = Math.floor(viewportWidth * 0.18);
        const baseOnHeight = Math.floor(viewportHeight * 0.22);
        return Math.max(180, Math.min(config.imageSize, baseOnWidth, baseOnHeight));
      };

      const createParticles = () => {
        if (!explosionContainerRef.current) return;
        explosionContainerRef.current.innerHTML = '';

        const particleSize = getComputedImageSize();
        explosionContainerRef.current.style.setProperty(
          '--particle-size',
          `${particleSize}px`
        );

        imagePaths.forEach((path) => {
          const particle = document.createElement('img');
          particle.src = path;
          particle.classList.add('explosion-particle-img');
          explosionContainerRef.current!.appendChild(particle);
        });
      };

      const explode = () => {
        if (hasExploded || !explosionContainerRef.current) return;

        hasExploded = true;
        createParticles();

        const particleElements = explosionContainerRef.current.querySelectorAll<HTMLImageElement>(
          '.explosion-particle-img'
        );
        const particles = Array.from(particleElements).map(
          (element) => new Particle(element)
        );

        const animate = () => {
          particles.forEach((particle) => particle.update());
          animationId = requestAnimationFrame(animate);

          if (
            explosionContainerRef.current &&
            particles.every(
              (particle) =>
                particle.y > explosionContainerRef.current!.offsetHeight / 2
            )
          ) {
            cancelAnimationFrame(animationId);
          }
        };

        animate();
      };

      const checkFooterPosition = () => {
        if (!footerRef.current) return;

        const footerRect = footerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (footerRect.top > viewportHeight + 100) {
          hasExploded = false;
        }

        if (!hasExploded && footerRect.top <= viewportHeight + 250) {
          explode();
        }
      };

      createParticles();
      setTimeout(checkFooterPosition, 500);

      const scrollHandler = () => {
        clearTimeout(checkTimeout);
        checkTimeout = setTimeout(checkFooterPosition, 5);
      };

      const resizeHandler = () => {
        const newSize = getComputedImageSize();
        if (explosionContainerRef.current) {
          explosionContainerRef.current.style.setProperty(
            '--particle-size',
            `${newSize}px`
          );
        }
        hasExploded = false;
      };

      window.addEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('scroll', scrollHandler);
        window.removeEventListener('resize', resizeHandler);
        clearTimeout(checkTimeout);
        cancelAnimationFrame(animationId);
        if (explosionContainerRef.current) {
          explosionContainerRef.current.innerHTML = '';
        }
      };
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="footer-section">
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
          <div className="text-left">
            BHUBANESWAR, OD <span className="text-brand-cream ml-1.5">{localTime}</span>
          </div>

          <div className="text-center">
            DEVELOPED BY DEV JENA
          </div>

          <div className="text-right">
            &copy; {new Date().getFullYear()} DEV JENA
          </div>
        </div>
      </div>

      {/* GSAP Explosion Particle container */}
      <div className="explosion-container" ref={explosionContainerRef}></div>
    </footer>
  );
}
