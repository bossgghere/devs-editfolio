import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VIDEOS } from '../data';
import { VideoItem } from '../types';
import { Play, X, Sliders, Music, Hourglass, HelpCircle, Check, Search, Calendar, Star } from 'lucide-react';


export default function VideoGrid() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isLightboxMuted, setIsLightboxMuted] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const verticalVideos = VIDEOS.filter((v) => v.category === 'vertical');
  const horizontalVideos = VIDEOS.filter((v) => v.category === 'horizontal');

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const verticalRows = chunkArray(verticalVideos, 4);
  const horizontalRows = chunkArray(horizontalVideos, 2);



  // Custom renderer for 9:16 Vertical Cards to exactly match the screenshot
  const renderVerticalCardVisual = (video: VideoItem) => {
    switch (video.id) {
      case 'v2': // Abstract Gradient Card
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 via-green-300 to-teal-500 flex flex-col justify-between p-4 text-emerald-950 overflow-hidden">
            {/* Grid overlay for tech look */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="flex justify-between items-start z-10 font-mono text-[9px] uppercase tracking-wider opacity-80">
              <span>SYSTEM: OK</span>
              <span>RHYTHM_V2</span>
            </div>
            
            {/* Center abstract circle/crosshair graphics */}
            <div className="relative w-28 h-28 mx-auto my-auto flex items-center justify-center z-10">
              <div className="absolute inset-0 border border-emerald-900/30 rounded-full animate-spin [animation-duration:10s]" />
              <div className="absolute w-20 h-20 border border-emerald-900/20 border-dashed rounded-full" />
              <div className="absolute w-12 h-12 bg-emerald-900/10 rounded-full flex items-center justify-center font-bold text-lg">
                ▲
              </div>
              <span className="absolute top-0 right-0 text-[10px] font-bold text-emerald-900">+</span>
              <span className="absolute bottom-1 left-2 text-[10px] font-bold text-emerald-900">×</span>
            </div>

            <div className="z-10 text-center">
              <p className="font-mono text-[9px] uppercase tracking-widest opacity-80">MOTION ESSENCE</p>
              <h4 className="font-display font-black text-sm tracking-tight uppercase leading-none mt-0.5">
                {video.caption}
              </h4>
            </div>
          </div>
        );

      case 'v3': // Podcaster with "Open" centered text
        return (
          <div className="absolute inset-0 bg-zinc-100">
            <img
              src={video.thumbnail}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-500"
            />
            {/* Dark bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
            {/* Big bold "Open" text centered at bottom */}
            <div className="absolute inset-x-0 bottom-6 flex justify-center z-20">
              <span className="font-display font-black text-3xl tracking-wider text-white uppercase drop-shadow-md">
                OPEN
              </span>
            </div>
          </div>
        );

      case 'v4': // Your Brand Minimalist Card
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-zinc-150 flex flex-col justify-between p-4 text-zinc-900 overflow-hidden">
            <div className="flex justify-between items-start font-mono text-[9px] uppercase tracking-wider text-zinc-400">
              <span>CONCEPT_04</span>
              <span>1:1</span>
            </div>

            <div className="my-auto text-center">
              <h3 className="font-sans text-2xl tracking-tighter leading-none select-none">
                <span className="font-black text-black">Your</span>{' '}
                <span className="font-light text-zinc-500">Brand.</span>
              </h3>
              <p className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase mt-2">
                ESTABLISHED 2026
              </p>
            </div>

            <div className="text-center font-mono text-[8px] text-zinc-400 uppercase">
              MINIMALIST SPACE
            </div>
          </div>
        );

      case 'v5': // Moody coffee cup & clock face icon overlay
        return (
          <div className="absolute inset-0 bg-zinc-900">
            <img
              src={video.thumbnail}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all" />
            
            {/* Center Analog Clock Face Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
              <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center relative mb-2">
                {/* Clock hands */}
                <div className="absolute w-1 h-5 bg-white top-2 left-[26px] origin-bottom rounded-full transform rotate-45" />
                <div className="absolute w-1.5 h-3.5 bg-white top-3.5 left-[26px] origin-bottom rounded-full transform -rotate-60" />
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full z-10" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-300">MOODY TIME</span>
            </div>
          </div>
        );

      case 'v6': // INKWELL MEDIA Solid Black Card
        return (
          <div className="absolute inset-0 bg-zinc-950 flex flex-col justify-between p-5 text-white overflow-hidden border border-zinc-850">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800" />
            <div className="font-mono text-[8px] text-zinc-500 tracking-wider">
              EST. 2024
            </div>

            <div className="my-auto text-center">
              <h3 className="font-display font-extrabold text-lg sm:text-xl tracking-widest text-white leading-tight uppercase">
                INKWELL
                <br />
                <span className="text-brand-accent">MEDIA</span>
              </h3>
            </div>

            <div className="flex justify-between items-end font-mono text-[8px] text-zinc-500">
              <span>CREATIVE SUITE</span>
              <span>● ACTIVE</span>
            </div>
          </div>
        );

      case 'v8': // Atal Setu Bridge & Airport Teal Infographic Card
        return (
          <div className="absolute inset-0 bg-teal-950 flex flex-col justify-between p-4 text-white overflow-hidden">
            <div className="font-mono text-[8px] text-teal-300/80 tracking-wider">
              INFRASTRUCTURE EDIT
            </div>

            {/* Layout with circular pictures and subtitles */}
            <div className="space-y-3 my-auto z-10">
              {/* Point 1 */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border border-teal-400/30 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1541462608141-2f58c8240402?w=100&q=80"
                    alt="Bridge"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="leading-none">
                  <p className="font-mono text-[7px] text-teal-400 uppercase tracking-widest">INFRA_01</p>
                  <p className="font-sans font-black text-[10px] uppercase leading-tight tracking-tight">
                    Atal Setu Bridge
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border border-teal-400/30 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&q=80"
                    alt="Airport"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="leading-none">
                  <p className="font-mono text-[7px] text-teal-400 uppercase tracking-widest">INFRA_02</p>
                  <p className="font-sans font-black text-[9px] uppercase leading-tight tracking-tight">
                    Navi Mumbai Airport
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[8px] font-mono text-teal-300/60 uppercase">
              GOVERNMENT OUTREACH
            </div>
          </div>
        );

      case 'v10': // justblitz. App UI Screenshot
        return (
          <div className="absolute inset-0 bg-[#FAF9F6] text-[#121212] p-4 flex flex-col justify-between overflow-hidden border border-zinc-200">
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400">
              <span>justblitz.</span>
              <span>100% COMPLETE</span>
            </div>

            {/* Mock phone interface */}
            <div className="my-auto space-y-2">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Step 8 of 12
              </div>
              <h4 className="font-sans font-extrabold text-sm tracking-tight leading-none">
                I would like to: Boost my daily productivity
              </h4>

              {/* Pink block matching "have," label in screenshot */}
              <div className="self-start inline-block bg-pink-100 border border-pink-300 text-pink-700 font-sans font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-tight">
                have,
              </div>
            </div>

            <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-600">
              <Check size={8} /> SECURE INTEGRATION
            </div>
          </div>
        );

      case 'v11': // Woman in suit speaking with "Batayiye." centered
        return (
          <div className="absolute inset-0 bg-zinc-100">
            <img
              src={video.thumbnail}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent z-10" />
            
            {/* Elegant italicized serif tag "Batayiye." centered */}
            <div className="absolute inset-x-0 bottom-6 text-center z-20">
              <span className="font-serif italic text-2xl tracking-normal text-white drop-shadow">
                "Batayiye."
              </span>
            </div>
          </div>
        );

      case 'v12': // Sky Blue Block
        return (
          <div className="absolute inset-0 bg-sky-100 flex flex-col justify-between p-4 text-sky-900 border border-sky-200 overflow-hidden">
            <div className="font-mono text-[9px] text-sky-500 tracking-wider">
              BREATHING SPACE
            </div>

            <div className="my-auto text-center">
              <div className="w-10 h-10 mx-auto rounded-full border border-sky-400/40 flex items-center justify-center text-xs animate-pulse">
                ❄
              </div>
              <p className="font-mono text-[9px] text-sky-400 uppercase tracking-widest mt-2">
                SKY BLUE
              </p>
            </div>

            <div className="text-right text-[8px] font-mono text-sky-400">
              1080p COMPLIANT
            </div>
          </div>
        );

      default: // Default Image Thumbnail Look
        return (
          <div className="absolute inset-0 bg-zinc-100">
            <img
              src={video.thumbnail}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity z-10" />
            
            {/* Tag in top-left */}
            <div className="absolute top-3 left-3 z-20">
              <span className="bg-brand-accent/90 text-white text-[9px] font-black font-mono tracking-widest uppercase px-2 py-0.5 rounded shadow">
                {video.tag}
              </span>
            </div>

            {/* Play button indicator overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <div className="w-12 h-12 bg-white text-brand-dark rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </div>
            </div>

            {/* Caption at bottom */}
            <div className="absolute bottom-4 inset-x-4 text-white z-20">
              <p className="font-display font-extrabold text-base tracking-tight uppercase leading-none truncate">
                {video.caption || video.title}
              </p>
              <p className="text-[9px] font-mono text-zinc-400 mt-0.5 uppercase tracking-wide">
                {video.subtitle}
              </p>
            </div>
          </div>
        );
    }
  };

  // Custom renderer for 16:9 Horizontal Cards to exactly match the screenshot
  const renderHorizontalCardVisual = (video: VideoItem) => {
    switch (video.id) {
      case 'h1': // Concert with subtitles
        return (
          <div className="absolute inset-0 bg-zinc-900">
            <img
              src={video.thumbnail}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
            {/* Yellow Subtitles at bottom center */}
            <div className="absolute inset-x-4 bottom-4 text-center z-20">
              <p className="font-sans font-bold text-xs sm:text-sm text-yellow-300 drop-shadow-md">
                "They started with absolutely nothing."
              </p>
            </div>
          </div>
        );

      case 'h2': // Deadpool Holding Guns
        return (
          <div className="absolute inset-0 bg-sky-400 flex flex-col justify-between p-3 text-white overflow-hidden">
            <div className="flex justify-between items-start font-mono text-[9px] tracking-widest text-sky-800 uppercase">
              <span>ACTION CUT</span>
              <span>COMIC_v1</span>
            </div>

            {/* Custom stylized vector drawing representing Deadpool holding weapons */}
            <div className="my-auto flex flex-col items-center">
              <div className="w-14 h-14 bg-red-600 rounded-full border-4 border-zinc-900 relative shadow-lg flex items-center justify-center overflow-hidden">
                {/* Deadpool mask details */}
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-zinc-900" />
                <div className="absolute left-1.5 w-4 h-6 bg-zinc-900 rounded-full rotate-[15deg] top-4 flex items-center justify-center">
                  <div className="w-1 h-1.5 bg-white rounded-full rotate-[-15deg]" />
                </div>
                <div className="absolute right-1.5 w-4 h-6 bg-zinc-900 rounded-full rotate-[-15deg] top-4 flex items-center justify-center">
                  <div className="w-1 h-1.5 bg-white rounded-full rotate-[15deg]" />
                </div>
              </div>
              <span className="font-display font-black text-sm tracking-widest text-zinc-950 uppercase mt-2">
                DEADPOOL
              </span>
            </div>

            <div className="font-mono text-[8px] text-sky-800 text-right uppercase">
              COMEDY / SPEED RAMP
            </div>
          </div>
        );

      case 'h5': // how is he???? Google Search Card
        return (
          <div className="absolute inset-0 bg-[#202124] text-white p-4 flex flex-col justify-between overflow-hidden border border-zinc-800">
            <div className="font-mono text-[8px] text-zinc-500 tracking-wider">
              GOOGLE SEARCH ANIMATION
            </div>

            {/* Google Search Bar Mock */}
            <div className="my-auto w-full max-w-xs mx-auto space-y-3 z-10 relative">
              <div className="flex justify-center mb-1">
                {/* Simulated Google Logo colored text */}
                <span className="font-sans font-bold text-xs tracking-tight">
                  <span className="text-blue-400">G</span>
                  <span className="text-red-400">o</span>
                  <span className="text-yellow-400">o</span>
                  <span className="text-blue-400">g</span>
                  <span className="text-green-400">l</span>
                  <span className="text-red-400">e</span>
                </span>
              </div>
              
              <div className="bg-[#303134] border border-zinc-700 rounded-full py-1.5 px-4 flex items-center justify-between text-xs shadow-md">
                <span className="font-sans font-medium text-zinc-100 flex items-center gap-1.5">
                  <Search size={11} className="text-zinc-400" />
                  how is he????
                </span>
                <span className="text-zinc-400 font-mono text-[8px]">⏎ Enter</span>
              </div>

              {/* Stick figure cartoon overlay */}
              <div className="absolute -top-6 -right-2 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border border-yellow-400 bg-yellow-400" />
                <div className="w-0.5 h-4 bg-yellow-400" />
                <div className="w-4 h-0.5 bg-yellow-400" />
              </div>
            </div>

            <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
              VIRAL CONTENT CREATION
            </div>
          </div>
        );

      case 'h6': // Unspeakable Experience Booklet
        return (
          <div className="absolute inset-0 bg-[#F5F2EB] text-zinc-800 p-4 flex flex-col justify-between overflow-hidden border border-[#E4DEC6]">
            {/* Scrapbook styling with aged margins */}
            <div className="absolute right-3 top-3 border border-red-500/20 px-1 py-0.5 rounded text-[8px] font-mono text-red-500 font-bold uppercase tracking-widest rotate-12">
              SEALED
            </div>

            <div className="font-mono text-[8px] text-[#A69B75] tracking-wider uppercase">
              HISTORIC LOG ARCHIVE
            </div>

            <div className="my-auto space-y-1.5 pl-2 border-l border-red-500/30">
              <h4 className="font-serif italic text-base sm:text-lg text-zinc-900 leading-none">
                Unspeakable
              </h4>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#8F8152] leading-none">
                Experience
              </p>
            </div>

            <div className="flex justify-between items-end font-mono text-[8px] text-[#A69B75]">
              <span>VOL. 82 // REEL 4</span>
              <span>X - MARK</span>
            </div>
          </div>
        );

      case 'h7': // Smile Emoji Split Scene
        return (
          <div className="absolute inset-0 grid grid-cols-2 overflow-hidden">
            {/* Left Column: Smile Emoji */}
            <div className="bg-zinc-800 flex flex-col justify-between p-3 text-white border-r border-zinc-700">
              <span className="font-mono text-[8px] text-zinc-500">STORYBOARD_L</span>
              <div className="my-auto text-center">
                <div className="text-3xl text-yellow-300 animate-bounce">☺</div>
                <p className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest mt-1">EMOTION</p>
              </div>
            </div>
            
            {/* Right Column: Beach Drawing */}
            <div className="bg-amber-50 flex flex-col justify-between p-3 text-amber-950">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[8px] text-amber-700/60">STORYBOARD_R</span>
                <span className="text-red-500 text-xs">❤</span>
              </div>
              <div className="my-auto text-center border border-amber-200/50 p-1.5 rounded bg-white/40">
                <p className="font-sans font-black text-[9px] uppercase tracking-tight">BEACH DUO</p>
                <p className="text-[7px] font-mono text-amber-700">Warm Palette</p>
              </div>
            </div>
          </div>
        );

      case 'h8': // Battle of Chaeronea map
        return (
          <div className="absolute inset-0 bg-red-950 text-red-100 p-4 flex flex-col justify-between overflow-hidden border border-red-900">
            <div className="font-mono text-[8px] text-red-400 tracking-wider flex justify-between">
              <span>WAR STRATEGY MAP</span>
              <span>338 BC</span>
            </div>

            <div className="my-auto flex items-center gap-4 z-10">
              <div className="w-12 h-12 rounded-lg border border-red-500/30 overflow-hidden shrink-0 bg-red-900 p-1">
                {/* Alexander/Philip Bust representation */}
                <div className="w-full h-full rounded bg-red-800 flex items-center justify-center font-bold text-lg">
                  🏛
                </div>
              </div>
              <div className="leading-tight">
                <h4 className="font-sans font-black text-xs sm:text-sm uppercase tracking-tight">
                  Battle of Chaeronea
                </h4>
                <p className="font-mono text-[8px] text-red-400 uppercase tracking-widest mt-0.5">
                  Philip II vs Athens
                </p>
              </div>
            </div>

            <div className="text-[8px] font-mono text-red-400/60 uppercase">
              HISTORICAL ANIMATION
            </div>
          </div>
        );

      case 'h9': // Circle Badges & Avatars
        return (
          <div className="absolute inset-0 bg-zinc-950 text-white p-4 flex flex-col justify-between overflow-hidden border border-zinc-900">
            <div className="font-mono text-[8px] text-zinc-500 tracking-wider">
              AVATAR COLLAGE INDEX
            </div>

            {/* Grid of circle avatars */}
            <div className="grid grid-cols-4 gap-2 my-auto max-w-[220px] mx-auto">
              {['GAST666', 'LIKE-BOT', 'GOOL...', 'AXS'].map((name, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-[8px] text-white border border-white/20">
                    {name[0]}
                  </div>
                  <span className="font-mono text-[6px] text-zinc-500 mt-1 truncate w-full text-center">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-[8px] font-mono text-zinc-600 uppercase">
              SOCIAL MEDIA CAMPAIGN
            </div>
          </div>
        );

      default: // Default Image Thumbnail Look
        return (
          <div className="absolute inset-0 bg-zinc-100">
            <img
              src={video.thumbnail}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity z-10" />
            
            {/* Tag in top-left */}
            <div className="absolute top-3 left-3 z-20">
              <span className="bg-brand-accent/90 text-white text-[9px] font-black font-mono tracking-widest uppercase px-2 py-0.5 rounded shadow">
                {video.tag}
              </span>
            </div>

            {/* Play button indicator overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <div className="w-12 h-12 bg-white text-brand-dark rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </div>
            </div>

            {/* Caption at bottom */}
            <div className="absolute bottom-4 inset-x-4 text-white z-20">
              <p className="font-display font-extrabold text-sm sm:text-base tracking-tight uppercase leading-none truncate">
                {video.caption || video.title}
              </p>
              <p className="text-[9px] font-mono text-zinc-400 mt-0.5 uppercase tracking-wide">
                {video.subtitle}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-24" ref={gridContainerRef}>
      {/* 1. SHORTS & REELS SECTION (9:16) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-400 pb-3 gap-2">
          <div className="space-y-1">
            <h3 className="font-display font-black text-3xl tracking-tight text-brand-dark uppercase">
              Shorts & Reels
            </h3>
            <p className="text-sm font-mono text-brand-gray font-medium">
              Highly engaging vertical 9:16 edits designed to capture attention instantly.
            </p>
          </div>
          <span className="text-xs font-mono bg-brand-dark text-white border border-brand-dark px-3.5 py-1 rounded-full uppercase self-start sm:self-auto shrink-0 font-bold">
            12 Creative Cuts
          </span>
        </div>

        {/* Dynamic project-row layout with GSAP trigger animations */}
        <div className="space-y-12">
          {verticalRows.map((rowItems, rowIndex) => (
            <div key={rowIndex} className="project-row flex flex-col md:flex-row gap-8 justify-center">
              {rowItems.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="project-card flex-1 group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-brand-dark hover:shadow-[8px_8px_0px_#1a1614] transition-all duration-300 relative aspect-[9/16] w-full max-w-[280px] mx-auto md:mx-0"
                  id={`portfolio-card-${video.id}`}
                >
                  {renderVerticalCardVisual(video)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. COMMERCIAL & YOUTUBE SECTION (16:9) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-400 pb-3 gap-2">
          <div className="space-y-1">
            <h3 className="font-display font-black text-3xl tracking-tight text-brand-dark uppercase">
              Commercial & YouTube
            </h3>
            <p className="text-sm font-mono text-brand-gray font-medium">
              Immersive high-fidelity widescreen 16:9 cinematic edits and branding narratives.
            </p>
          </div>
          <span className="text-xs font-mono bg-brand-dark text-white border border-brand-dark px-3.5 py-1 rounded-full uppercase self-start sm:self-auto shrink-0 font-bold">
            9 Widescreen Cuts
          </span>
        </div>

        <div className="space-y-12">
          {horizontalRows.map((rowItems, rowIndex) => (
            <div key={rowIndex} className="project-row flex flex-col md:flex-row gap-8 justify-center">
              {rowItems.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="project-card flex-1 group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-brand-dark hover:shadow-[8px_8px_0px_#1a1614] transition-all duration-300 relative aspect-video w-full max-w-[500px] mx-auto md:mx-0"
                  id={`portfolio-card-${video.id}`}
                >
                  {renderHorizontalCardVisual(video)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Window */}
      <AnimatePresence>
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto"
            onClick={() => setSelectedVideo(null)}
            id="lightbox-backdrop"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 text-white rounded-2xl border border-zinc-800 overflow-hidden w-full max-w-5xl shadow-2xl relative flex flex-col lg:flex-row"
              id="lightbox-container"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full z-50 border border-white/10 hover:scale-110 transition-all cursor-pointer"
                id="lightbox-close-btn"
              >
                <X size={18} />
              </button>

              {/* Left Side: Video Player Stage */}
              <div className={`w-full lg:w-[55%] bg-black flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-zinc-800 ${
                selectedVideo.aspectRatio === '9:16' ? 'py-6 px-4 aspect-[4/5] lg:aspect-auto min-h-[450px]' : 'aspect-video lg:aspect-auto'
              }`}>
                <video
                  src={selectedVideo.videoUrl}
                  className={`w-full max-h-[80vh] object-contain rounded-lg ${
                    selectedVideo.aspectRatio === '9:16' ? 'max-w-[320px] shadow-2xl border border-zinc-800' : ''
                  }`}
                  controls
                  autoPlay
                  loop
                  muted={isLightboxMuted}
                  playsInline
                />
              </div>

              {/* Right Side: Detailed Metadata Panel */}
              <div className="w-full lg:w-[45%] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] bg-brand-accent text-white font-mono tracking-widest font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {selectedVideo.tag}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      {selectedVideo.category === 'vertical' ? '9:16 vertical' : '16:9 horizontal'}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase leading-none mb-2 text-white">
                    {selectedVideo.title}
                  </h3>
                  
                  {selectedVideo.subtitle && (
                    <p className="text-sm font-mono text-brand-accent font-semibold mb-4">
                      {selectedVideo.subtitle}
                    </p>
                  )}

                  <hr className="border-zinc-800 my-4" />

                  <p className="text-sm text-zinc-350 leading-relaxed font-sans">
                    {selectedVideo.description}
                  </p>

                  <div className="mt-6 space-y-4">
                    {/* Skills section */}
                    <div>
                      <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Sliders size={12} className="text-brand-accent" />
                        Techniques Applied
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedVideo.skillsUsed.map((skill, i) => (
                          <span 
                            key={i} 
                            className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono px-2.5 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specifications block */}
                    <div>
                      <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Hourglass size={12} className="text-brand-accent" />
                        Production Details
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                        <div>
                          <span className="text-zinc-500">FORMAT:</span>{' '}
                          <span className="text-zinc-300">{selectedVideo.aspectRatio === '9:16' ? '9:16 VERTICAL' : '16:9 WIDESCREEN'}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">RESOLUTION:</span>{' '}
                          <span className="text-zinc-300">1080p FHD</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">COLOR SPACE:</span>{' '}
                          <span className="text-zinc-300">REC.709 SLOG3</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">TARGET:</span>{' '}
                          <span className="text-zinc-300">REELS/CINEMATIC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                    <Star size={11} className="text-yellow-500" fill="currentColor" />
                    CLIENT FEEDBACK: 5/5
                  </div>
                  <button
                    onClick={() => setIsLightboxMuted(!isLightboxMuted)}
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Music size={13} className="text-brand-accent" />
                    {isLightboxMuted ? 'Unmute' : 'Mute Sound'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
