import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Flag,
  Gauge,
  Users,
  Timer,
  Compass,
  ArrowUpRight,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NextRaceCountdownProps {
  onViewTrackMap?: () => void;
  onOpenTrackModal?: () => void;
  onLaunchSimulation?: () => void;
}

export const NextRaceCountdown: React.FC<NextRaceCountdownProps> = ({
  onViewTrackMap,
  onOpenTrackModal,
  onLaunchSimulation,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 6,
    minutes: 42,
    seconds: 15,
  });

  const handleTrackClick = () => {
    soundFX.playTelemetryClick();
    if (onOpenTrackModal) onOpenTrackModal();
    else if (onViewTrackMap) onViewTrackMap();
    else {
      const el = document.getElementById('calendar');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSimClick = () => {
    soundFX.playTelemetryClick();
    if (onLaunchSimulation) onLaunchSimulation();
    else {
      const el = document.getElementById('race-control');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const targetDate = new Date('2026-09-12T20:00:00+08:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 18, hours: 6, minutes: 42, seconds: 15 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="next-race-countdown" className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      <div className="relative overflow-hidden bg-black/60 border border-white/10 p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl">
        {/* Subtle red corner glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Grand Prix Details */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest skew-x-[-12deg]">
                <span className="skew-x-[12deg]">NEXT GRAND PRIX</span>
              </span>
              <span className="text-[10px] font-telemetry text-white/50 flex items-center gap-1 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                ROUND 4 OF 10
              </span>
            </div>

            <div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase text-white tracking-tighter">
                SINGAPORE STREET CIRCUIT <span className="text-red-600 font-normal">///</span>
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-300 text-xs font-telemetry">
                <div className="flex items-center gap-1.5 text-red-500 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>12 SEP 2026</span>
                </div>
                <span className="text-white/20">•</span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-white/40" />
                  <span>Marina Bay, Singapore</span>
                </div>
                <span className="text-white/20">•</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 text-[10px] tracking-wider">
                  NIGHT GP
                </span>
              </div>
            </div>

            {/* Spec Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-white/5 border border-white/10 hover:border-red-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">
                  <Flag className="w-3 h-3 text-red-500" />
                  <span>TOTAL LAPS</span>
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-black italic text-white">58 LAPS</div>
                <div className="text-[10px] text-white/40 font-telemetry">198.4 KM Total</div>
              </div>

              <div className="p-3.5 bg-white/5 border border-white/10 hover:border-red-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">
                  <Gauge className="w-3 h-3 text-blue-400" />
                  <span>TRACK LENGTH</span>
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-black italic text-white">3.421 KM</div>
                <div className="text-[10px] text-white/40 font-telemetry">19 Turns / 3 DRS</div>
              </div>

              <div className="p-3.5 bg-white/5 border border-white/10 hover:border-red-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span>GRID CAPACITY</span>
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-black italic text-white">20 CARS</div>
                <div className="text-[10px] text-white/40 font-telemetry">10 Factions</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="next-race-view-track-btn"
                onClick={handleTrackClick}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-heading text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-red-500" />
                <span>EXPLORE TRACK MAP & SECTORS</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
              </button>

              <button
                id="next-race-sim-cta"
                onClick={handleSimClick}
                className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 border border-red-500/40 font-heading text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>LAUNCH SIMULATOR</span>
              </button>
            </div>
          </div>

          {/* Right Column: High Contrast Digital Countdown Matrix */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 bg-black/80 border border-red-600/40 shadow-inner">
            <div className="flex items-center gap-2 mb-4 text-[10px] font-black tracking-[0.2em] uppercase text-red-500">
              <Timer className="w-4 h-4 animate-spin text-red-500" style={{ animationDuration: '6s' }} />
              <span>OFFICIAL RACE START COUNTDOWN</span>
            </div>

            {/* Countdown Digits Matrix */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
              {/* Days */}
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/5 border border-white/10">
                <span className="font-telemetry text-3xl sm:text-4xl lg:text-5xl font-black italic text-white tracking-tight">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold text-white/40 mt-1 tracking-wider">
                  DAYS
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/5 border border-white/10">
                <span className="font-telemetry text-3xl sm:text-4xl lg:text-5xl font-black italic text-white tracking-tight">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold text-white/40 mt-1 tracking-wider">
                  HOURS
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/5 border border-white/10">
                <span className="font-telemetry text-3xl sm:text-4xl lg:text-5xl font-black italic text-white tracking-tight">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold text-white/40 mt-1 tracking-wider">
                  MINS
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center p-3 sm:p-4 bg-red-600/10 border border-red-600/60 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 animate-pulse" />
                <span className="font-telemetry text-3xl sm:text-4xl lg:text-5xl font-black italic text-red-500 tracking-tight">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold text-red-400 mt-1 tracking-wider">
                  SECS
                </span>
              </div>
            </div>

            <div className="mt-4 text-center text-[10px] text-white/40 font-telemetry tracking-wider uppercase">
              Track Temp: <span className="text-white font-bold">31°C</span> • Humidity:{' '}
              <span className="text-white font-bold">78%</span> • Risk:{' '}
              <span className="text-emerald-400 font-bold">15% DRY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

