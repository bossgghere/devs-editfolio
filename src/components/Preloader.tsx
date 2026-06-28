import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, CustomEase);

// Create custom hop ease if not already registered
// Custom bezier curve (0.9, 0, 0.1, 1) mimics professional video frame interpolation rates
try {
  CustomEase.create('hop', '0.9, 0, 0.1, 1');
} catch (e) {
  // Fallback easing is used automatically if registration fails
}

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [showPreloader, setShowPreloader] = useState(true);

  const imagePaths = [
    '/preloader-1.jpg',
    '/preloader-2.jpg',
    '/preloader-3.jpg',
    '/preloader-4.jpg',
  ] as const;

  useGSAP(
    () => {
      if (!showPreloader) return;

      const preloaderImages = gsap.utils.toArray('.preloader-images .img');
      const preloaderImagesInner = gsap.utils.toArray('.preloader-images .img img');
      const chars = gsap.utils.toArray('.preloader-header .char');

      // Set initial positions
      chars.forEach((char: any, index: number) => {
        gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
      });
      gsap.set('.preloader-header h1', { opacity: 1 });

      const tl = gsap.timeline({ delay: 0.25 });

      tl.to('.progress-bar', {
        scaleX: 1,
        duration: 4,
        ease: 'power3.inOut',
      })
        .set('.progress-bar', { transformOrigin: 'right' })
        .to('.progress-bar', {
          scaleX: 0,
          duration: 1,
          ease: 'power3.in',
        });

      preloaderImages.forEach((preloaderImg: any, index: number) => {
        tl.to(
          preloaderImg,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'hop',
            delay: index * 0.75,
          },
          '-=5'
        );
      });

      preloaderImagesInner.forEach((preloaderImageInner: any, index: number) => {
        tl.to(
          preloaderImageInner,
          {
            scale: 1,
            duration: 1.5,
            ease: 'hop',
            delay: index * 0.75,
          },
          '-=5.25'
        );
      });

      tl.to(
        chars,
        {
          yPercent: 0,
          duration: 1,
          ease: 'hop',
          stagger: 0.025,
        },
        '-=5'
      );

      tl.to(
        '.preloader-images',
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1,
          ease: 'hop',
        },
        '-=1.5'
      );

      tl.to(
        chars,
        {
          yPercent: (index: number) => (index % 2 === 0 ? 100 : -100),
          duration: 1,
          ease: 'hop',
          stagger: 0.025,
        },
        '-=2.5'
      );

      tl.to(
        '.preloader',
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1.75,
          ease: 'hop',
          onStart: () => {
            gsap.set('.preloader', { pointerEvents: 'none' });
          },
          onComplete: () => {
            setTimeout(() => {
              setShowPreloader(false);
            }, 100);
          },
        },
        '-=0.5'
      );
    },
    { scope: preloaderRef, dependencies: [] }
  );

  if (!showPreloader) {
    return null;
  }

  const name = "DEV JENA";

  return (
    <div ref={preloaderRef}>
      <div className="preloader">
        <div className="progress-bar"></div>

        <div className="preloader-images">
          {imagePaths.map((path, idx) => (
            <div className="img" key={idx}>
              <img src={path} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="preloader-header select-none pointer-events-none">
        <h1 className="opacity-0 font-display font-black tracking-tight text-white uppercase text-center">
          {name.split('').map((char, index) => (
            <span key={index} className="char-mask overflow-hidden inline-block">
              <span className="char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

