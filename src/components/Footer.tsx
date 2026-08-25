import React, { useState } from 'react';
import { Flag, ArrowUp, Send, CheckCircle2, Shield, Heart } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    soundFX.playTelemetryClick();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToTop = () => {
    soundFX.playTelemetryClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020203] border-t border-white/10 pt-12 pb-10 text-white/50">
      {/* Decorative top red accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Column 1 & 2: Brand Lore */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/50">
                <Flag className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-black italic text-2xl tracking-tighter uppercase text-white">
                APEX <span className="text-red-600">RACING</span>
              </span>
            </div>

            <p className="text-[10px] font-telemetry font-black uppercase tracking-[0.2em] text-red-500">
              PUSH THE LIMIT. OWN THE TRACK.
            </p>

            <p className="text-xs text-white/50 leading-relaxed max-w-sm font-telemetry">
              The pinnacle of virtual single-seater engineering. High-downforce aerodynamics, thousand-horsepower hybrid engines, and world-class driver mastery across iconic global circuits.
            </p>

            <div className="text-[10px] font-telemetry text-white/30 tracking-widest uppercase">
              SPEED • STRATEGY • PRECISION
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="font-heading text-xs font-black italic uppercase tracking-wider text-white mb-3">
              CHAMPIONSHIP
            </h4>
            <ul className="space-y-1.5 text-xs font-telemetry text-white/50">
              <li>
                <a href="#standings" className="hover:text-red-500 transition-colors">
                  World Standings
                </a>
              </li>
              <li>
                <a href="#teams" className="hover:text-red-500 transition-colors">
                  Constructor Lineup
                </a>
              </li>
              <li>
                <a href="#drivers" className="hover:text-red-500 transition-colors">
                  Driver Profiles
                </a>
              </li>
              <li>
                <a href="#cars" className="hover:text-red-500 transition-colors">
                  The Machines
                </a>
              </li>
              <li>
                <a href="#configurator" className="hover:text-red-500 transition-colors">
                  Car Configurator
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Racing Operations */}
          <div>
            <h4 className="font-heading text-xs font-black italic uppercase tracking-wider text-white mb-3">
              RACE OPERATIONS
            </h4>
            <ul className="space-y-1.5 text-xs font-telemetry text-white/50">
              <li>
                <a href="#race-control" className="hover:text-red-500 transition-colors">
                  Live Race Simulator
                </a>
              </li>
              <li>
                <a href="#calendar" className="hover:text-red-500 transition-colors">
                  Championship Calendar
                </a>
              </li>
              <li>
                <a href="#strategy" className="hover:text-red-500 transition-colors">
                  Pit Strategy Calculator
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-red-500 transition-colors">
                  Race Results & Archive
                </a>
              </li>
              <li>
                <a href="#fan-zone" className="hover:text-red-500 transition-colors">
                  Apex Fan Zone
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Paddock Dispatch Newsletter */}
          <div>
            <h4 className="font-heading text-xs font-black italic uppercase tracking-wider text-white mb-3">
              PADDOCK DISPATCH
            </h4>
            <p className="text-[11px] text-white/40 mb-2.5 font-telemetry">
              Subscribe for breaking technical updates and live qualifying alerts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilot@apexracing.com"
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-red-600 font-telemetry"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-[10px] font-telemetry text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>TRANSMISSION CONFIRMED!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Legal Disclaimer & Back To Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-telemetry text-white/40">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-[10px] uppercase tracking-widest font-bold text-white/60">© 2026 APEX RACING CHAMPIONSHIP. ALL RIGHTS RESERVED.</div>
            <div className="text-[10px] text-white/30 max-w-xl">
              Disclaimer: Apex Racing Championship is a fictional motorsport competition. All teams, drivers, liveries, circuits, and telemetry metrics are fictional creations.
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading font-black italic text-xs uppercase tracking-wider transition-all cursor-pointer group"
          >
            <span>BACK TO GRID</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-500 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

