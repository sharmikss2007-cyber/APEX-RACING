import React, { useState } from 'react';
import { Sliders, Disc, Clock, Zap, ShieldAlert, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const PitStrategyTool: React.FC = () => {
  const [stopCount, setStopCount] = useState<1 | 2 | 3>(1);
  const [stint1Tire, setStint1Tire] = useState<'Soft' | 'Medium' | 'Hard'>('Medium');
  const [stint2Tire, setStint2Tire] = useState<'Soft' | 'Medium' | 'Hard'>('Hard');
  const [stint3Tire, setStint3Tire] = useState<'Soft' | 'Medium' | 'Hard'>('Soft');

  const [pitLap1, setPitLap1] = useState<number>(24);
  const [pitLap2, setPitLap2] = useState<number>(44);

  // Strategy mathematical calculations
  const calculateStrategy = () => {
    let baseTimeMinutes = 94.2; // ~1h 34m 12s
    let pitLossSeconds = stopCount * 21.5;

    // Tire pace delta
    let paceBonusSeconds = 0;
    if (stint1Tire === 'Soft') paceBonusSeconds -= 4.5;
    if (stint1Tire === 'Medium') paceBonusSeconds -= 2.0;
    if (stint2Tire === 'Soft') paceBonusSeconds -= 4.0;
    if (stint2Tire === 'Medium') paceBonusSeconds -= 2.0;
    if (stopCount >= 2 && stint3Tire === 'Soft') paceBonusSeconds -= 3.5;

    // Deg penalty if stint too long
    let degPenaltySeconds = 0;
    if (stopCount === 1) {
      if (stint1Tire === 'Soft' && pitLap1 > 18) degPenaltySeconds += (pitLap1 - 18) * 1.2;
      if (stint2Tire === 'Soft') degPenaltySeconds += 12; // 34 laps on soft is extreme wear
    }

    const totalSeconds = baseTimeMinutes * 60 + pitLossSeconds + paceBonusSeconds + degPenaltySeconds;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(1);

    // Strategy Rating out of 100
    let rating = 92;
    if (stopCount === 1 && stint1Tire === 'Medium' && stint2Tire === 'Hard') rating = 96;
    else if (stopCount === 2 && stint1Tire === 'Soft' && stint2Tire === 'Medium' && stint3Tire === 'Soft') rating = 93;
    else if (stopCount === 1 && stint1Tire === 'Soft' && stint2Tire === 'Soft') rating = 64; // High degradation
    else if (stopCount === 3) rating = 78;

    return {
      estimatedTotalTime: `${minutes}m ${seconds}s`,
      rating,
      pitLossSeconds,
      paceBonusSeconds,
      degPenaltySeconds,
    };
  };

  const strategy = calculateStrategy();

  return (
    <section id="strategy" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>RACE TACTICS & UNDERCUT CALCULATOR</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            PIT STOP STRATEGY SIMULATOR <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Model compound degradation, pit-loss deltas, and tire crossover windows for the Singapore 58-lap distance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Controls */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. Stop Plan Selection */}
          <div className="p-5 bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
            <span className="text-[10px] font-telemetry uppercase text-white/50 block mb-3 font-bold tracking-widest">
              1. CHOOSE PIT STOP FREQUENCY
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {([1, 2, 3] as const).map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    soundFX.playTelemetryClick();
                    setStopCount(count);
                  }}
                  className={`py-2.5 px-3 text-center cursor-pointer transition-all border ${
                    stopCount === count
                      ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30 font-black'
                      : 'bg-black/40 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="font-heading text-base font-black italic uppercase">{count}-STOP</div>
                  <div className="text-[9px] font-telemetry mt-0.5 text-white/60">
                    {count === 1 ? 'Optimal Pace' : count === 2 ? 'Sprint Attack' : 'Aggressive Cover'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Stint 1 Config */}
          <div className="p-5 bg-white/5 border border-white/10 shadow-lg space-y-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-telemetry uppercase font-bold text-white flex items-center gap-2">
                <Disc className="w-4 h-4 text-red-500" />
                <span>STINT 1: STARTING COMPOUND (LAPS 1 – {pitLap1})</span>
              </span>
              <span className="text-xs font-telemetry text-red-400 font-bold">{stint1Tire}</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {(['Soft', 'Medium', 'Hard'] as const).map((compound) => (
                <button
                  key={compound}
                  onClick={() => {
                    soundFX.playTelemetryClick();
                    setStint1Tire(compound);
                  }}
                  className={`py-2 px-3 text-xs font-heading font-black italic uppercase transition-all border ${
                    stint1Tire === compound
                      ? 'bg-white/20 text-white border-white shadow'
                      : 'bg-black/40 border-white/10 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {compound}
                </button>
              ))}
            </div>

            {/* Pit Window 1 Slider */}
            <div>
              <div className="flex justify-between text-xs font-telemetry text-white/40 mb-1">
                <span className="uppercase text-[10px] font-bold">PIT STOP 1 LAP WINDOW:</span>
                <span className="font-bold text-white">LAP {pitLap1}</span>
              </div>
              <input
                type="range"
                min="10"
                max={stopCount === 1 ? '40' : '30'}
                value={pitLap1}
                onChange={(e) => setPitLap1(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>
          </div>

          {/* 3. Stint 2 Config */}
          <div className="p-5 bg-white/5 border border-white/10 shadow-lg space-y-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-telemetry uppercase font-bold text-white flex items-center gap-2">
                <Disc className="w-4 h-4 text-blue-400" />
                <span>
                  STINT 2: SECOND COMPOUND (LAPS {pitLap1 + 1} – {stopCount === 1 ? '58' : pitLap2})
                </span>
              </span>
              <span className="text-xs font-telemetry text-blue-400 font-bold">{stint2Tire}</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {(['Soft', 'Medium', 'Hard'] as const).map((compound) => (
                <button
                  key={compound}
                  onClick={() => {
                    soundFX.playTelemetryClick();
                    setStint2Tire(compound);
                  }}
                  className={`py-2 px-3 text-xs font-heading font-black italic uppercase transition-all border ${
                    stint2Tire === compound
                      ? 'bg-white/20 text-white border-white shadow'
                      : 'bg-black/40 border-white/10 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {compound}
                </button>
              ))}
            </div>

            {/* Pit Window 2 Slider if 2+ stops */}
            {stopCount >= 2 && (
              <div>
                <div className="flex justify-between text-xs font-telemetry text-white/40 mb-1">
                  <span className="uppercase text-[10px] font-bold">PIT STOP 2 LAP WINDOW:</span>
                  <span className="font-bold text-white">LAP {pitLap2}</span>
                </div>
                <input
                  type="range"
                  min={pitLap1 + 5}
                  max="52"
                  value={pitLap2}
                  onChange={(e) => setPitLap2(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Stint 3 if 3 stops */}
          {stopCount === 3 && (
            <div className="p-5 bg-white/5 border border-white/10 shadow-lg space-y-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-telemetry uppercase font-bold text-white flex items-center gap-2">
                  <Disc className="w-4 h-4 text-emerald-400" />
                  <span>STINT 3 & 4: FINAL ATTACK (LAPS {pitLap2 + 1} – 58)</span>
                </span>
                <span className="text-xs font-telemetry text-emerald-400 font-bold">{stint3Tire}</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {(['Soft', 'Medium', 'Hard'] as const).map((compound) => (
                  <button
                    key={compound}
                    onClick={() => {
                      soundFX.playTelemetryClick();
                      setStint3Tire(compound);
                    }}
                    className={`py-2 px-3 text-xs font-heading font-black italic uppercase transition-all border ${
                      stint3Tire === compound
                        ? 'bg-white/20 text-white border-white shadow'
                        : 'bg-black/40 border-white/10 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    {compound}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Strategy Telemetry Readout */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 sm:p-6 bg-white/5 border border-red-600/40 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div>
                <span className="text-[9px] font-telemetry uppercase text-red-500 font-black tracking-widest">
                  PROJECTED RACE TIME
                </span>
                <h3 className="font-heading text-xl font-black italic uppercase text-white">
                  TACTICAL EVALUATION
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-telemetry text-white/40 uppercase block font-bold">STRATEGY SCORE</span>
                <div className="font-telemetry text-2xl font-black italic text-emerald-400">
                  {strategy.rating}<span className="text-sm text-white/40">/100</span>
                </div>
              </div>
            </div>

            {/* Total Estimated Time */}
            <div className="p-3.5 bg-black/40 border border-white/10 mb-4 text-center">
              <div className="text-[9px] font-telemetry text-white/40 uppercase font-bold">ESTIMATED RACE DISTANCE DURATION</div>
              <div className="font-telemetry text-2xl font-black italic text-white mt-1">
                {strategy.estimatedTotalTime}
              </div>
              <div className="text-[11px] text-white/50 font-telemetry mt-1">
                Including {stopCount} Pit Stop{stopCount > 1 ? 's' : ''} ({strategy.pitLossSeconds}s in pit lane)
              </div>
            </div>

            {/* Visual Stint Distribution Bar */}
            <div className="mb-4">
              <div className="text-[10px] font-telemetry text-white/40 mb-1.5 uppercase font-bold">STINT LENGTH BREAKDOWN:</div>
              <div className="h-5 w-full overflow-hidden flex font-telemetry text-[9px] font-black text-black">
                <div
                  className="bg-yellow-400 flex items-center justify-center transition-all duration-300"
                  style={{ width: `${(pitLap1 / 58) * 100}%` }}
                >
                  L1-{pitLap1} ({stint1Tire[0]})
                </div>
                {stopCount === 1 ? (
                  <div
                    className="bg-slate-200 flex items-center justify-center transition-all duration-300"
                    style={{ width: `${((58 - pitLap1) / 58) * 100}%` }}
                  >
                    L{pitLap1 + 1}-58 ({stint2Tire[0]})
                  </div>
                ) : (
                  <>
                    <div
                      className="bg-slate-200 flex items-center justify-center transition-all duration-300"
                      style={{ width: `${((pitLap2 - pitLap1) / 58) * 100}%` }}
                    >
                      L{pitLap1 + 1}-{pitLap2} ({stint2Tire[0]})
                    </div>
                    <div
                      className="bg-red-600 text-white flex items-center justify-center transition-all duration-300"
                      style={{ width: `${((58 - pitLap2) / 58) * 100}%` }}
                    >
                      L{pitLap2 + 1}-58
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Chief Strategist Recommendation Notes */}
            <div className="p-3.5 bg-black/40 border border-white/10 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-heading font-black italic uppercase text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CHIEF STRATEGIST ADVICE</span>
              </div>
              <p className="text-white/70 leading-relaxed text-[11px] font-telemetry">
                {strategy.rating > 90
                  ? 'Highly optimal strategy! Starting on Medium compounds offers strong opening stint durability with the Hard tire providing reliable pace to the chequered flag.'
                  : 'Warning: High tire degradation expected towards the closing stages. Watch for graining if running extended laps on Soft compound.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

