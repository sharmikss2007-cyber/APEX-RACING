import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Trophy,
  Radio,
  Flag,
  Flame,
  AlertTriangle,
  Disc,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Activity
} from 'lucide-react';
import { DRIVERS_DATA } from '../data/racingData';
import { SimulationDriverState } from '../types';
import { RaceControlDashboard } from './RaceControlDashboard';
import { soundFX } from '../utils/audio';

interface CommentaryEvent {
  id: string;
  lap: number;
  message: string;
  type: 'lead_change' | 'pit_stop' | 'safety_car' | 'fastest_lap' | 'info' | 'finish';
  timestamp: string;
}

export const RaceControlSimulator: React.FC = () => {
  const TOTAL_LAPS = 58;
  const [currentLap, setCurrentLap] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simSpeed, setSimSpeed] = useState<1 | 2 | 5>(2);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Environmental Telemetry State
  const [trackStatus, setTrackStatus] = useState<'GREEN' | 'YELLOW' | 'SAFETY_CAR' | 'CHEQUERED'>('GREEN');
  const [weather, setWeather] = useState<'Clear' | 'Overcast' | 'Light Rain' | 'Heavy Rain'>('Clear');
  const [trackTemp, setTrackTemp] = useState<number>(31);
  const [windSpeed, setWindSpeed] = useState<number>(14);
  const [safetyCarActive, setSafetyCarActive] = useState<boolean>(false);
  const [fastestLap, setFastestLap] = useState<{ driver: string; time: string; team: string }>({
    driver: 'Alex Carter',
    time: '1:42.381',
    team: 'Apex Velocity',
  });

  // Drivers Grid State
  const [drivers, setDrivers] = useState<SimulationDriverState[]>(() =>
    DRIVERS_DATA.map((d, index) => ({
      driverId: d.id,
      name: d.name,
      code: d.code,
      teamName: d.teamName,
      teamColor: d.teamColor,
      currentPosition: index + 1,
      startingPosition: index + 1,
      gapToLeader: index === 0 ? 0 : Number((index * 1.85 + Math.random() * 0.5).toFixed(2)),
      intervalToAhead: index === 0 ? 0 : Number((1.85 + (Math.random() - 0.5) * 0.4).toFixed(2)),
      tireType: index % 3 === 0 ? 'Soft' : index % 3 === 1 ? 'Medium' : 'Hard',
      tireWear: 100,
      pitStops: 0,
      lastLapTime: '1:43.120',
      bestLapTime: '1:42.381',
      isFastestLap: index === 0,
      status: 'Running',
    }))
  );

  // Live Commentary Events Stream
  const [commentary, setCommentary] = useState<CommentaryEvent[]>([
    {
      id: 'comm-init',
      lap: 0,
      message: 'Formation lap complete. Grid aligned on the starting marks. Ready for launch.',
      type: 'info',
      timestamp: '20:00:00',
    },
  ]);

  const commentaryEndRef = useRef<HTMLDivElement>(null);

  // Scroll commentary smoothly
  useEffect(() => {
    commentaryEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commentary]);

  // Simulation tick loop
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && currentLap < TOTAL_LAPS) {
      const intervalTime = Math.max(250, 1000 / simSpeed);

      timer = setInterval(() => {
        setCurrentLap((prevLap) => {
          const nextLap = prevLap + 1;
          soundFX.playLightBeep(nextLap % 5 === 0);

          // Update driver positions, wear, gaps, overtakes
          setDrivers((prevDrivers) => {
            const updated = [...prevDrivers];

            // Tire wear reduction
            updated.forEach((d) => {
              const wearDrop = d.tireType === 'Soft' ? 2.5 : d.tireType === 'Medium' ? 1.6 : 1.0;
              d.tireWear = Math.max(12, Math.round(d.tireWear - wearDrop));

              // Auto pit stop trigger when tire wear < 30%
              if (d.tireWear < 32 && d.pitStops < 2 && Math.random() > 0.4) {
                d.status = 'In Pit';
                d.pitStops += 1;
                d.tireWear = 100;
                d.tireType = d.tireType === 'Soft' ? 'Medium' : 'Hard';
                d.gapToLeader += 21.4; // Pit lane time loss
                addCommentary(nextLap, `${d.name} enters the pit lane for new ${d.tireType} tires.`, 'pit_stop');
              } else if (d.status === 'In Pit') {
                d.status = 'Running';
              }
            });

            // Dynamic overtaking simulation
            if (nextLap > 2 && Math.random() > 0.45 && !safetyCarActive) {
              const swapIdx = Math.floor(Math.random() * (updated.length - 1));
              const driverAhead = updated[swapIdx];
              const driverBehind = updated[swapIdx + 1];

              // If tire wear difference or random speed advantage
              if (driverBehind.tireWear > driverAhead.tireWear + 10 || Math.random() > 0.6) {
                updated[swapIdx] = driverBehind;
                updated[swapIdx + 1] = driverAhead;

                if (swapIdx === 0) {
                  addCommentary(nextLap, `${driverBehind.name} makes a daring move and TAKES THE LEAD!`, 'lead_change');
                  soundFX.playTelemetryClick();
                } else if (swapIdx <= 3) {
                  addCommentary(nextLap, `${driverBehind.name} overtakes ${driverAhead.name} for P${swapIdx + 1}!`, 'info');
                }
              }
            }

            // Fastest Lap Trigger
            if (nextLap > 5 && Math.random() > 0.75) {
              const luckyDriver = updated[Math.floor(Math.random() * 4)];
              const secs = (41 + Math.random() * 1.5).toFixed(3);
              const flTime = `1:${secs}`;

              setFastestLap({
                driver: luckyDriver.name,
                time: flTime,
                team: luckyDriver.teamName,
              });

              updated.forEach((d) => (d.isFastestLap = d.driverId === luckyDriver.driverId));
              addCommentary(nextLap, `${luckyDriver.name} sets the FASTEST LAP of the race (${flTime})!`, 'fastest_lap');
            }

            // Safety car random event
            if (nextLap === 18 && !safetyCarActive) {
              setSafetyCarActive(true);
              setTrackStatus('SAFETY_CAR');
              addCommentary(nextLap, '⚠️ SAFETY CAR DEPLOYED! Debris reported at Turn 7 chicane.', 'safety_car');
            } else if (nextLap === 22 && safetyCarActive) {
              setSafetyCarActive(false);
              setTrackStatus('GREEN');
              addCommentary(nextLap, '🟢 SAFETY CAR IN THIS LAP! Green flag racing resumes.', 'info');
            }

            // Final Lap Callout
            if (nextLap === TOTAL_LAPS) {
              setTrackStatus('CHEQUERED');
              addCommentary(nextLap, '🏁 FINAL LAP! The leaders take the white flag under the floodlights!', 'info');
            }

            // Recalculate positions & intervals
            let cumulativeGap = 0;
            updated.forEach((d, idx) => {
              d.currentPosition = idx + 1;
              if (idx === 0) {
                d.gapToLeader = 0;
                d.intervalToAhead = 0;
              } else {
                const interval = Number((1.2 + Math.random() * 1.5).toFixed(2));
                cumulativeGap += interval;
                d.gapToLeader = Number(cumulativeGap.toFixed(2));
                d.intervalToAhead = interval;
              }
            });

            return updated;
          });

          // Finish Check
          if (nextLap >= TOTAL_LAPS) {
            setIsRunning(false);
            setIsFinished(true);
            triggerPodiumCelebration();
            return TOTAL_LAPS;
          }

          return nextLap;
        });
      }, intervalTime);
    }

    return () => clearInterval(timer);
  }, [isRunning, currentLap, simSpeed, safetyCarActive]);

  const addCommentary = (lap: number, message: string, type: CommentaryEvent['type']) => {
    setCommentary((prev) => [
      ...prev,
      {
        id: 'comm-' + Date.now() + Math.random(),
        lap,
        message,
        type,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const triggerPodiumCelebration = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f59e0b', '#3b82f6', '#ffffff'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 400);
    } catch {
      // safe
    }
  };

  const handleStartSim = () => {
    soundFX.playLightBeep(true);
    setIsRunning(true);
    if (currentLap === 0) {
      addCommentary(1, '🟢 LIGHTS OUT AND AWAY WE GO! The 2026 Singapore Night GP is underway!', 'info');
    }
  };

  const handlePauseSim = () => {
    soundFX.playTelemetryClick();
    setIsRunning(false);
  };

  const handleResetSim = () => {
    soundFX.playTelemetryClick();
    setIsRunning(false);
    setIsFinished(false);
    setCurrentLap(0);
    setTrackStatus('GREEN');
    setSafetyCarActive(false);
    setDrivers(
      DRIVERS_DATA.map((d, index) => ({
        driverId: d.id,
        name: d.name,
        code: d.code,
        teamName: d.teamName,
        teamColor: d.teamColor,
        currentPosition: index + 1,
        startingPosition: index + 1,
        gapToLeader: index === 0 ? 0 : Number((index * 1.85).toFixed(2)),
        intervalToAhead: index === 0 ? 0 : 1.85,
        tireType: index % 3 === 0 ? 'Soft' : index % 3 === 1 ? 'Medium' : 'Hard',
        tireWear: 100,
        pitStops: 0,
        lastLapTime: '1:43.120',
        bestLapTime: '1:42.381',
        isFastestLap: index === 0,
        status: 'Running',
      }))
    );
    setCommentary([
      {
        id: 'comm-init',
        lap: 0,
        message: 'Simulation reset. Twenty machines parked on starting grid.',
        type: 'info',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleInstantSim = () => {
    soundFX.playTelemetryClick();
    setCurrentLap(TOTAL_LAPS);
    setIsRunning(false);
    setIsFinished(true);
    setTrackStatus('CHEQUERED');
    addCommentary(TOTAL_LAPS, '🏁 RACE COMPLETE! Official classification locked.', 'finish');
    triggerPodiumCelebration();
  };

  return (
    <section id="race-control" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE INTERACTIVE SIMULATION ENGINE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            RACE CONTROL <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Simulate dynamic race progression with live overtaking logic, tire degradation, pit strategies, safety cars, and telemetry tracking.
          </p>
        </div>

        {/* Simulator Main Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {!isRunning ? (
            <button
              id="sim-start-btn"
              onClick={handleStartSim}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black italic text-xs uppercase tracking-wider skew-x-[-12deg] shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="skew-x-[12deg] flex items-center gap-2">
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{currentLap > 0 ? 'RESUME SIM' : 'START SIMULATION'}</span>
              </span>
            </button>
          ) : (
            <button
              id="sim-pause-btn"
              onClick={handlePauseSim}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-heading font-black italic text-xs uppercase tracking-wider skew-x-[-12deg] shadow-lg shadow-amber-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="skew-x-[12deg] flex items-center gap-2">
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>PAUSE</span>
              </span>
            </button>
          )}

          {/* Speed Toggles */}
          <div className="inline-flex p-1 bg-black/60 border border-white/10">
            {([1, 2, 5] as const).map((spd) => (
              <button
                key={spd}
                id={`sim-speed-${spd}x`}
                onClick={() => {
                  soundFX.playTelemetryClick();
                  setSimSpeed(spd);
                }}
                className={`px-2.5 py-1 text-xs font-telemetry font-bold transition-all ${
                  simSpeed === spd ? 'bg-red-600 text-white shadow' : 'text-white/40 hover:text-white'
                }`}
              >
                {spd}X
              </button>
            ))}
          </div>

          {/* Instant Sim */}
          <button
            id="sim-instant-btn"
            onClick={handleInstantSim}
            className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Instant Finish"
          >
            <FastForward className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            id="sim-reset-btn"
            onClick={handleResetSim}
            className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Race Control Live Dashboard Status Panel */}
      <RaceControlDashboard
        trackStatus={trackStatus}
        weather={weather}
        trackTemp={trackTemp}
        airTemp={28}
        windSpeed={windSpeed}
        safetyCarActive={safetyCarActive}
        fastestLap={fastestLap}
      />

      {/* Podium Ceremony Banner when Finished */}
      {isFinished && (
        <div className="mb-6 p-6 sm:p-8 bg-white/5 border border-amber-400/60 shadow-2xl backdrop-blur-md animate-in zoom-in-95 duration-500 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-black text-[10px] font-heading font-black tracking-widest uppercase mb-3 shadow-lg">
            <Trophy className="w-3.5 h-3.5" />
            <span>RACE COMPLETE • OFFICIAL PODIUM</span>
          </div>

          <h3 className="font-heading text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight mb-5">
            SINGAPORE STREET CIRCUIT PODIUM
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {/* P2 (Silver) */}
            <div className="p-3.5 bg-black/50 border border-slate-300/40 flex flex-col items-center justify-center order-2 sm:order-1">
              <span className="w-8 h-8 bg-slate-300 text-black font-telemetry font-black text-base flex items-center justify-center mb-1.5 shadow">
                2
              </span>
              <div className="font-heading text-lg font-black italic uppercase text-white">
                {drivers[1]?.name || 'Ryan Blake'}
              </div>
              <div className="text-[10px] text-white/40 font-telemetry">
                {drivers[1]?.teamName || 'Titan Racing'}
              </div>
              <div className="text-xs font-telemetry text-white/70 mt-1.5 font-bold">
                +{drivers[1]?.gapToLeader || 2.14}s
              </div>
            </div>

            {/* P1 (Gold Champion) */}
            <div className="p-5 bg-amber-500/10 border-2 border-amber-400 flex flex-col items-center justify-center order-1 sm:order-2 shadow-xl scale-105">
              <span className="w-10 h-10 bg-amber-400 text-black font-telemetry font-black text-lg flex items-center justify-center mb-1.5 shadow-lg">
                1
              </span>
              <div className="font-heading text-xl font-black italic uppercase text-white">
                {drivers[0]?.name || 'Alex Carter'}
              </div>
              <div className="text-[10px] text-amber-300 font-telemetry font-bold">
                {drivers[0]?.teamName || 'Apex Velocity'}
              </div>
              <div className="text-xs font-telemetry text-amber-400 mt-1.5 font-black">
                RACE WINNER • 25 PTS
              </div>
            </div>

            {/* P3 (Bronze) */}
            <div className="p-3.5 bg-black/50 border border-amber-600/40 flex flex-col items-center justify-center order-3">
              <span className="w-8 h-8 bg-amber-600 text-white font-telemetry font-black text-base flex items-center justify-center mb-1.5 shadow">
                3
              </span>
              <div className="font-heading text-lg font-black italic uppercase text-white">
                {drivers[2]?.name || 'Daniel Cruz'}
              </div>
              <div className="text-[10px] text-white/40 font-telemetry">
                {drivers[2]?.teamName || 'Nova Motorsport'}
              </div>
              <div className="text-xs font-telemetry text-white/70 mt-1.5 font-bold">
                +{drivers[2]?.gapToLeader || 5.79}s
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Simulation Layout: Live Timing Tower + Live Commentary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Timing Tower (Leaderboard) */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Header Lap Counter */}
          <div className="p-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-heading text-xl font-black italic uppercase text-white">
                LAP {currentLap} <span className="text-white/40 font-normal">/ {TOTAL_LAPS}</span>
              </span>
              <span className="text-[10px] font-telemetry text-white/40 hidden sm:inline">
                • {((currentLap / TOTAL_LAPS) * 100).toFixed(0)}% DISTANCE
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-32 sm:w-48 h-1.5 bg-black/60 overflow-hidden border border-white/10">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${(currentLap / TOTAL_LAPS) * 100}%` }}
              />
            </div>
          </div>

          {/* Timing Rows */}
          <div className="overflow-x-auto max-h-[520px] overflow-y-auto divide-y divide-white/5">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-black/80 text-white/40 font-telemetry uppercase text-[9px] sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="py-2 px-3 text-center w-12 font-bold">POS</th>
                  <th className="py-2 px-3 font-bold">DRIVER / TEAM</th>
                  <th className="py-2 px-3 text-right font-bold">GAP</th>
                  <th className="py-2 px-3 text-right font-bold">INTERVAL</th>
                  <th className="py-2 px-3 text-center font-bold">TIRE</th>
                  <th className="py-2 px-3 text-center font-bold">WEAR</th>
                  <th className="py-2 px-3 text-center font-bold">STOPS</th>
                  <th className="py-2 px-3 text-center font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-telemetry">
                {drivers.map((driver) => {
                  const isLeader = driver.currentPosition === 1;
                  return (
                    <tr
                      key={driver.driverId}
                      className={`hover:bg-white/5 transition-colors ${
                        isLeader ? 'bg-red-600/10' : ''
                      }`}
                    >
                      {/* POS */}
                      <td className="py-2 px-3 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 text-[11px] font-black italic ${
                            driver.currentPosition === 1
                              ? 'bg-amber-400 text-black'
                              : driver.currentPosition === 2
                              ? 'bg-slate-300 text-black'
                              : driver.currentPosition === 3
                              ? 'bg-amber-600 text-white'
                              : 'text-white/50 bg-white/5'
                          }`}
                        >
                          {driver.currentPosition}
                        </span>
                      </td>

                      {/* DRIVER & TEAM */}
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-1 h-5"
                            style={{ backgroundColor: driver.teamColor }}
                          />
                          <div>
                            <div className="font-heading text-xs font-black italic uppercase text-white flex items-center gap-1.5">
                              <span>{driver.name}</span>
                              {driver.isFastestLap && (
                                <span className="text-[8px] font-telemetry text-purple-400 bg-purple-500/20 px-1 font-bold">
                                  FL
                                </span>
                              )}
                            </div>
                            <div className="text-[9px] text-white/40 font-telemetry">
                              {driver.teamName}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* GAP */}
                      <td className="py-2 px-3 text-right font-medium">
                        {isLeader ? (
                          <span className="text-amber-400 font-black italic">LEADER</span>
                        ) : (
                          <span className="text-white/80">+{driver.gapToLeader}s</span>
                        )}
                      </td>

                      {/* INTERVAL */}
                      <td className="py-2 px-3 text-right text-white/40">
                        {isLeader ? '-' : `+${driver.intervalToAhead}s`}
                      </td>

                      {/* TIRE COMPOUND */}
                      <td className="py-2 px-3 text-center">
                        <span
                          className={`px-1 py-0.5 text-[9px] font-black ${
                            driver.tireType === 'Soft'
                              ? 'bg-red-600 text-white'
                              : driver.tireType === 'Medium'
                              ? 'bg-yellow-500 text-black font-black'
                              : 'bg-slate-200 text-black'
                          }`}
                        >
                          {driver.tireType[0]}
                        </span>
                      </td>

                      {/* TIRE WEAR */}
                      <td className="py-2 px-3 text-center">
                        <span
                          className={`text-[11px] font-bold ${
                            driver.tireWear > 50
                              ? 'text-emerald-400'
                              : driver.tireWear > 25
                              ? 'text-amber-400'
                              : 'text-red-500 animate-pulse'
                          }`}
                        >
                          {driver.tireWear}%
                        </span>
                      </td>

                      {/* PIT STOPS */}
                      <td className="py-2 px-3 text-center text-white/70">
                        {driver.pitStops}
                      </td>

                      {/* STATUS */}
                      <td className="py-2 px-3 text-center">
                        <span
                          className={`px-1.5 py-0.5 text-[9px] font-bold ${
                            driver.status === 'In Pit'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse'
                              : 'text-white/40'
                          }`}
                        >
                          {driver.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Live Commentary Feed */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 shadow-2xl p-4 sm:p-5 flex flex-col h-[560px] backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-red-500" />
              <h3 className="font-heading text-base font-black italic uppercase text-white">
                RACE COMMENTARY FEED
              </h3>
            </div>
            <span className="text-[9px] font-telemetry text-white/40 font-bold uppercase tracking-widest">LIVE LOG</span>
          </div>

          {/* Commentary Items Scrollable Area */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
            {commentary.map((evt) => (
              <div
                key={evt.id}
                className={`p-2.5 border transition-all ${
                  evt.type === 'lead_change'
                    ? 'bg-amber-500/10 border-amber-400/40 text-amber-200'
                    : evt.type === 'safety_car'
                    ? 'bg-yellow-500/15 border-yellow-400/50 text-yellow-200 animate-pulse'
                    : evt.type === 'pit_stop'
                    ? 'bg-blue-500/10 border-blue-400/30 text-blue-200'
                    : evt.type === 'fastest_lap'
                    ? 'bg-purple-500/10 border-purple-400/40 text-purple-200'
                    : 'bg-black/30 border-white/5 text-white/70'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-telemetry mb-0.5 text-white/40">
                  <span className="font-bold uppercase text-red-500">LAP {evt.lap}</span>
                  <span>{evt.timestamp}</span>
                </div>
                <p className="leading-snug font-medium text-[11px]">{evt.message}</p>
              </div>
            ))}
            <div ref={commentaryEndRef} />
          </div>

          <div className="pt-2.5 border-t border-white/10 text-[10px] font-telemetry text-white/30 text-center uppercase tracking-widest">
            FICTIONAL SIMULATION PROTOCOL
          </div>
        </div>
      </div>
    </section>
  );
};
