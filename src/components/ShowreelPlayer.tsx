import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sliders, Volume2, VolumeX, Maximize, Clock, Scissors, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CHAPTERS = [
  { time: 0, label: "0:00 - High-Impact Intro" },
  { time: 8, label: "0:08 - Sound Design Build" },
  { time: 16, label: "0:16 - Advanced Speed Ramp" },
  { time: 24, label: "0:24 - Cinematic Color Grade" },
];

export default function ShowreelPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isColorGraded, setIsColorGraded] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeTab, setActiveTab] = useState<'timeline' | 'grading' | 'audio'>('timeline');

  // Interactive slider value (0 to 100) for splitting RAW and GRADED footage side-by-side
  const [gradingSplit, setGradingSplit] = useState(50);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-futuristic-city-with-flying-cars-45037-large.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);

      // Find active chapter
      const currentChapterIndex = CHAPTERS.reduce((acc, chapter, idx) => {
        if (video.currentTime >= chapter.time) return idx;
        return acc;
      }, 0);
      setActiveChapter(currentChapterIndex);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleChapterJump = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    if (!isPlaying) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const changeSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const handleFullScreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen().catch(() => {});
    }
  };

  // Helper to format time strings
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div id="showreel-section" className="bg-brand-dark text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      
      {/* Header bar styled like editing software header */}
      <div className="bg-[#141414] px-4 py-2 flex items-center justify-between border-b border-white/5 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-zinc-300">dev_jena_showreel_2026_v4.mp4</span>
        </div>

      </div>

      {/* Main Split Screen Video Container */}
      <div 
        ref={containerRef} 
        className="relative aspect-video bg-black group flex items-center justify-center overflow-hidden"
      >
        {/* Graded video track (Main layer) */}
        <video
          ref={videoRef}
          src={videoUrl}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isColorGraded 
              ? 'saturate-[1.3] contrast-[1.12] brightness-[1.04] sepia-[0.05] hue-rotate-[4deg]' 
              : 'saturate-[0.55] contrast-[0.85] brightness-[1.12] opacity-80'
          }`}
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlay}
        />

        {/* Dynamic Slit Color Grade Overlay (Comparison) */}
        {activeTab === 'grading' && (
          <div 
            className="absolute top-0 left-0 bottom-0 pointer-events-none border-r-2 border-brand-accent overflow-hidden"
            style={{ width: `${gradingSplit}%` }}
          >
            {/* Duplicate RAW Video in background container to show comparison side-by-side */}
            <div 
              className="absolute top-0 left-0 bottom-0 w-full"
              style={{ width: containerRef.current?.clientWidth || '100vw' }}
            >
              <video
                src={videoUrl}
                className="absolute top-0 left-0 w-full h-full object-cover saturate-[0.4] contrast-[0.8] brightness-[1.15]"
                muted
                playsInline
                style={{
                  currentTime: currentTime
                }}
              />
              <div className="absolute top-4 left-4 bg-brand-dark/80 px-2 py-1 text-[10px] font-mono tracking-widest uppercase border border-white/10 rounded">
                RAW FOOTAGE
              </div>
            </div>
          </div>
        )}

        {/* Highlight badge for active mode */}
        {activeTab === 'grading' && (
          <div className="absolute top-4 right-4 bg-brand-accent px-2 py-1 text-[10px] font-mono tracking-widest uppercase rounded z-10">
            COLOR GRADED
          </div>
        )}

        {/* Playback icon overlays */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={togglePlay}
              className="absolute p-6 rounded-full bg-brand-accent/90 hover:bg-brand-accent text-white shadow-xl hover:scale-115 transition-all z-20"
              id="main-play-btn"
            >
              <Play size={32} fill="white" className="ml-1" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Interactive splitter drag bar */}
        {activeTab === 'grading' && (
          <input
            type="range"
            min="0"
            max="100"
            value={gradingSplit}
            onChange={(e) => setGradingSplit(parseInt(e.target.value))}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        )}
      </div>



      {/* Main Video Controls Bar */}
      <div className="bg-[#121212] p-4 flex flex-col gap-3 border-t border-white/5">
        {/* Timeline track scrubbing */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400 min-w-[35px]">{formatTime(currentTime)}</span>
          <div className="flex-1 relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleSeek}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
            {/* Chapter markers displayed directly on timeline track */}
            {duration > 0 && CHAPTERS.map((chapter, idx) => (
              <div 
                key={idx}
                className="absolute w-1.5 h-1.5 rounded-full bg-brand-accent/80 border border-white/40 cursor-pointer transform -translate-x-1/2 hover:scale-150 transition-all"
                style={{ left: `${(chapter.time / duration) * 100}%` }}
                title={chapter.label}
                onClick={() => handleChapterJump(chapter.time)}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-zinc-400 min-w-[35px]">{formatTime(duration)}</span>
        </div>

        {/* Action icons row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-all"
              title={isPlaying ? 'Pause' : 'Play'}
              id="timeline-play-btn"
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} fill="white" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-all"
              title={isMuted ? 'Unmute' : 'Mute'}
              id="timeline-volume-btn"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">

            <button
              onClick={handleFullScreen}
              className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-all"
              title="Full Screen"
              id="timeline-fullscreen-btn"
            >
              <Maximize size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
