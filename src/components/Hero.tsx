import React, { useState } from 'react';
import { ChevronDown, Trophy, Users, Zap, Play, Volume2, ShieldAlert, Flag, Activity } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface HeroProps {
  onExploreChampionship?: () => void;
  onExploreTeams?: () => void;
  onScrollToNextRace?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreChampionship,
  onExploreTeams,
  onScrollToNextRace,
}) => {
  const [isRevving, setIsRevving] = useState(false);

  const handleRevEngine = () => {
    setIsRevving(true);
    soundFX.playEngineRev(1.1);
    setTimeout(() => setIsRevving(false), 900);
  };

  const handleScroll = (targetId: string) => {
    soundFX.playTelemetryClick();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050505]"
    >
      {/* Immersive radial atmospheric lighting */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #E10600 0%, transparent 45%), radial-gradient(circle at 80% 70%, #222222 0%, transparent 55%)',
        }}
      />

      {/* Cinematic Night Racing Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=90"
          alt="Apex Racing Championship Night Race"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.35] contrast-125 saturate-110"
        />

        {/* Dynamic Dark Gradients & Light Streaks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/50 to-[#050505]/90" />
        <div className="absolute inset-0 opacity-10 pointer-events-none racing-grid" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Season Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest mb-6 skew-x-[-12deg] shadow-lg shadow-red-600/30">
          <span className="skew-x-[12deg] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>SEASON 2026 • ROUND 4 MARINA BAY NIGHT GP</span>
          </span>
        </div>

        {/* Primary Championship Title */}
        <h1
          id="hero-title"
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase leading-[0.88] text-white drop-shadow-2xl"
        >
          <span className="block tracking-tighter">
            APEX <span className="text-red-600">//</span> RACING
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-white mt-1">
            CHAMPIONSHIP
          </span>
        </h1>

        {/* Tagline */}
        <div className="mt-4 flex flex-col items-center">
          <p className="font-heading text-xl sm:text-2xl md:text-3xl font-black italic uppercase tracking-tight text-slate-100 drop-shadow-md">
            PUSH THE LIMIT. <span className="text-red-600 font-black">OWN THE TRACK.</span>
          </p>
          <p className="text-[10px] sm:text-xs font-telemetry uppercase tracking-[0.25em] text-white/50 mt-1 font-bold">
            SPEED • STRATEGY • PRECISION • ZERO-DRAG MASTERY
          </p>
        </div>

        {/* Official Description */}
        <p className="mt-5 max-w-2xl text-slate-300/80 text-xs sm:text-sm sm:leading-relaxed font-light drop-shadow">
          Experience the pinnacle of virtual single-seater engineering. High-downforce aerodynamics, thousand-horsepower hybrid engines, and world-class driver mastery across iconic global circuits.
        </p>

        {/* Main CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            id="hero-view-championship-btn"
            onClick={() => {
              soundFX.playTelemetryClick();
              if (onExploreChampionship) onExploreChampionship();
              else handleScroll('standings');
            }}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-7 py-3.5 uppercase tracking-widest skew-x-[-12deg] transition-all transform hover:scale-105 shadow-xl shadow-red-600/40 flex items-center gap-2 cursor-pointer"
          >
            <span className="skew-x-[12deg] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-white" />
              <span>CHAMPIONSHIP STANDINGS</span>
            </span>
          </button>

          <button
            id="hero-explore-teams-btn"
            onClick={() => {
              soundFX.playTelemetryClick();
              if (onExploreTeams) onExploreTeams();
              else handleScroll('teams');
            }}
            className="bg-white/5 hover:bg-white/10 text-white text-xs font-black px-6 py-3.5 uppercase tracking-widest border border-white/15 hover:border-white/30 backdrop-blur-md transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-red-500" />
            <span>EXPLORE CONSTRUCTORS</span>
          </button>

          {/* Interactive RPM Engine Sound Rev Trigger */}
          <button
            id="hero-rev-engine-btn"
            onClick={handleRevEngine}
            title="Click to rev the turbocharged V6 engine"
            className={`px-5 py-3.5 bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white font-telemetry text-xs tracking-wider border border-red-500/30 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              isRevving ? 'bg-red-600/40 border-red-500 ring-2 ring-red-500 shadow-lg shadow-red-600/50' : ''
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isRevving ? 'text-red-400 animate-bounce' : 'text-red-500'}`} />
            <span className="font-bold">{isRevving ? '14,800 RPM // BOOST' : 'V6 ENGINE REV'}</span>
          </button>
        </div>

        {/* Featured Telemetry Ticker Ribbon */}
        <div className="mt-10 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-white/10 p-3 sm:p-4 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center p-3 bg-black/40 border border-white/5">
            <span className="text-[9px] font-black uppercase text-red-500 tracking-widest mb-0.5">TOP SPEED</span>
            <span className="font-telemetry text-2xl font-black italic text-white">356 KM/H</span>
            <span className="text-[8px] opacity-40 uppercase font-bold tracking-tighter">Marina Bay Straight</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-black/40 border border-white/5">
            <span className="text-[9px] font-black uppercase text-red-500 tracking-widest mb-0.5">0-100 KM/H</span>
            <span className="font-telemetry text-2xl font-black italic text-white">2.4s</span>
            <span className="text-[8px] opacity-40 uppercase font-bold tracking-tighter">Twin-Turbo Hybrid</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-black/40 border border-white/5">
            <span className="text-[9px] font-black uppercase text-red-500 tracking-widest mb-0.5">POWER UNIT</span>
            <span className="font-telemetry text-2xl font-black italic text-red-500">1,055 HP</span>
            <span className="text-[8px] opacity-40 uppercase font-bold tracking-tighter">@ 12,500 RPM</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-black/40 border border-white/5">
            <span className="text-[9px] font-black uppercase text-red-500 tracking-widest mb-0.5">FASTEST PIT</span>
            <span className="font-telemetry text-2xl font-black italic text-emerald-400">1.82s</span>
            <span className="text-[8px] opacity-40 uppercase font-bold tracking-tighter">Titan Racing Record</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          id="hero-scroll-indicator"
          onClick={() => {
            if (onScrollToNextRace) onScrollToNextRace();
            else handleScroll('next-race-countdown');
          }}
          className="mt-10 flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to Next Race Countdown"
        >
          <span className="text-[9px] font-telemetry tracking-[0.2em] uppercase group-hover:text-red-500 transition-colors">
            TELEMETRY MATRIX
          </span>
          <div className="w-4 h-7 rounded-full border border-white/20 group-hover:border-red-500 flex items-start justify-center p-0.5 transition-colors">
            <div className="w-1 h-1.5 bg-red-600 rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

