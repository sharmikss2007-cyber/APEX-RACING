import React from 'react';
import { Users, Trophy, Shield, Zap, ArrowRight, UserCheck, Wrench } from 'lucide-react';
import { TEAMS_DATA, DRIVERS_DATA } from '../data/racingData';
import { Team } from '../types';
import { soundFX } from '../utils/audio';

interface TeamsSectionProps {
  onSelectTeam: (team: Team) => void;
}

export const TeamsSection: React.FC<TeamsSectionProps> = ({ onSelectTeam }) => {
  return (
    <section id="teams" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>CONSTRUCTOR GRID</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            THE CONSTRUCTORS <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Ten elite racing organizations engineering ultra-high-downforce hybrid machines for world title supremacy.
          </p>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEAMS_DATA.map((team) => {
          // Find the 2 driver objects for this team
          const teamDrivers = DRIVERS_DATA.filter((d) => team.driverIds.includes(d.id));

          return (
            <div
              key={team.id}
              id={`team-card-${team.id}`}
              className="relative bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 shadow-xl overflow-hidden group flex flex-col justify-between"
            >
              {/* Header Livery Strip */}
              <div
                className="h-1.5 w-full transition-all duration-300"
                style={{ backgroundColor: team.color }}
              />

              <div className="p-5">
                {/* Team Top Branding & Badge */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[9px] font-telemetry font-bold tracking-widest text-white/40 uppercase">
                      {team.base}
                    </span>
                    <h3 className="font-heading text-2xl font-black italic uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">
                      {team.name}
                    </h3>
                  </div>

                  {/* Text-based Team Logo Badge */}
                  <div
                    className="px-2.5 py-1 font-heading font-black text-xs uppercase tracking-wider text-white shadow-md border border-white/20"
                    style={{ backgroundColor: team.color }}
                  >
                    {team.logoText}
                  </div>
                </div>

                {/* Car Preview Image */}
                <div className="relative h-36 overflow-hidden mb-4 bg-black/40 border border-white/10 group-hover:border-red-600/40 transition-colors">
                  <img
                    src={team.carImageUrl}
                    alt={`${team.name} ${team.carModel}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-telemetry text-white/70">
                    <span className="font-bold text-white uppercase">{team.carModel}</span>
                    <span className="text-white/40 text-[10px]">{team.powerUnit.split(' ')[0]} POWER</span>
                  </div>
                </div>

                {/* Driver Pairings */}
                <div className="mb-4 space-y-1.5">
                  <div className="text-[10px] font-telemetry uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-bold">
                    <UserCheck className="w-3 h-3 text-red-500" />
                    <span>RACE DRIVERS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {teamDrivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="p-2 bg-black/40 border border-white/5 flex items-center gap-2"
                      >
                        <img
                          src={driver.avatarUrl}
                          alt={driver.name}
                          className="w-7 h-7 object-cover"
                        />
                        <div className="overflow-hidden">
                          <div className="text-xs font-heading font-bold italic text-white uppercase truncate">
                            {driver.name}
                          </div>
                          <div className="text-[10px] font-telemetry text-white/40">
                            #{driver.number} • {driver.points} PTS
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Stats Pillars */}
                <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/10 text-center mb-4 bg-black/40">
                  <div>
                    <div className="text-[9px] font-telemetry text-white/40 uppercase">POINTS</div>
                    <div className="font-telemetry text-lg font-black italic text-white">{team.points}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-telemetry text-white/40 uppercase">WINS</div>
                    <div className="font-telemetry text-lg font-black italic text-amber-400">{team.wins}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-telemetry text-white/40 uppercase">PODIUMS</div>
                    <div className="font-telemetry text-lg font-black italic text-slate-200">{team.podiums}</div>
                  </div>
                </div>

                {/* Brief Lore */}
                <p className="text-xs text-white/40 line-clamp-2 leading-relaxed mb-3">
                  {team.description}
                </p>
              </div>

              {/* Action Button: VIEW TEAM */}
              <div className="p-5 pt-0">
                <button
                  id={`team-view-btn-${team.id}`}
                  onClick={() => {
                    soundFX.playTelemetryClick();
                    onSelectTeam(team);
                  }}
                  className="w-full py-2 px-4 bg-white/5 hover:bg-red-600 text-white/80 hover:text-white font-heading font-black text-xs uppercase tracking-wider border border-white/10 hover:border-red-600 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-red-600/40"
                >
                  <span>VIEW CONSTRUCTOR PROFILE</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

