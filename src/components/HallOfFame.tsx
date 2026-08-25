import React from 'react';
import { Trophy, Award, Crown, Sparkles, Shield, Star, Flag } from 'lucide-react';
import { HALL_OF_FAME_DATA } from '../data/racingData';

export const HallOfFame: React.FC = () => {
  return (
    <section id="hall-of-fame" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>LEGENDS & HERITAGE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            THE APEX TROPHY & HALL OF FAME <span className="text-amber-400 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Forged from aerospace-grade titanium and carbon fiber, the Apex World Drivers Trophy represents the highest pinnacle of motorsport mastery.
          </p>
        </div>
      </div>

      {/* Featured Trophy Hero Display Card */}
      <div className="relative bg-white/5 border border-amber-400/40 p-6 sm:p-10 mb-10 shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Trophy Illustration Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative w-44 h-60 sm:w-52 sm:h-68 bg-black/60 border-2 border-amber-400/60 p-6 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.2)]">
              <Crown className="w-10 h-10 text-amber-400 mb-2 animate-bounce" style={{ animationDuration: '3s' }} />
              <Trophy className="w-20 h-20 text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
              <div className="mt-3 font-heading text-[11px] font-black italic uppercase tracking-widest text-amber-300">
                APEX WORLD CHAMPIONSHIP
              </div>
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-widest mt-0.5">
                TITANIUM • GOLD • CARBON
              </div>
            </div>
          </div>

          {/* Trophy Lore & Specifications */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-400/10 text-amber-400 font-telemetry text-[10px] font-bold border border-amber-400/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>THE ULTIMATE PRIZE</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tight">
              THE APEX WORLD CHAMPION CUP
            </h3>
            <p className="text-white/70 text-xs leading-relaxed font-telemetry">
              Awarded annually to the driver who amasses the highest total points across the global tour. Handcrafted over 300 precision hours, its twin spiraling pillars symbolize raw velocity and strategic aerodynamic downforce.
            </p>

            <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-white/10 font-telemetry text-xs">
              <div className="p-2.5 bg-black/40 border border-white/10">
                <span className="text-white/40 text-[9px] uppercase block font-bold">WEIGHT</span>
                <span className="font-bold text-white text-xs">8.4 KG</span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/10">
                <span className="text-white/40 text-[9px] uppercase block font-bold">HEIGHT</span>
                <span className="font-bold text-white text-xs">68.5 CM</span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/10">
                <span className="text-white/40 text-[9px] uppercase block font-bold">COMPOSITION</span>
                <span className="font-bold text-amber-400 text-xs">24K TITANIUM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Champions Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="font-heading text-xl font-black italic uppercase text-white">
              CHRONOLOGY OF CHAMPIONS
            </h3>
          </div>
          <span className="text-[10px] font-telemetry text-white/40 uppercase tracking-widest">2022 – 2026 REIGNING ERA</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {HALL_OF_FAME_DATA.map((champ) => (
            <div
              key={champ.year}
              className="p-4 bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-lg group backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-telemetry text-xl font-black italic text-amber-400 group-hover:scale-105 transition-transform">
                  {champ.year}
                </span>
                <Trophy className="w-3.5 h-3.5 text-amber-400/60 group-hover:text-amber-400 transition-colors" />
              </div>

              <h4 className="font-heading text-lg font-black italic uppercase text-white mb-0.5 group-hover:text-amber-300 transition-colors">
                {champ.champion}
              </h4>
              <div className="text-[10px] text-white/50 font-telemetry font-bold mb-3">
                {champ.team} • {champ.nationality}
              </div>

              <div className="p-2 bg-black/40 border border-white/5 space-y-1 text-xs font-telemetry">
                <div className="flex justify-between text-white/50 text-[10px]">
                  <span>POINTS:</span>
                  <span className="font-bold text-white">{champ.points} PTS</span>
                </div>
                <div className="flex justify-between text-white/50 text-[10px]">
                  <span>WINS:</span>
                  <span className="font-bold text-amber-400">{champ.wins} WINS</span>
                </div>
                <div className="text-[9px] text-white/40 pt-1 border-t border-white/5">
                  <span className="text-white/40 block font-bold">RUNNER UP:</span>
                  <span className="text-white/70">{champ.runnerUp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

