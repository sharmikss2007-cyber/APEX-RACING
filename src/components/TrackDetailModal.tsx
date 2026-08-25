import React from 'react';
import { X, MapPin, Calendar, Flag, Gauge, Wind, Activity, Timer, Zap, Compass } from 'lucide-react';
import { CalendarRace } from '../types';

interface TrackDetailModalProps {
  race: CalendarRace | null;
  onClose: () => void;
}

export const TrackDetailModal: React.FC<TrackDetailModalProps> = ({ race, onClose }) => {
  if (!race) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0c] border border-white/20 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close Track Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <span>ROUND {race.round} OF 10</span>
            <span>•</span>
            <span>{race.country.toUpperCase()}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight">
            {race.circuit}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs font-telemetry text-white/50 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {race.location}, {race.country}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-white/40" />
              {race.date}
            </span>
          </div>
        </div>

        {/* Stylized Circuit Track Map SVG */}
        <div className="relative bg-black/60 border border-white/10 p-5 mb-5 overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute top-3.5 left-4 text-[9px] font-telemetry text-white/40 uppercase tracking-widest">
            CIRCUIT LAYOUT • SECTORS 1, 2 & 3
          </div>
          <div className="absolute top-3.5 right-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[9px] font-telemetry text-emerald-400 uppercase font-black tracking-widest">DRS ZONES: {race.drsZones}</span>
          </div>

          {/* Stylized Modern High-Tech Vector Circuit Map */}
          <div className="w-full max-w-lg h-60 sm:h-64 my-2 flex items-center justify-center relative">
            <svg
              viewBox="0 0 500 320"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circuit Grid Backing */}
              <defs>
                <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Asphalt Foundation Track Line */}
              <path
                d="M 60 220 C 50 140, 90 70, 170 60 C 230 50, 260 90, 310 80 C 370 70, 440 100, 440 160 C 440 220, 380 260, 300 260 C 240 260, 210 210, 160 210 C 120 210, 80 250, 60 220 Z"
                fill="none"
                stroke="#1f2433"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Glowing High-Speed Racing Line */}
              <path
                d="M 60 220 C 50 140, 90 70, 170 60 C 230 50, 260 90, 310 80 C 370 70, 440 100, 440 160 C 440 220, 380 260, 300 260 C 240 260, 210 210, 160 210 C 120 210, 80 250, 60 220 Z"
                fill="none"
                stroke="url(#trackGrad)"
                strokeWidth="5"
                filter="url(#glow)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Pit Lane Path */}
              <path
                d="M 120 215 Q 160 235 200 215"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeDasharray="4 4"
              />

              {/* Start / Finish Line */}
              <line x1="60" y1="205" x2="60" y2="235" stroke="#ffffff" strokeWidth="4" />
              <text x="35" y="248" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
                START / FINISH
              </text>

              {/* Turn Number Markers */}
              <circle cx="170" cy="60" r="8" fill="#ef4444" />
              <text x="170" y="63" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">T1</text>

              <circle cx="310" cy="80" r="8" fill="#f59e0b" />
              <text x="310" y="83" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">T7</text>

              <circle cx="440" cy="160" r="8" fill="#3b82f6" />
              <text x="440" y="163" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">T14</text>

              <circle cx="300" cy="260" r="8" fill="#10b981" />
              <text x="300" y="263" fill="#ffffff" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">T19</text>

              {/* DRS Zone Indicator Labels */}
              <rect x="200" y="45" width="60" height="14" rx="2" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
              <text x="230" y="55" fill="#10b981" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">DRS ZONE 1</text>

              <rect x="360" y="245" width="60" height="14" rx="2" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
              <text x="390" y="255" fill="#10b981" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">DRS ZONE 2</text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] font-telemetry text-white/60 pt-2 border-t border-white/5 w-full">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Sector 1 (Speed)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Sector 2 (Technical)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Sector 3 (Chicane)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Pit Lane (20s Delta)
            </span>
          </div>
        </div>

        {/* Detailed Circuit Metrics Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">CIRCUIT LENGTH</div>
            <div className="font-heading text-xl font-black italic text-white">{race.circuitLength} KM</div>
            <div className="text-[9px] text-white/30 font-telemetry">Lap Distance</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">TOTAL LAPS</div>
            <div className="font-heading text-xl font-black italic text-white">{race.laps} LAPS</div>
            <div className="text-[9px] text-white/30 font-telemetry">{race.totalDistance} KM Race</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">TOTAL CORNERS</div>
            <div className="font-heading text-xl font-black italic text-amber-400">{race.corners} CORNERS</div>
            <div className="text-[9px] text-white/30 font-telemetry">{race.drsZones} DRS Zones</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">ELEVATION DELTA</div>
            <div className="font-heading text-xl font-black italic text-emerald-400">{race.elevationChange} M</div>
            <div className="text-[9px] text-white/30 font-telemetry">Crest & Dip Variance</div>
          </div>
        </div>

        {/* Lap Record & Previous Winner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-telemetry">
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-white/40 uppercase text-[9px] tracking-wider mb-1">ALL-TIME CIRCUIT LAP RECORD</div>
            <div className="text-lg font-black italic text-white mb-0.5 font-telemetry">{race.lapRecord.time}</div>
            <div className="text-white/60 text-xs">
              Set by {race.lapRecord.driver} ({race.lapRecord.year})
            </div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-white/40 uppercase text-[9px] tracking-wider mb-1">PREVIOUS GRAND PRIX WINNER</div>
            <div className="text-lg font-black italic text-amber-400 mb-0.5 font-telemetry">{race.previousWinner.driver}</div>
            <div className="text-white/60 text-xs">
              {race.previousWinner.team} ({race.previousWinner.year})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

