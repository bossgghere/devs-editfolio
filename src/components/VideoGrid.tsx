import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VIDEOS } from '../data';
import { VideoItem } from '../types';
import { Play, X, Sliders, Music, Hourglass, HelpCircle, Check, Search, Calendar, Star, Scissors } from 'lucide-react';


interface ToolItem {
  name: string;
  icon: string;
  desc: string;
  color: string;
  capabilities: string[];
}

const TOOLS: ToolItem[] = [
  {
    name: 'Premiere Pro',
    icon: 'Pr',
    desc: 'Industry standard narrative assembly, multi-cam coordination, and pacing.',
    color: 'bg-[#00005c] text-[#9999ff] border-[#3333ff]',
    capabilities: ['Timeline Assembly', 'Audio Syncing', 'Rough Cuts']
  },
  {
    name: 'DaVinci Resolve',
    icon: 'Dr',
    desc: 'Professional color grading, custom nodes, tracking, and HDR mastering.',
    color: 'bg-[#1a0f00] text-[#ff9900] border-[#ff6600]',
    capabilities: ['Color Correction', 'LUTFiles & Grading', 'Delivery Render']
  },
  {
    name: 'After Effects',
    icon: 'Ae',
    desc: 'Kinetic typography, visual tracking, compositing, and advanced VFX transitions.',
    color: 'bg-[#1a0033] text-[#cc66ff] border-[#9900ee]',
    capabilities: ['Visual Effects', '2D/3D Trackers', 'Custom Overlays']
  },
  {
    name: 'Photoshop',
    icon: 'Ps',
    desc: 'Digital asset production, thumbnail design, and visual asset preparation.',
    color: 'bg-[#001f3f] text-[#33a1ff] border-[#0074d9]',
    capabilities: ['Thumbnail Design', 'Image Repair', 'Graphic Assets']
  },
  {
    name: 'Audacity',
    icon: 'Au',
    desc: 'Stereo soundscapes creation, audio cleanup, and ambient audio enhancements.',
    color: 'bg-[#3b0000] text-[#ff4d4d] border-[#ff0000]',
    capabilities: ['Noise Reduction', 'Audio Mastery', 'Foley Layout']
  },
  {
    name: 'Motion Graphics',
    icon: 'Mg',
    desc: 'Title graphics design, typography transitions, and custom templates.',
    color: 'bg-[#00332c] text-[#00ffcc] border-[#2ecc71]',
    capabilities: ['Kinetic Titles', 'Vector Graphics', 'Asset Animation']
  }
];

export default function VideoGrid() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isLightboxMuted, setIsLightboxMuted] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const verticalVideos = VIDEOS.filter((v) => v.category === 'vertical').slice(0, 6);
  const horizontalVideos = VIDEOS.filter((v) => v.category === 'horizontal').slice(0, 5);



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
    <div ref={gridContainerRef} className="select-none">
      {/* 1. SHORTS & REELS SECTION (9:16) - Beige BG */}
      <section className="py-20 bg-brand-cream relative z-10 overflow-hidden">
        
        {/* Background Dot-matrix texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--color-brand-dark)_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        {/* Ambient warm glow spot */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2" />

        {/* Floating background elements */}
        {/* VU volume level indicator */}
        <div className="absolute left-[4%] top-[15%] hidden xl:flex flex-col items-center gap-1 bg-white border-2 border-brand-dark p-2 rounded-2xl shadow-[3px_3px_0px_#1a1614] -rotate-6 hover:rotate-0 transition-transform duration-300 pointer-events-none select-none z-10 animate-pulse">
          <span className="text-[6px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-0.5">VU</span>
          <div className="flex flex-col gap-0.5 w-1">
            <span className="w-1.5 h-1 bg-rose-500 rounded-xs" />
            <span className="w-1.5 h-1 bg-emerald-500 rounded-xs" />
            <span className="w-1.5 h-1 bg-emerald-500 rounded-xs" />
          </div>
        </div>

        {/* Pacing Speed multiplier */}
        <div className="absolute left-[3%] bottom-[25%] hidden xl:flex flex-col items-center gap-0.5 bg-white border-2 border-brand-dark p-2 rounded-xl shadow-[3px_3px_0px_#1a1614] rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-none select-none z-10">
          <span className="text-[5px] font-mono font-black text-zinc-400 uppercase tracking-widest">Speed</span>
          <span className="text-[9px] font-mono font-black text-brand-accent">1.5X</span>
        </div>

        {/* Keyframe Curve */}
        <div className="absolute right-[4%] top-[20%] hidden xl:flex flex-col items-center gap-1 bg-white border-2 border-brand-dark p-2 rounded-xl shadow-[3px_3px_0px_#1a1614] rotate-6 hover:rotate-0 transition-transform duration-300 pointer-events-none select-none z-10">
          <div className="flex items-center gap-1 h-2">
            <span className="w-1 h-1 bg-brand-accent rotate-45 border border-brand-dark/20" />
            <span className="w-4 h-[1px] bg-brand-dark/20" />
            <span className="w-1 h-1 bg-brand-accent rotate-45 border border-brand-dark/20" />
          </div>
          <span className="text-[5px] font-mono font-black text-zinc-400 uppercase tracking-widest font-bold">Key</span>
        </div>

        {/* Timeline Flag Marker */}
        <div className="absolute right-[3%] bottom-[20%] hidden xl:flex flex-col items-center gap-1 bg-white border-2 border-brand-dark p-2.5 rounded-xl shadow-[3px_3px_0px_#1a1614] -rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-none select-none z-10">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-accent">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
          <span className="text-[5px] font-mono font-black text-zinc-400 uppercase tracking-widest mt-0.5">Mark</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center py-6">
            <h3 className="font-display font-black text-5xl sm:text-6xl text-brand-dark uppercase tracking-tighter hover:text-brand-accent transition-colors duration-300 select-none">
              SHORTS & REELS
            </h3>
            <div className="w-16 h-1 bg-brand-accent/45 mx-auto mt-2 rounded" />
          </div>

          <div className="space-y-12">
            {/* Row 1: 4 cards */}
            <div className="project-row flex flex-col md:flex-row gap-8 justify-center items-center">
              {verticalVideos.slice(0, 4).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="project-card w-full max-w-[280px] md:max-w-none md:w-[calc(25%-24px)] group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-brand-dark hover:shadow-[8px_8px_0px_#1a1614] transition-all duration-300 relative aspect-[9/16]"
                  id={`portfolio-card-${video.id}`}
                >
                  {renderVerticalCardVisual(video)}
                </div>
              ))}
            </div>

            {/* Row 2: 2 cards */}
            <div className="project-row flex flex-col md:flex-row gap-8 justify-center items-center">
              {verticalVideos.slice(4, 6).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="project-card w-full max-w-[280px] md:w-[calc(25%-24px)] group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-brand-dark hover:shadow-[8px_8px_0px_#1a1614] transition-all duration-300 relative aspect-[9/16]"
                  id={`portfolio-card-${video.id}`}
                >
                  {renderVerticalCardVisual(video)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMMERCIAL & YOUTUBE SECTION (16:9) - Black BG */}
      <section className="py-24 blueprint-bg-dark text-brand-cream border-t border-b border-brand-dark relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center py-6">
            <h3 className="font-display font-black text-5xl sm:text-6xl text-brand-cream uppercase tracking-tighter hover:text-brand-accent transition-colors duration-300 select-none">
              COMMERCIAL & YOUTUBE
            </h3>
            <div className="w-16 h-1 bg-brand-accent/45 mx-auto mt-2 rounded" />
          </div>

          <div className="space-y-12">
            {/* Row 1: 3 cards */}
            <div className="project-row flex flex-col md:flex-row gap-8 justify-center items-center">
              {horizontalVideos.slice(0, 3).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="project-card w-full max-w-[500px] md:max-w-none md:w-[calc(33.333%-22px)] group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-brand-dark hover:shadow-[8px_8px_0px_#ff6e14] transition-all duration-300 relative aspect-video"
                  id={`portfolio-card-${video.id}`}
                >
                  {renderHorizontalCardVisual(video)}
                </div>
              ))}
            </div>

            {/* Row 2: 2 cards */}
            <div className="project-row flex flex-col md:flex-row gap-8 justify-center items-center">
              {horizontalVideos.slice(3, 5).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="project-card w-full max-w-[500px] md:w-[calc(33.333%-22px)] group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-brand-dark hover:shadow-[8px_8px_0px_#ff6e14] transition-all duration-300 relative aspect-video"
                  id={`portfolio-card-${video.id}`}
                >
                  {renderHorizontalCardVisual(video)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TOOLS & APPS SECTION - Beige BG */}
      <section className="py-20 bg-brand-cream relative z-10 overflow-hidden">
        
        {/* Background Dot-matrix texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--color-brand-dark)_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        {/* Ambient warm glow spot */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2" />

        {/* Render status */}
        <div className="absolute left-[4%] top-[25%] hidden xl:flex flex-col items-center gap-0.5 bg-white border-2 border-brand-dark p-2 rounded-xl shadow-[3px_3px_0px_#1a1614] -rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-none select-none z-10">
          <span className="text-[5px] font-mono font-black text-zinc-400 uppercase tracking-widest">RENDER</span>
          <span className="text-[9px] font-mono font-black text-emerald-500">OK</span>
        </div>

        {/* Ram cache HUD */}
        <div className="absolute left-[3%] bottom-[30%] hidden xl:flex flex-col items-center gap-0.5 bg-white border-2 border-brand-dark p-2.5 rounded-xl shadow-[3px_3px_0px_#1a1614] rotate-6 hover:rotate-0 transition-transform duration-300 pointer-events-none select-none z-10">
          <span className="text-[5px] font-mono font-black text-zinc-400 uppercase tracking-widest">RAM</span>
          <span className="text-[9px] font-mono font-black text-brand-dark">92%</span>
        </div>

        {/* Color LUT Gradient disk */}
        <div className="absolute right-[4%] top-[20%] hidden xl:flex flex-col items-center gap-1 bg-white border-2 border-brand-dark p-2 rounded-xl shadow-[3px_3px_0px_#1a1614] rotate-6 hover:rotate-0 transition-transform duration-300 pointer-events-none select-none z-10">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-500 via-emerald-400 to-sky-400 border border-brand-dark/20 animate-[spin_10s_linear_infinite]" />
          <span className="text-[5px] font-mono font-black text-zinc-400 uppercase tracking-widest mt-0.5">LUT</span>
        </div>

        {/* Timecode mini-panel */}
        <div className="absolute right-[3%] bottom-[25%] hidden xl:flex flex-col items-center gap-0.5 bg-white border-2 border-brand-dark p-2 rounded-xl shadow-[3px_3px_0px_#1a1614] -rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-none select-none z-10">
          <span className="text-[5px] font-mono font-black text-zinc-400 uppercase tracking-widest">TIMECODE</span>
          <span className="text-[9px] font-mono font-black text-brand-accent">00:05:12</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center py-6">
            <h3 className="font-display font-black text-5xl sm:text-6xl text-brand-dark uppercase tracking-tighter hover:text-brand-accent transition-colors duration-300 select-none">
              TOOLS & APPS
            </h3>
            <div className="w-16 h-1 bg-brand-accent/45 mx-auto mt-2 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOOLS.map((tool, idx) => (
              <div 
                key={idx} 
                className="bg-white border-2 border-brand-dark p-6 sm:p-8 rounded-3xl shadow-[6px_6px_0px_#1a1614] hover:shadow-[3px_3px_0px_#1a1614] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Technical dot overlay inside cards */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#1a1614_1px,transparent_1px)] [background-size:12px_12px]" />
                
                <div className="space-y-4 relative z-10">
                  {/* Header: Icon badge and Name */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-display text-2xl font-black select-none ${tool.color}`}>
                      {tool.icon}
                    </div>
                    <h4 className="font-display font-extrabold text-xl sm:text-2xl text-brand-dark uppercase tracking-tight leading-none">
                      {tool.name}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-sans text-zinc-600 leading-relaxed font-bold uppercase tracking-tight">
                    {tool.desc}
                  </p>
                </div>

                {/* Capabilities list */}
                <div className="mt-6 pt-4 border-t border-brand-dark/10 flex flex-wrap gap-1.5 relative z-10">
                  {tool.capabilities.map((cap, i) => (
                    <span 
                      key={i} 
                      className="text-[9px] font-mono font-bold uppercase bg-brand-cream/40 text-brand-dark border border-brand-dark/10 px-2 py-0.5 rounded"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Lightbox Modal Window */}
      <AnimatePresence>
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto"
            onClick={() => setSelectedVideo(null)}
            id="lightbox-backdrop"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              // Responsive max-width scales:
              // - 9:16 vertical clips map to a narrow phone-like layout (max-w-[380px])
              // - 16:9 widescreen clips map to a landscape video stage (max-w-3xl)
              className={`bg-white text-brand-dark rounded-3xl border-4 border-brand-dark shadow-[10px_10px_0px_#1a1614] overflow-hidden w-full relative flex flex-col p-4 gap-4 ${
                selectedVideo.aspectRatio === '9:16' ? 'max-w-[380px]' : 'max-w-3xl'
              }`}
              id="lightbox-container"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 right-3 p-2 bg-white hover:bg-brand-accent hover:text-white text-brand-dark rounded-full z-50 border-2 border-brand-dark shadow-[2px_2px_0px_#1a1614] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                id="lightbox-close-btn"
              >
                <X size={14} />
              </button>

              {/* Video Player Stage */}
              <div className={`w-full bg-brand-cream/35 border-2 border-brand-dark rounded-2xl overflow-hidden flex items-center justify-center relative ${
                selectedVideo.aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[70vh]' : 'aspect-video'
              }`} id="lightbox-video-stage">
                <video
                  src={selectedVideo.videoUrl}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  loop
                  muted={isLightboxMuted}
                  playsInline
                />
              </div>

              {/* Minimal Info Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] bg-brand-accent text-white font-mono tracking-widest font-black px-2 py-0.5 rounded uppercase">
                      {selectedVideo.tag}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {selectedVideo.aspectRatio === '9:16' ? '9:16 vertical' : '16:9 widescreen'}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-black tracking-tight uppercase leading-none text-brand-dark">
                    {selectedVideo.title}
                  </h3>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => setIsLightboxMuted(!isLightboxMuted)}
                    className="text-[9px] font-mono font-bold text-brand-dark bg-brand-cream/60 hover:bg-brand-cream border-2 border-brand-dark px-3 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <Music size={12} className="text-brand-accent" />
                    {isLightboxMuted ? 'UNMUTE' : 'MUTE SOUND'}
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
