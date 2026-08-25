import React, { useState } from 'react';
import { User, Trophy, Medal, Flag, Sparkles, Scale, ArrowRight, Gauge, ChevronRight } from 'lucide-react';
import { DRIVERS_DATA } from '../data/racingData';
import { Driver } from '../types';
import { soundFX } from '../utils/audio';

interface DriversSectionProps {
  onSelectDriver: (driver: Driver) => void;
  onOpenCompare: (driverA?: Driver, driverB?: Driver) => void;
}

export const DriversSection: React.FC<DriversSectionProps> = ({
  onSelectDriver,
  onOpenCompare,
}) => {
  const [selectedDriverAId, setSelectedDriverAId] = useState<string>('alex-carter');
  const [selectedDriverBId, setSelectedDriverBId] = useState<string>('ryan-blake');
  const [showCompareInline, setShowCompareInline] = useState(false);

  const driverA = DRIVERS_DATA.find((d) => d.id === selectedDriverAId) || DRIVERS_DATA[0];
  const driverB = DRIVERS_DATA.find((d) => d.id === selectedDriverBId) || DRIVERS_DATA[1];

  // Helper to compute comparison bar percentage
  const getBarPercentages = (valA: number, valB: number, lowerIsBetter: boolean = false) => {
    if (valA === valB) return { a: 50, b: 50 };
    if (lowerIsBetter) {
      // For avg qual or finish, lower is better
      const total = valA + valB;
      const pctA = Math.round(((total - valA) / total) * 100);
      return { a: pctA, b: 100 - pctA };
    }
    const total = valA + valB || 1;
    const pctA = Math.round((valA / total) * 100);
    return { a: pctA, b: 100 - pctA };
  };

  return (
    <section id="drivers" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <User className="w-3.5 h-3.5" />
            <span>THE PILOTS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            WORLD CHAMPIONSHIP DRIVERS <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Twenty elite drivers competing at the absolute edge of physics and reaction speed.
          </p>
        </div>

        {/* Action button to open or jump to Driver Comparison */}
        <button
          id="drivers-compare-toggle-btn"
          onClick={() => {
            soundFX.playTelemetryClick();
            setShowCompareInline(!showCompareInline);
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-heading font-black text-xs uppercase tracking-wider skew-x-[-12deg] transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-lg shadow-red-600/30"
        >
          <span className="skew-x-[12deg] flex items-center gap-2">
            <Scale className="w-3.5 h-3.5" />
            <span>{showCompareInline ? 'CLOSE COMPARISON' : 'COMPARE DRIVERS'}</span>
          </span>
        </button>
      </div>

      {/* Interactive In-Line Driver Comparison Widget */}
      {showCompareInline && (
        <div
          id="driver-comparison-tool"
          className="mb-10 p-5 sm:p-6 bg-white/5 border border-red-600/50 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-300"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-red-500" />
              <h3 className="font-heading text-xl font-black italic uppercase text-white">
                HEAD-TO-HEAD TELEMETRY COMPARISON <span className="text-red-500">///</span>
              </h3>
            </div>
            <span className="text-[10px] font-telemetry text-white/40 font-bold uppercase tracking-widest">
              2026 STATISTICAL CORRELATION
            </span>
          </div>

          {/* Selectors for Driver A and Driver B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Driver A Selector & Header */}
            <div className="p-3.5 bg-black/60 border border-white/10 flex items-center gap-3.5">
              <img
                src={driverA.avatarUrl}
                alt={driverA.name}
                className="w-14 h-14 object-cover border-2"
                style={{ borderColor: driverA.teamColor }}
              />
              <div className="flex-1 w-full">
                <label className="text-[9px] font-telemetry uppercase text-white/40 block mb-1 font-bold">
                  DRIVER 1
                </label>
                <select
                  id="compare-select-driver-a"
                  value={selectedDriverAId}
                  onChange={(e) => setSelectedDriverAId(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 py-1 px-2.5 text-xs font-heading font-black text-white focus:outline-none focus:border-red-600"
                >
                  {DRIVERS_DATA.map((d) => (
                    <option key={d.id} value={d.id} className="bg-black text-white">
                      #{d.number} {d.name} ({d.teamName})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-white/40 mt-1 font-telemetry">
                  {driverA.nationality} • #{driverA.number}
                </div>
              </div>
            </div>

            {/* Driver B Selector & Header */}
            <div className="p-3.5 bg-black/60 border border-white/10 flex items-center gap-3.5">
              <img
                src={driverB.avatarUrl}
                alt={driverB.name}
                className="w-14 h-14 object-cover border-2"
                style={{ borderColor: driverB.teamColor }}
              />
              <div className="flex-1 w-full">
                <label className="text-[9px] font-telemetry uppercase text-white/40 block mb-1 font-bold">
                  DRIVER 2
                </label>
                <select
                  id="compare-select-driver-b"
                  value={selectedDriverBId}
                  onChange={(e) => setSelectedDriverBId(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 py-1 px-2.5 text-xs font-heading font-black text-white focus:outline-none focus:border-red-600"
                >
                  {DRIVERS_DATA.map((d) => (
                    <option key={d.id} value={d.id} className="bg-black text-white">
                      #{d.number} {d.name} ({d.teamName})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-white/40 mt-1 font-telemetry">
                  {driverB.nationality} • #{driverB.number}
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Metrics Bars */}
          <div className="space-y-2.5">
            {[
              { label: 'CHAMPIONSHIP POINTS', valA: driverA.points, valB: driverB.points, suffix: ' PTS' },
              { label: 'GRAND PRIX WINS', valA: driverA.wins, valB: driverB.wins, suffix: '' },
              { label: 'PODIUM FINISHES', valA: driverA.podiums, valB: driverB.podiums, suffix: '' },
              { label: 'POLE POSITIONS', valA: driverA.poles, valB: driverB.poles, suffix: '' },
              { label: 'FASTEST LAPS', valA: driverA.fastestLaps, valB: driverB.fastestLaps, suffix: '' },
              {
                label: 'AVG QUALIFYING POSITION',
                valA: driverA.avgQualifying,
                valB: driverB.avgQualifying,
                suffix: ' POS',
                lowerIsBetter: true,
              },
              {
                label: 'AVG RACE FINISH',
                valA: driverA.avgFinish,
                valB: driverB.avgFinish,
                suffix: ' POS',
                lowerIsBetter: true,
              },
            ].map((metric, idx) => {
              const pcts = getBarPercentages(metric.valA, metric.valB, metric.lowerIsBetter);
              const isAWinner = metric.lowerIsBetter ? metric.valA <= metric.valB : metric.valA >= metric.valB;
              const isBWinner = metric.lowerIsBetter ? metric.valB <= metric.valA : metric.valB >= metric.valA;

              return (
                <div key={idx} className="p-2.5 bg-black/40 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-telemetry mb-1">
                    <span className={`font-bold ${isAWinner ? 'text-red-500 font-black italic' : 'text-white/40'}`}>
                      {metric.valA}
                      {metric.suffix}
                    </span>
                    <span className="font-heading font-black tracking-wider uppercase text-white/80 text-[11px]">
                      {metric.label}
                    </span>
                    <span className={`font-bold ${isBWinner ? 'text-blue-400 font-black italic' : 'text-white/40'}`}>
                      {metric.valB}
                      {metric.suffix}
                    </span>
                  </div>

                  {/* Dual comparative bar */}
                  <div className="h-1.5 w-full bg-white/10 flex">
                    <div
                      className="h-full bg-red-600 transition-all duration-500"
                      style={{ width: `${pcts.a}%` }}
                    />
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${pcts.b}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {DRIVERS_DATA.map((driver, index) => {
          const rank = index + 1;
          return (
            <div
              key={driver.id}
              id={`driver-card-${driver.id}`}
              onClick={() => {
                soundFX.playTelemetryClick();
                onSelectDriver(driver);
              }}
              className="relative bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 shadow-xl overflow-hidden group cursor-pointer flex flex-col justify-between"
            >
              {/* Top Accent Strip with Driver Team Color */}
              <div className="h-1 w-full" style={{ backgroundColor: driver.teamColor }} />

              <div className="p-4 sm:p-5">
                {/* Header with Rank & Number */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-1.5 py-0.5 text-[9px] font-telemetry font-bold bg-white/10 text-white/70">
                    POS {rank}
                  </span>
                  <span className="font-telemetry text-base font-black italic" style={{ color: driver.teamColor }}>
                    #{driver.number}
                  </span>
                </div>

                {/* Driver Portrait Image */}
                <div className="relative h-44 overflow-hidden mb-3.5 bg-black/60 border border-white/10 group-hover:border-red-600/40">
                  <img
                    src={driver.avatarUrl}
                    alt={driver.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-telemetry uppercase text-white/80 font-bold bg-black/70 px-1.5 py-0.5 border border-white/10">
                      {driver.nationality}
                    </span>
                    {driver.worldTitles > 0 && (
                      <span className="flex items-center gap-1 text-[9px] font-telemetry font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 border border-amber-500/30">
                        <Trophy className="w-2.5 h-2.5 text-amber-400" />
                        {driver.worldTitles}x WORLD CHAMP
                      </span>
                    )}
                  </div>
                </div>

                {/* Driver Name & Team */}
                <div className="mb-3.5">
                  <h3 className="font-heading text-xl font-black italic uppercase text-white group-hover:text-red-500 transition-colors">
                    {driver.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/50 font-telemetry mt-0.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: driver.teamColor }} />
                    <span>{driver.teamName}</span>
                  </div>
                </div>

                {/* Key Stats Matrix */}
                <div className="grid grid-cols-3 gap-1.5 py-2 border-t border-white/10 text-center bg-black/40">
                  <div>
                    <div className="text-[8px] font-telemetry text-white/40 uppercase font-bold">POINTS</div>
                    <div className="font-telemetry text-base font-black italic text-white">{driver.points}</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-telemetry text-white/40 uppercase font-bold">WINS</div>
                    <div className="font-telemetry text-base font-black italic text-amber-400">{driver.wins}</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-telemetry text-white/40 uppercase font-bold">PODIUMS</div>
                    <div className="font-telemetry text-base font-black italic text-slate-200">{driver.podiums}</div>
                  </div>
                </div>
              </div>

              {/* View Profile Prompt Footer */}
              <div className="px-4 sm:px-5 pb-4 pt-0">
                <div className="flex items-center justify-between text-[11px] font-heading font-black uppercase tracking-wider text-white/50 group-hover:text-red-500 transition-colors">
                  <span>TELEMETRY PROFILE</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

