import React, { useState } from 'react';
import {
  Trophy,
  Users,
  User,
  Medal,
  Flag,
  Flame,
  Search,
  ChevronRight,
  TrendingUp,
  Shield
} from 'lucide-react';
import { DRIVERS_DATA, TEAMS_DATA } from '../data/racingData';
import { Driver, Team } from '../types';
import { soundFX } from '../utils/audio';

interface StandingsLeaderboardProps {
  onSelectDriver: (driver: Driver) => void;
  onSelectTeam: (team: Team) => void;
}

export const StandingsLeaderboard: React.FC<StandingsLeaderboardProps> = ({
  onSelectDriver,
  onSelectTeam,
}) => {
  const [viewMode, setViewMode] = useState<'drivers' | 'teams'>('drivers');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = DRIVERS_DATA.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeams = [...TEAMS_DATA].sort((a, b) => b.points - a.points).filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.base.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="standings" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>OFFICIAL 2026 STANDINGS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            {viewMode === 'drivers' ? 'DRIVER CHAMPIONSHIP' : 'CONSTRUCTOR CHAMPIONSHIP'}{' '}
            <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            {viewMode === 'drivers'
              ? 'Individual driver standings across 10 worldwide Grand Prix circuits.'
              : 'Cumulative points standings for the 10 competing constructor teams.'}
          </p>
        </div>

        {/* Interactive Toggle: DRIVERS | TEAMS & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="standings-search-input"
              type="text"
              placeholder={viewMode === 'drivers' ? 'Filter drivers or teams...' : 'Filter constructors...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 w-44 sm:w-56 font-telemetry"
            />
          </div>

          {/* Toggle Button Group with Immersive Skew */}
          <div className="flex items-center gap-1 bg-black/60 p-1 border border-white/10">
            <button
              id="standings-toggle-drivers"
              onClick={() => {
                soundFX.playTelemetryClick();
                setViewMode('drivers');
              }}
              className={`px-4 py-1.5 text-xs font-black tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'drivers'
                  ? 'bg-red-600 text-white skew-x-[-12deg]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <span className={viewMode === 'drivers' ? 'skew-x-[12deg] flex items-center gap-1.5' : 'flex items-center gap-1.5'}>
                <User className="w-3.5 h-3.5" />
                <span>DRIVERS</span>
              </span>
            </button>
            <button
              id="standings-toggle-teams"
              onClick={() => {
                soundFX.playTelemetryClick();
                setViewMode('teams');
              }}
              className={`px-4 py-1.5 text-xs font-black tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'teams'
                  ? 'bg-red-600 text-white skew-x-[-12deg]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <span className={viewMode === 'teams' ? 'skew-x-[12deg] flex items-center gap-1.5' : 'flex items-center gap-1.5'}>
                <Users className="w-3.5 h-3.5" />
                <span>TEAMS</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Highlights Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {viewMode === 'drivers' ? (
          <>
            {/* P1 Leader (Gold) */}
            {filteredDrivers[0] && (
              <div
                onClick={() => onSelectDriver(filteredDrivers[0])}
                className="relative overflow-hidden p-5 bg-white/5 border-l-4 border-amber-400 border border-white/10 shadow-2xl hover:border-amber-400 transition-all cursor-pointer group backdrop-blur-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-amber-400 text-black font-telemetry font-black text-xs flex items-center justify-center">
                      P1
                    </span>
                    <span className="text-[10px] font-telemetry font-black text-amber-400 uppercase tracking-widest">
                      CHAMPIONSHIP LEADER
                    </span>
                  </div>
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={filteredDrivers[0].avatarUrl}
                    alt={filteredDrivers[0].name}
                    className="w-12 h-12 object-cover border border-amber-400/40"
                  />
                  <div>
                    <h3 className="font-heading text-2xl font-black italic text-white group-hover:text-amber-300 transition-colors uppercase">
                      {filteredDrivers[0].name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/60 font-telemetry">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: filteredDrivers[0].teamColor }} />
                      <span>{filteredDrivers[0].teamName}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-telemetry text-3xl font-black italic text-amber-400">
                      {filteredDrivers[0].points}
                    </span>
                    <span className="text-[10px] font-telemetry text-white/40">PTS</span>
                  </div>
                  <div className="text-[11px] font-telemetry text-white/60">
                    {filteredDrivers[0].wins} Wins • {filteredDrivers[0].podiums} Podiums
                  </div>
                </div>
              </div>
            )}

            {/* P2 Runner-Up (Silver) */}
            {filteredDrivers[1] && (
              <div
                onClick={() => onSelectDriver(filteredDrivers[1])}
                className="relative overflow-hidden p-5 bg-white/5 border-l-4 border-slate-300 border border-white/10 shadow-xl hover:border-slate-300 transition-all cursor-pointer group backdrop-blur-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-slate-300 text-black font-telemetry font-black text-xs flex items-center justify-center">
                      P2
                    </span>
                    <span className="text-[10px] font-telemetry font-black text-slate-300 uppercase tracking-widest">
                      P2 CONTENDER
                    </span>
                  </div>
                  <Medal className="w-5 h-5 text-slate-300" />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={filteredDrivers[1].avatarUrl}
                    alt={filteredDrivers[1].name}
                    className="w-12 h-12 object-cover border border-slate-400/40"
                  />
                  <div>
                    <h3 className="font-heading text-2xl font-black italic text-white group-hover:text-slate-200 transition-colors uppercase">
                      {filteredDrivers[1].name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/60 font-telemetry">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: filteredDrivers[1].teamColor }} />
                      <span>{filteredDrivers[1].teamName}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-telemetry text-3xl font-black italic text-slate-200">
                      {filteredDrivers[1].points}
                    </span>
                    <span className="text-[10px] font-telemetry text-white/40">PTS</span>
                  </div>
                  <div className="text-[11px] font-telemetry text-white/60">
                    {filteredDrivers[1].wins} Wins • {filteredDrivers[1].podiums} Podiums
                  </div>
                </div>
              </div>
            )}

            {/* P3 (Bronze) */}
            {filteredDrivers[2] && (
              <div
                onClick={() => onSelectDriver(filteredDrivers[2])}
                className="relative overflow-hidden p-5 bg-white/5 border-l-4 border-amber-600 border border-white/10 shadow-xl hover:border-amber-600 transition-all cursor-pointer group backdrop-blur-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-amber-600 text-white font-telemetry font-black text-xs flex items-center justify-center">
                      P3
                    </span>
                    <span className="text-[10px] font-telemetry font-black text-amber-500 uppercase tracking-widest">
                      P3 CONTENDER
                    </span>
                  </div>
                  <Medal className="w-5 h-5 text-amber-600" />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={filteredDrivers[2].avatarUrl}
                    alt={filteredDrivers[2].name}
                    className="w-12 h-12 object-cover border border-amber-600/40"
                  />
                  <div>
                    <h3 className="font-heading text-2xl font-black italic text-white group-hover:text-amber-400 transition-colors uppercase">
                      {filteredDrivers[2].name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/60 font-telemetry">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: filteredDrivers[2].teamColor }} />
                      <span>{filteredDrivers[2].teamName}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-telemetry text-3xl font-black italic text-amber-500">
                      {filteredDrivers[2].points}
                    </span>
                    <span className="text-[10px] font-telemetry text-white/40">PTS</span>
                  </div>
                  <div className="text-[11px] font-telemetry text-white/60">
                    {filteredDrivers[2].wins} Wins • {filteredDrivers[2].podiums} Podiums
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Constructor Top 3 */
          filteredTeams.slice(0, 3).map((team, idx) => (
            <div
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className={`relative overflow-hidden p-5 bg-white/5 border border-white/10 shadow-xl hover:border-white/30 transition-all cursor-pointer group ${
                idx === 0
                  ? 'border-l-4 border-l-amber-400'
                  : idx === 1
                  ? 'border-l-4 border-l-slate-300'
                  : 'border-l-4 border-l-amber-600'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`w-7 h-7 font-telemetry font-black text-xs flex items-center justify-center ${
                  idx === 0 ? 'bg-amber-400 text-black' : idx === 1 ? 'bg-slate-300 text-black' : 'bg-amber-600 text-white'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-[10px] font-telemetry uppercase tracking-wider text-white/40">
                  {team.base}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-black italic uppercase text-white group-hover:text-red-500 transition-colors">
                {team.name}
              </h3>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="font-telemetry text-3xl font-black italic text-white">{team.points}</span>
                  <span className="text-[10px] font-telemetry text-white/40">PTS</span>
                </div>
                <div className="text-[11px] font-telemetry text-white/60">
                  {team.wins} Wins • {team.podiums} Podiums
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Interactive Table */}
      <div className="overflow-x-auto border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-white/40 text-[10px] font-telemetry uppercase tracking-widest">
              <th className="py-3.5 px-4 sm:px-6 w-16 text-center">POS</th>
              <th className="py-3.5 px-4">{viewMode === 'drivers' ? 'DRIVER' : 'CONSTRUCTOR'}</th>
              {viewMode === 'drivers' && <th className="py-3.5 px-4 hidden md:table-cell">TEAM</th>}
              <th className="py-3.5 px-4 text-center">WINS</th>
              <th className="py-3.5 px-4 text-center">PODIUMS</th>
              <th className="py-3.5 px-4 text-center">POLES</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">POINTS</th>
              <th className="py-3.5 px-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {viewMode === 'drivers' ? (
              filteredDrivers.map((driver, index) => {
                const pos = index + 1;
                const isTop3 = pos <= 3;
                return (
                  <tr
                    key={driver.id}
                    id={`driver-row-${driver.id}`}
                    onClick={() => {
                      soundFX.playTelemetryClick();
                      onSelectDriver(driver);
                    }}
                    className={`hover:bg-white/5 transition-colors cursor-pointer group ${
                      isTop3 ? 'border-l-2 border-red-600 bg-white/[0.02]' : ''
                    }`}
                  >
                    {/* Position */}
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 font-telemetry font-black text-xs ${
                          pos === 1
                            ? 'bg-amber-400 text-black'
                            : pos === 2
                            ? 'bg-slate-300 text-black'
                            : pos === 3
                            ? 'bg-amber-600 text-white'
                            : 'text-white/40 bg-white/5'
                        }`}
                      >
                        {pos}
                      </span>
                    </td>

                    {/* Driver Name & Country Flag */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={driver.avatarUrl}
                          alt={driver.name}
                          className="w-9 h-9 object-cover border border-white/10"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading text-lg font-bold italic uppercase text-white group-hover:text-red-500 transition-colors">
                              {driver.name}
                            </span>
                            <span className="text-[10px] font-telemetry text-white/40 font-bold bg-white/5 px-1">
                              #{driver.number}
                            </span>
                          </div>
                          <span className="text-xs text-white/50 font-telemetry md:hidden">
                            {driver.teamName}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Team Column (desktop) */}
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: driver.teamColor }}
                        />
                        <span className="text-xs font-telemetry text-white/70">
                          {driver.teamName}
                        </span>
                      </div>
                    </td>

                    {/* Wins */}
                    <td className="py-3.5 px-4 text-center font-telemetry text-white/80 font-medium">
                      {driver.wins}
                    </td>

                    {/* Podiums */}
                    <td className="py-3.5 px-4 text-center font-telemetry text-white/80 font-medium">
                      {driver.podiums}
                    </td>

                    {/* Poles */}
                    <td className="py-3.5 px-4 text-center font-telemetry text-white/80 font-medium">
                      {driver.poles}
                    </td>

                    {/* Points */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <span className="font-telemetry text-base sm:text-lg font-black italic text-white group-hover:text-red-500 transition-colors">
                        {driver.points} <span className="text-[10px] font-normal text-white/40">PTS</span>
                      </span>
                    </td>

                    {/* Chevron icon */}
                    <td className="py-3.5 px-3 text-right">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-red-500 transition-colors" />
                    </td>
                  </tr>
                );
              })
            ) : (
              filteredTeams.map((team, index) => {
                const pos = index + 1;
                return (
                  <tr
                    key={team.id}
                    id={`team-row-${team.id}`}
                    onClick={() => {
                      soundFX.playTelemetryClick();
                      onSelectTeam(team);
                    }}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 font-telemetry font-black text-xs ${
                          pos === 1
                            ? 'bg-amber-400 text-black'
                            : pos === 2
                            ? 'bg-slate-300 text-black'
                            : pos === 3
                            ? 'bg-amber-600 text-white'
                            : 'text-white/40 bg-white/5'
                        }`}
                      >
                        {pos}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 flex items-center justify-center font-heading font-black text-xs text-white shadow-inner"
                          style={{ backgroundColor: team.color }}
                        >
                          {team.shortName}
                        </div>
                        <div>
                          <div className="font-heading text-lg font-bold italic uppercase text-white group-hover:text-red-500 transition-colors">
                            {team.name}
                          </div>
                          <div className="text-xs text-white/40 font-telemetry">
                            {team.chassis} • {team.powerUnit}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-telemetry text-white/80 font-medium">
                      {team.wins}
                    </td>

                    <td className="py-3.5 px-4 text-center font-telemetry text-white/80 font-medium">
                      {team.podiums}
                    </td>

                    <td className="py-3.5 px-4 text-center font-telemetry text-white/80 font-medium">
                      {team.poles}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <span className="font-telemetry text-base sm:text-lg font-black italic text-white group-hover:text-red-500 transition-colors">
                        {team.points} <span className="text-[10px] font-normal text-white/40">PTS</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-red-500 transition-colors" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

