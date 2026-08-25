import React from 'react';
import { X, Trophy, Flag, Gauge, Shield, Award, Calendar, Activity, Scale } from 'lucide-react';
import { Driver } from '../types';
import { soundFX } from '../utils/audio';

interface DriverModalProps {
  driver: Driver | null;
  onClose: () => void;
  onOpenCompare: (driverA: Driver) => void;
}

export const DriverModal: React.FC<DriverModalProps> = ({ driver, onClose, onOpenCompare }) => {
  if (!driver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0c] border border-white/20 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span
              className="text-4xl font-black font-telemetry italic"
              style={{ color: driver.teamColor }}
            >
              #{driver.number}
            </span>
            <div>
              <div className="text-[10px] font-telemetry uppercase text-white/40 font-bold tracking-widest">
                {driver.nationality} • AGE {driver.age} • {driver.teamName}
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight">
                {driver.name}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playTelemetryClick();
              onClose();
              onOpenCompare(driver);
            }}
            className="px-4 py-2 bg-white/10 hover:bg-red-600/20 text-white font-heading font-black italic text-xs uppercase tracking-wider border border-white/20 hover:border-red-500/50 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-red-500" />
            <span>COMPARE TELEMETRY</span>
          </button>
        </div>

        {/* Driver Portrait & Bio Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          {/* Portrait */}
          <div className="md:col-span-4 relative h-72 overflow-hidden bg-black/60 border" style={{ borderColor: driver.teamColor }}>
            <img
              src={driver.avatarUrl}
              alt={driver.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-95 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            {driver.worldTitles > 0 && (
              <div className="absolute bottom-3 left-3 bg-amber-500/20 border border-amber-400/50 backdrop-blur-md px-2.5 py-1 text-[10px] font-telemetry text-amber-300 font-bold flex items-center gap-1.5">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>{driver.worldTitles}x WORLD CHAMPION</span>
              </div>
            )}
          </div>

          {/* Bio Lore */}
          <div className="md:col-span-8 p-5 bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-base font-black italic uppercase text-white mb-2 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-red-500" />
                <span>DRIVER PROFILE & RACING PEDIGREE</span>
              </h3>
              <p className="text-white/70 text-xs leading-relaxed mb-4 font-telemetry">
                {driver.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-white/10 text-xs font-telemetry">
              <div>
                <span className="text-white/40 text-[9px] uppercase block tracking-wider">CODE</span>
                <span className="font-bold text-white font-telemetry">{driver.code}</span>
              </div>
              <div>
                <span className="text-white/40 text-[9px] uppercase block tracking-wider">CURRENT CONSTRUCTOR</span>
                <span className="font-bold text-white font-telemetry">{driver.teamName}</span>
              </div>
              <div>
                <span className="text-white/40 text-[9px] uppercase block tracking-wider">STATUS</span>
                <span className="font-bold text-emerald-400 font-telemetry">ACTIVE DRIVER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Career Stats Matrix */}
        <div>
          <h4 className="font-heading text-base font-black italic uppercase text-white mb-3">
            2026 STATISTICAL SUMMARY
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">CHAMPIONSHIP POINTS</div>
              <div className="font-telemetry text-xl font-black text-white">{driver.points}</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">RACE WINS</div>
              <div className="font-telemetry text-xl font-black text-amber-400">{driver.wins}</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">PODIUM FINISHES</div>
              <div className="font-telemetry text-xl font-black text-white/80">{driver.podiums}</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">POLE POSITIONS</div>
              <div className="font-telemetry text-xl font-black text-red-500">{driver.poles}</div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">FASTEST LAPS</div>
              <div className="font-telemetry text-lg font-bold text-purple-400">{driver.fastestLaps}</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">AVG QUALIFYING</div>
              <div className="font-telemetry text-lg font-bold text-white">P{driver.avgQualifying}</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">AVG RACE FINISH</div>
              <div className="font-telemetry text-lg font-bold text-white">P{driver.avgFinish}</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">WORLD TITLES</div>
              <div className="font-telemetry text-lg font-bold text-amber-300">{driver.worldTitles}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

