import React from 'react';
import { X, Shield, Users, Wrench, Trophy, Award, MapPin, Gauge, Activity, ArrowRight } from 'lucide-react';
import { Team, Driver } from '../types';
import { DRIVERS_DATA } from '../data/racingData';
import { soundFX } from '../utils/audio';

interface TeamModalProps {
  team: Team | null;
  onClose: () => void;
  onSelectDriver: (driver: Driver) => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ team, onClose, onSelectDriver }) => {
  if (!team) return null;

  const teamDrivers = DRIVERS_DATA.filter((d) => team.driverIds.includes(d.id));

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

        {/* Top Header Strip with Team Color */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5"
                style={{ backgroundColor: team.color }}
              />
              <span className="text-[10px] font-telemetry uppercase text-white/40 font-bold tracking-widest">
                {team.base} • CONSTRUCTOR ENTRY
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight">
              {team.name}
            </h2>
          </div>

          <div
            className="px-3 py-1.5 font-heading font-black italic text-xs uppercase tracking-wider text-white shadow-lg"
            style={{ backgroundColor: team.color }}
          >
            {team.logoText}
          </div>
        </div>

        {/* Hero Car Showcase */}
        <div className="relative h-60 sm:h-72 overflow-hidden mb-6 bg-black/60 border border-white/10">
          <img
            src={team.carImageUrl}
            alt={`${team.name} ${team.carModel}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-95 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-telemetry text-white/80">
            <span className="font-bold text-white uppercase">{team.carModel} MONOCOQUE</span>
            <span className="text-white/60">{team.powerUnit}</span>
          </div>
        </div>

        {/* 4 Performance Stat Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">CHAMPIONSHIP POINTS</div>
            <div className="font-telemetry text-xl font-black text-white">{team.points}</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">RACE WINS</div>
            <div className="font-telemetry text-xl font-black text-amber-400">{team.wins}</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">PODIUM FINISHES</div>
            <div className="font-telemetry text-xl font-black text-white/80">{team.podiums}</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10">
            <div className="text-[9px] font-telemetry text-white/40 uppercase tracking-wider">POLE POSITIONS</div>
            <div className="font-telemetry text-xl font-black text-red-500">{team.poles}</div>
          </div>
        </div>

        {/* Team Leadership and Profile Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white/5 border border-white/10">
            <h4 className="font-heading text-sm font-black italic uppercase text-white mb-2.5 flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5 text-red-500" />
              <span>TEAM MANAGEMENT</span>
            </h4>
            <div className="space-y-1.5 text-xs font-telemetry">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">TEAM PRINCIPAL:</span>
                <span className="font-bold text-white">{team.principal}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">TECHNICAL DIRECTOR:</span>
                <span className="font-bold text-white">{team.technicalDirector}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/40">POWER UNIT SUPPLIER:</span>
                <span className="font-bold text-white">{team.powerUnit}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/40">HEADQUARTERS BASE:</span>
                <span className="font-bold text-white">{team.base}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10">
            <h4 className="font-heading text-sm font-black italic uppercase text-white mb-2.5 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>ORGANIZATION PHILOSOPHY</span>
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-telemetry">
              {team.description}
            </p>
          </div>
        </div>

        {/* Official Driver Lineup */}
        <div>
          <h4 className="font-heading text-base font-black italic uppercase text-white mb-3 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-red-500" />
            <span>OFFICIAL RACE DRIVER LINEUP</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teamDrivers.map((driver) => (
              <div
                key={driver.id}
                onClick={() => {
                  soundFX.playTelemetryClick();
                  onClose();
                  onSelectDriver(driver);
                }}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 flex items-center justify-between gap-3 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={driver.avatarUrl}
                    alt={driver.name}
                    className="w-10 h-10 object-cover border"
                    style={{ borderColor: team.color }}
                  />
                  <div>
                    <div className="font-heading text-base font-black italic uppercase text-white group-hover:text-red-400 transition-colors">
                      {driver.name}
                    </div>
                    <div className="text-[10px] font-telemetry text-white/40">
                      #{driver.number} • {driver.nationality} • {driver.points} pts
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

