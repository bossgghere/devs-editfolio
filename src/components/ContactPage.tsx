import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Mail, Github, Linkedin, Award } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const screensaverRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up any stray screensaver elements
    const existing = container.querySelectorAll('.screensaver');
    existing.forEach((el) => el.parentNode?.removeChild(el));

    const config = {
      speed: 3.5,
      imageCount: 10,
      size: 280,
      changeDirectionDelay: 20,
      edgeOffset: -20,
    };

    let isDesktop = window.innerWidth >= 1000;
    let screensaverElement: HTMLDivElement | null = null;
    const preloadedImages: HTMLImageElement[] = [];

    const preloadImages = () => {
      return new Promise<void>((resolve) => {
        let loadedCount = 0;
        for (let i = 1; i <= config.imageCount; i++) {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            if (loadedCount === config.imageCount) {
              resolve();
            }
          };
          img.src = `/objects/obj-${i}.png`;
          preloadedImages.push(img);
        }
      });
    };

    const stopAnimation = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      if (screensaverElement && screensaverElement.parentNode) {
        screensaverElement.parentNode.removeChild(screensaverElement);
        screensaverElement = null;
      }
    };

    const startAnimation = async () => {
      if (!isDesktop) return;

      stopAnimation();
      await preloadImages();

      // Ensure container is still mounted
      if (!containerRef.current) return;

      screensaverElement = document.createElement('div');
      screensaverElement.classList.add('screensaver');
      container.appendChild(screensaverElement);
      screensaverRef.current = screensaverElement;

      const containerRect = container.getBoundingClientRect();
      let posX = containerRect.width / 2 - config.size / 2;
      let posY = containerRect.height / 2 - config.size / 2;

      let velX = (Math.random() > 0.5 ? 1 : -1) * config.speed;
      let velY = (Math.random() > 0.5 ? 1 : -1) * config.speed;

      let currentImageIndex = 1;

      screensaverElement.style.width = `${config.size}px`;
      screensaverElement.style.height = `${config.size}px`;
      screensaverElement.style.backgroundImage = `url(/objects/obj-${currentImageIndex}.png)`;
      screensaverElement.style.left = `${posX}px`;
      screensaverElement.style.top = `${posY}px`;

      const changeImage = () => {
        currentImageIndex = (currentImageIndex % config.imageCount) + 1;
        if (screensaverElement) {
          screensaverElement.style.backgroundImage = `url(/objects/obj-${currentImageIndex}.png)`;
        }
      };

      let canChangeDirection = true;

      const animate = () => {
        if (!screensaverElement || !screensaverElement.parentNode || !isDesktop) {
          stopAnimation();
          return;
        }

        const containerRect = container.getBoundingClientRect();

        posX += velX;
        posY += velY;

        const leftEdge = config.edgeOffset;
        const rightEdge = containerRect.width - config.size + Math.abs(config.edgeOffset);
        const topEdge = config.edgeOffset;
        const bottomEdge = containerRect.height - config.size + Math.abs(config.edgeOffset);

        if (posX <= leftEdge || posX >= rightEdge) {
          if (canChangeDirection) {
            velX = -velX;
            changeImage();
            posX = posX <= leftEdge ? leftEdge : rightEdge;

            canChangeDirection = false;
            setTimeout(() => {
              canChangeDirection = true;
            }, config.changeDirectionDelay);
          }
        }

        if (posY <= topEdge || posY >= bottomEdge) {
          if (canChangeDirection) {
            velY = -velY;
            changeImage();
            posY = posY <= topEdge ? topEdge : bottomEdge;

            canChangeDirection = false;
            setTimeout(() => {
              canChangeDirection = true;
            }, config.changeDirectionDelay);
          }
        }

        screensaverElement.style.left = `${posX}px`;
        screensaverElement.style.top = `${posY}px`;

        animationIdRef.current = requestAnimationFrame(animate);
      };

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const wasDesktop = isDesktop;
      isDesktop = window.innerWidth >= 1000;

      if (isDesktop && !wasDesktop) {
        startAnimation();
      } else if (!isDesktop && wasDesktop) {
        stopAnimation();
      }
    };

    window.addEventListener('resize', handleResize);

    if (isDesktop) {
      startAnimation();
    }

    return () => {
      stopAnimation();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="contact-section-page" ref={containerRef}>
      
      {/* Back button */}
      <button 
        onClick={onBackToHome}
        className="absolute top-6 left-6 flex items-center gap-2 bg-brand-dark/10 hover:bg-brand-dark hover:text-white px-4 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all z-20 cursor-pointer"
        id="back-home-btn"
      >
        <ArrowLeft size={14} />
        Back to Home
      </button>

      {/* Copy Column Details */}
      <div className="contact-copy">
        <div className="contact-col">
          <h2 className="text-zinc-950">
            Things in motion stay interesting.
          </h2>
        </div>

        <div className="contact-col select-none">
          <div className="contact-group">
            <p className="sm">Focus</p>
            <p className="font-sans font-bold text-zinc-800 text-lg uppercase tracking-tight">Full-Stack Web</p>
            <p className="font-sans font-bold text-zinc-800 text-lg uppercase tracking-tight">Cinematic Video & Audio</p>
            <p className="font-sans font-bold text-zinc-800 text-lg uppercase tracking-tight">UX Interaction & GSAP</p>
          </div>

          <div className="contact-group">
            <p className="sm">Base</p>
            <p className="font-sans font-semibold text-zinc-700 text-base">KIIT University, Bhubaneswar</p>
          </div>

          <div className="contact-mail pt-2">
            <a 
              href="mailto:DEVJENA03@GMAIL.COM"
              className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all hover:bg-brand-accent hover:scale-105"
            >
              <Mail size={13} />
              DEVJENA03@GMAIL.COM
            </a>
          </div>

          <div className="contact-group">
            <p className="sm">Credits</p>
            <p className="font-sans text-zinc-500 text-xs">Created by Dev Jena</p>
            <p className="font-sans text-zinc-500 text-xs">Edition 2026</p>
          </div>
        </div>
      </div>

      {/* Contact page footer */}
      <div className="contact-footer">
        <div className="container-footer">
          <p className="sm select-none">Code & Logic</p>

          <div className="contact-socials">
            <a
              className="sm text-zinc-500 hover:text-brand-accent transition-all"
              href="https://github.com/bossgghere"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="sm text-zinc-500 hover:text-brand-accent transition-all"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="sm text-zinc-500 hover:text-brand-accent transition-all"
              href="https://instagram.com/devjena"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
          
          <p className="sm select-none">&copy; Dev Jena</p>
        </div>
      </div>
    </section>
  );
}
