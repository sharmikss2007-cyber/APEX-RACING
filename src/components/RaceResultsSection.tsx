import React, { useState } from 'react';
import { Trophy, Flag, Clock, Timer, Zap, MapPin, ChevronRight, Award } from 'lucide-react';
import { ROUND_4_RESULTS } from '../data/racingData';
import { soundFX } from '../utils/audio';

interface PastRaceData {
  round: number;
  raceName: string;
  circuit: string;
  location: string;
  country: string;
  date: string;
  polePosition: { driver: string; time: string; team: string };
  fastestLap: { driver: string; time: string; team: string };
  results: {
    position: number;
    grid: number;
    driverName: string;
    teamName: string;
    teamColor: string;
    timeOrGap: string;
    points: number;
    laps: number;
  }[];
}

const HISTORICAL_ROUNDS_DATA: PastRaceData[] = [
  {
    round: 4,
    raceName: 'Singapore Night Grand Prix',
    circuit: 'Marina Bay Street Circuit',
    location: 'Marina Bay',
    country: 'Singapore',
    date: '13 September 2026',
    polePosition: { driver: 'Alex Carter', time: '1:40.108', team: 'Apex Velocity' },
    fastestLap: { driver: 'Alex Carter', time: '1:42.381', team: 'Apex Velocity' },
    results: ROUND_4_RESULTS.map((r) => ({
      position: r.position,
      grid: r.gridPosition,
      driverName: r.driverName,
      teamName: r.teamName,
      teamColor: r.teamColor,
      timeOrGap: r.timeOrStatus,
      points: r.points,
      laps: 58,
    })),
  },
  {
    round: 3,
    raceName: 'Tokyo Bay Street Circuit',
    circuit: 'Tokyo Harborside Grand Prix Circuit',
    location: 'Odaiba, Tokyo',
    country: 'Japan',
    date: '23 August 2026',
    polePosition: { driver: 'Daniel Cruz', time: '1:19.450', team: 'Nova Motorsport' },
    fastestLap: { driver: 'Liam Parker', time: '1:21.004', team: 'Velocity Works' },
    results: [
      { position: 1, grid: 2, driverName: 'Ryan Blake', teamName: 'Titan Racing', teamColor: '#3b82f6', timeOrGap: '1:32:14.280', points: 25, laps: 54 },
      { position: 2, grid: 1, driverName: 'Daniel Cruz', teamName: 'Nova Motorsport', teamColor: '#f59e0b', timeOrGap: '+1.492s', points: 18, laps: 54 },
      { position: 3, grid: 4, driverName: 'Alex Carter', teamName: 'Apex Velocity', teamColor: '#ef4444', timeOrGap: '+4.811s', points: 15, laps: 54 },
      { position: 4, grid: 3, driverName: 'Ethan Cole', teamName: 'Shadow Racing', teamColor: '#8b5cf6', timeOrGap: '+8.320s', points: 12, laps: 54 },
      { position: 5, grid: 6, driverName: 'Leo Morgan', teamName: 'Pulse GP', teamColor: '#06b6d4', timeOrGap: '+14.900s', points: 10, laps: 54 },
      { position: 6, grid: 5, driverName: 'Liam Parker', teamName: 'Velocity Works', teamColor: '#ec4899', timeOrGap: '+21.430s', points: 9, laps: 54 },
      { position: 7, grid: 8, driverName: 'Noah Bennett', teamName: 'Storm Motorsport', teamColor: '#10b981', timeOrGap: '+26.880s', points: 6, laps: 54 },
      { position: 8, grid: 7, driverName: 'Oliver Stone', teamName: 'Titan Racing', teamColor: '#3b82f6', timeOrGap: '+32.150s', points: 4, laps: 54 },
      { position: 9, grid: 10, driverName: 'Max Hunter', teamName: 'Orion Racing', teamColor: '#f97316', timeOrGap: '+39.400s', points: 2, laps: 54 },
      { position: 10, grid: 9, driverName: 'Mason Reed', teamName: 'Apex Velocity', teamColor: '#ef4444', timeOrGap: '+44.110s', points: 1, laps: 54 },
    ],
  },
  {
    round: 2,
    raceName: 'Dubai Desert Grand Prix',
    circuit: 'Dubai International Autodrome',
    location: 'Dubai',
    country: 'United Arab Emirates',
    date: '02 August 2026',
    polePosition: { driver: 'Ryan Blake', time: '1:31.902', team: 'Titan Racing' },
    fastestLap: { driver: 'Ryan Blake', time: '1:33.410', team: 'Titan Racing' },
    results: [
      { position: 1, grid: 1, driverName: 'Ryan Blake', teamName: 'Titan Racing', teamColor: '#3b82f6', timeOrGap: '1:29:45.109', points: 26, laps: 56 },
      { position: 2, grid: 2, driverName: 'Alex Carter', teamName: 'Apex Velocity', teamColor: '#ef4444', timeOrGap: '+3.120s', points: 18, laps: 56 },
      { position: 3, grid: 3, driverName: 'Ethan Cole', teamName: 'Shadow Racing', teamColor: '#8b5cf6', timeOrGap: '+9.401s', points: 15, laps: 56 },
      { position: 4, grid: 5, driverName: 'Daniel Cruz', teamName: 'Nova Motorsport', teamColor: '#f59e0b', timeOrGap: '+15.220s', points: 12, laps: 56 },
      { position: 5, grid: 4, driverName: 'Leo Morgan', teamName: 'Pulse GP', teamColor: '#06b6d4', timeOrGap: '+22.890s', points: 10, laps: 56 },
      { position: 6, grid: 7, driverName: 'Mason Reed', teamName: 'Apex Velocity', teamColor: '#ef4444', timeOrGap: '+29.400s', points: 8, laps: 56 },
      { position: 7, grid: 6, driverName: 'Noah Bennett', teamName: 'Storm Motorsport', teamColor: '#10b981', timeOrGap: '+34.120s', points: 6, laps: 56 },
      { position: 8, grid: 9, driverName: 'Oliver Stone', teamName: 'Titan Racing', teamColor: '#3b82f6', timeOrGap: '+40.890s', points: 4, laps: 56 },
      { position: 9, grid: 8, driverName: 'Lucas Grant', teamName: 'Nova Motorsport', teamColor: '#f59e0b', timeOrGap: '+47.330s', points: 2, laps: 56 },
      { position: 10, grid: 11, driverName: 'Julian Rossi', teamName: 'Quantum Dynamics', teamColor: '#6366f1', timeOrGap: '+54.100s', points: 1, laps: 56 },
    ],
  },
  {
    round: 1,
    raceName: 'Chennai Night Grand Prix',
    circuit: 'Madras International Street Circuit',
    location: 'Chennai',
    country: 'India',
    date: '12 July 2026',
    polePosition: { driver: 'Alex Carter', time: '1:24.301', team: 'Apex Velocity' },
    fastestLap: { driver: 'Daniel Cruz', time: '1:25.889', team: 'Nova Motorsport' },
    results: [
      { position: 1, grid: 1, driverName: 'Alex Carter', teamName: 'Apex Velocity', teamColor: '#ef4444', timeOrGap: '1:28:10.550', points: 25, laps: 55 },
      { position: 2, grid: 3, driverName: 'Daniel Cruz', teamName: 'Nova Motorsport', teamColor: '#f59e0b', timeOrGap: '+2.410s', points: 19, laps: 55 },
      { position: 3, grid: 2, driverName: 'Ryan Blake', teamName: 'Titan Racing', teamColor: '#3b82f6', timeOrGap: '+6.190s', points: 15, laps: 55 },
      { position: 4, grid: 4, driverName: 'Leo Morgan', teamName: 'Pulse GP', teamColor: '#06b6d4', timeOrGap: '+12.770s', points: 12, laps: 55 },
      { position: 5, grid: 6, driverName: 'Noah Bennett', teamName: 'Storm Motorsport', teamColor: '#10b981', timeOrGap: '+19.340s', points: 10, laps: 55 },
      { position: 6, grid: 5, driverName: 'Ethan Cole', teamName: 'Shadow Racing', teamColor: '#8b5cf6', timeOrGap: '+25.600s', points: 8, laps: 55 },
      { position: 7, grid: 8, driverName: 'Liam Parker', teamName: 'Velocity Works', teamColor: '#ec4899', timeOrGap: '+31.890s', points: 6, laps: 55 },
      { position: 8, grid: 7, driverName: 'Mason Reed', teamName: 'Apex Velocity', teamColor: '#ef4444', timeOrGap: '+37.220s', points: 4, laps: 55 },
      { position: 9, grid: 10, driverName: 'Max Hunter', teamName: 'Orion Racing', teamColor: '#f97316', timeOrGap: '+43.900s', points: 2, laps: 55 },
      { position: 10, grid: 9, driverName: 'Oliver Stone', teamName: 'Titan Racing', teamColor: '#3b82f6', timeOrGap: '+50.110s', points: 1, laps: 55 },
    ],
  },
];

export const RaceResultsSection: React.FC = () => {
  const [selectedRound, setSelectedRound] = useState<number>(4); // Default to Round 4 Singapore

  const activeResult = HISTORICAL_ROUNDS_DATA.find((r) => r.round === selectedRound) || HISTORICAL_ROUNDS_DATA[0];

  return (
    <section id="results" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>OFFICIAL ARCHIVE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            RACE RESULTS & ARCHIVE <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Verified race classifications, fastest laps, and championship points allocation from completed Grand Prix rounds.
          </p>
        </div>

        {/* Round Switcher Tabs */}
        <div className="inline-flex flex-wrap p-1 bg-black/60 border border-white/10">
          {HISTORICAL_ROUNDS_DATA.map((res) => (
            <button
              key={res.round}
              id={`results-round-tab-${res.round}`}
              onClick={() => {
                soundFX.playTelemetryClick();
                setSelectedRound(res.round);
              }}
              className={`px-3 py-1.5 text-xs font-heading font-black italic uppercase tracking-wider transition-all cursor-pointer ${
                selectedRound === res.round
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              R{res.round}: {res.country}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Race Summary Header Card */}
      <div className="p-5 sm:p-7 bg-white/5 border border-white/10 shadow-2xl mb-6 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-telemetry text-red-500 uppercase font-black tracking-widest mb-1">
              <span>ROUND {activeResult.round}</span>
              <span>•</span>
              <span>{activeResult.date}</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tight">
              {activeResult.raceName}
            </h3>
            <div className="text-xs font-telemetry text-white/50 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>{activeResult.circuit}</span>
            </div>
          </div>

          {/* Highlights Mini-Badges */}
          <div className="flex flex-wrap gap-2.5 text-xs font-telemetry">
            <div className="p-2.5 bg-black/40 border border-white/10">
              <span className="text-white/40 text-[9px] block uppercase font-bold">POLE POSITION</span>
              <span className="font-bold text-white text-xs">{activeResult.polePosition.driver}</span>
              <span className="text-white/40 text-[9px] block">{activeResult.polePosition.time}</span>
            </div>

            <div className="p-2.5 bg-purple-950/20 border border-purple-500/30">
              <span className="text-purple-400 text-[9px] block uppercase font-bold">FASTEST LAP (+1 PT)</span>
              <span className="font-bold text-white text-xs">{activeResult.fastestLap.driver}</span>
              <span className="text-purple-300 text-[9px] block">{activeResult.fastestLap.time}</span>
            </div>
          </div>
        </div>

        {/* Podium Top 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
          {/* P2 */}
          <div className="p-3.5 bg-black/40 border border-slate-300/30 flex items-center gap-3.5">
            <span className="w-8 h-8 bg-slate-300 text-black font-telemetry font-black text-base flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <div className="text-[9px] font-telemetry text-white/40 uppercase font-bold">RUNNER UP • 18 PTS</div>
              <div className="font-heading text-base font-black italic text-white uppercase">
                {activeResult.results[1]?.driverName}
              </div>
              <div className="text-[10px] text-white/40 font-telemetry">{activeResult.results[1]?.teamName}</div>
            </div>
          </div>

          {/* P1 Winner */}
          <div className="p-3.5 bg-amber-500/10 border-2 border-amber-400 flex items-center gap-3.5 shadow-lg">
            <span className="w-9 h-9 bg-amber-400 text-black font-telemetry font-black text-lg flex items-center justify-center shrink-0 shadow">
              1
            </span>
            <div>
              <div className="text-[9px] font-telemetry text-amber-300 uppercase font-black">RACE WINNER • 25 PTS</div>
              <div className="font-heading text-lg font-black italic text-white uppercase">
                {activeResult.results[0]?.driverName}
              </div>
              <div className="text-[10px] text-amber-200/80 font-telemetry">{activeResult.results[0]?.teamName}</div>
            </div>
          </div>

          {/* P3 */}
          <div className="p-3.5 bg-black/40 border border-amber-700/40 flex items-center gap-3.5">
            <span className="w-8 h-8 bg-amber-700 text-white font-telemetry font-black text-base flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <div className="text-[9px] font-telemetry text-white/40 uppercase font-bold">THIRD PLACE • 15 PTS</div>
              <div className="font-heading text-base font-black italic text-white uppercase">
                {activeResult.results[2]?.driverName}
              </div>
              <div className="text-[10px] text-white/40 font-telemetry">{activeResult.results[2]?.teamName}</div>
            </div>
          </div>
        </div>

        {/* Full Classification Table */}
        <div className="overflow-x-auto border border-white/10 bg-black/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-black/60 text-white/40 font-telemetry uppercase text-[9px] border-b border-white/10">
              <tr>
                <th className="py-2 px-3 text-center w-12 font-bold">POS</th>
                <th className="py-2 px-3 font-bold">DRIVER / TEAM</th>
                <th className="py-2 px-3 text-center font-bold">GRID</th>
                <th className="py-2 px-3 text-center font-bold">LAPS</th>
                <th className="py-2 px-3 text-right font-bold">TIME / GAP</th>
                <th className="py-2 px-3 text-center font-bold">POINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-telemetry">
              {activeResult.results.map((row) => (
                <tr key={row.position} className="hover:bg-white/5 transition-colors">
                  <td className="py-2 px-3 text-center font-bold text-white/70 text-xs">
                    P{row.position}
                  </td>
                  <td className="py-2 px-3">
                    <div className="font-heading text-xs font-black italic uppercase text-white">
                      {row.driverName}
                    </div>
                    <div className="text-[9px] text-white/40 font-telemetry">
                      {row.teamName}
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center text-white/40">
                    P{row.grid}
                  </td>
                  <td className="py-2 px-3 text-center text-white/70">
                    {row.laps}
                  </td>
                  <td className="py-2 px-3 text-right font-medium text-white/80">
                    {row.timeOrGap}
                  </td>
                  <td className="py-2 px-3 text-center font-black text-red-500">
                    +{row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
