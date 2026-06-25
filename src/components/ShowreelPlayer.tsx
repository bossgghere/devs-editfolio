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
        <div className="flex items-center gap-3">
          <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded border border-brand-accent/30 flex items-center gap-1 animate-pulse">
            <span className="w-1 h-1 rounded-full bg-brand-accent"></span>
            ACTIVE PROJECT
          </span>
          <span className="hidden sm:inline">1080p | 60 FPS</span>
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

      {/* Editor/Grading Interactive Control Console Tabs */}
      <div className="bg-[#101010] p-4 border-t border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          
          {/* Workspace Tabs */}
          <div className="flex bg-[#181818] p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === 'timeline' 
                  ? 'bg-brand-accent text-white font-medium shadow' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Clock size={13} />
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('grading')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === 'grading' 
                  ? 'bg-brand-accent text-white font-medium shadow' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sliders size={13} />
              Color Grade
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === 'audio' 
                  ? 'bg-brand-accent text-white font-medium shadow' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity size={13} />
              Workspace Controls
            </button>
          </div>

          {/* Quick info / status */}
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>RENDER ENGINE ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Tab Content Areas */}
        <div className="bg-[#161616] rounded-xl p-4 border border-white/5">
          {activeTab === 'timeline' && (
            <div>
              <p className="text-xs text-zinc-400 mb-3 font-sans">
                Jump directly to different cinematic milestones in Dev's edit timeline. Witness precision timing, sound coordination, and paced scene assembly.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {CHAPTERS.map((chapter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChapterJump(chapter.time)}
                    className={`p-3 rounded-lg text-left border font-mono transition-all group ${
                      activeChapter === idx 
                        ? 'bg-zinc-800/80 border-brand-accent text-white shadow' 
                        : 'bg-[#1e1e1e] border-white/5 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-[10px] text-brand-accent mb-1 font-bold">CHAPTER 0{idx+1}</div>
                    <div className="text-xs font-medium truncate">{chapter.label.split(' - ')[1]}</div>
                    <div className="text-[10px] text-zinc-500 mt-1">{chapter.label.split(' - ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'grading' && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-xs font-bold font-mono text-zinc-300 uppercase mb-1">Interactive Grading Simulator</h4>
                  <p className="text-xs text-zinc-400">
                    Use the split-slider to compare RAW Log-profile footage directly with Dev's customized cinematic color grade grade.
                  </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => setIsColorGraded(true)}
                    className={`flex-1 md:flex-initial px-3 py-1.5 rounded text-xs font-mono border transition-all ${
                      isColorGraded 
                        ? 'bg-brand-accent/20 border-brand-accent text-white' 
                        : 'bg-[#1c1c1c] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Cinematic Graded
                  </button>
                  <button
                    onClick={() => setIsColorGraded(false)}
                    className={`flex-1 md:flex-initial px-3 py-1.5 rounded text-xs font-mono border transition-all ${
                      !isColorGraded 
                        ? 'bg-zinc-800 border-zinc-600 text-white' 
                        : 'bg-[#1c1c1c] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Flat Log Profile
                  </button>
                </div>
              </div>
              <div className="mt-4 bg-[#1e1e1e] p-3 rounded-lg border border-white/5 flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-zinc-500">GRADING CONTROL MATRIX</span>
                <div className="flex items-center gap-6 text-[11px] font-mono text-zinc-400 flex-wrap">
                  <div>LUT: <span className="text-brand-accent font-bold">KODAK_2383_EX</span></div>
                  <div>Contrast: <span className="text-white">+12%</span></div>
                  <div>Saturation: <span className="text-white">130%</span></div>
                  <div>Highlight Roll-Off: <span className="text-white">Soft</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div>
              <h4 className="text-xs font-bold font-mono text-zinc-300 uppercase mb-1.5">Speed, Audio & Track Controls</h4>
              <p className="text-xs text-zinc-400 mb-3">
                Experience speed ramping directly by shifting playback speeds, or mute and isolate pacing tracks to focus purely on optical cutting.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {/* Speed buttons */}
                <div className="flex items-center gap-1.5 bg-[#1e1e1e] p-1 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 px-2 uppercase">SPEED</span>
                  {[0.5, 1, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => changeSpeed(speed)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                        playbackSpeed === speed 
                          ? 'bg-brand-accent text-white font-bold' 
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                {/* Reset button */}
                <button
                  onClick={() => handleChapterJump(0)}
                  className="flex items-center gap-1.5 bg-[#1e1e1e] border border-white/5 px-3 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:text-white transition-all hover:bg-zinc-800"
                >
                  <RotateCcw size={13} />
                  Reset Timeline
                </button>
              </div>
            </div>
          )}
        </div>
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
            <span className="hidden sm:inline bg-zinc-800 px-2 py-1 rounded text-zinc-400 border border-white/5">
              SCRUB MODE: ACTIVE
            </span>
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
