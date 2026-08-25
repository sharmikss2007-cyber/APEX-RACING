import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Zap,
  Gauge,
  Wind,
  Disc,
  Sliders,
  Save,
  Check,
  Trash2,
  Share2,
  ShieldCheck,
  Sparkles,
  Volume2
} from 'lucide-react';
import { SavedCarBuild } from '../types';
import { soundFX } from '../utils/audio';

export const CarConfigurator: React.FC = () => {
  // Configuration options
  const [engine, setEngine] = useState<'V6 Turbo' | 'V8 Performance' | 'Hybrid V6'>('Hybrid V6');
  const [aero, setAero] = useState<'Balanced' | 'High Downforce' | 'Low Drag'>('High Downforce');
  const [tires, setTires] = useState<'Soft' | 'Medium' | 'Hard'>('Soft');
  const [suspension, setSuspension] = useState<'Race' | 'Balanced' | 'Performance'>('Race');
  const [brakes, setBrakes] = useState<'Standard' | 'Carbon Performance'>('Carbon Performance');

  const [buildName, setBuildName] = useState('Apex Spec-1 Prototype');
  const [savedBuilds, setSavedBuilds] = useState<SavedCarBuild[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load builds from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('apex_saved_car_builds');
      if (stored) {
        setSavedBuilds(JSON.parse(stored));
      }
    } catch {
      // LocalStorage safe fallback
    }
  }, []);

  // Performance scoring formula calculation
  const calculateScores = () => {
    let power = 85;
    let speed = 88;
    let cornering = 85;
    let braking = 85;
    let reliability = 90;

    // Engine modifiers
    if (engine === 'V6 Turbo') {
      power += 6;
      speed += 7;
      reliability += 2;
    } else if (engine === 'V8 Performance') {
      power += 12;
      speed += 9;
      reliability -= 5;
    } else if (engine === 'Hybrid V6') {
      power += 10;
      speed += 6;
      reliability += 4;
    }

    // Aero modifiers
    if (aero === 'Balanced') {
      cornering += 5;
      speed += 4;
    } else if (aero === 'High Downforce') {
      cornering += 12;
      speed -= 2;
      braking += 4;
    } else if (aero === 'Low Drag') {
      speed += 12;
      cornering -= 6;
    }

    // Tires modifiers
    if (tires === 'Soft') {
      cornering += 10;
      braking += 8;
      reliability -= 8;
    } else if (tires === 'Medium') {
      cornering += 5;
      braking += 4;
      reliability += 2;
    } else if (tires === 'Hard') {
      cornering -= 2;
      reliability += 10;
    }

    // Suspension modifiers
    if (suspension === 'Race') {
      cornering += 8;
      speed += 2;
      reliability -= 2;
    } else if (suspension === 'Balanced') {
      cornering += 4;
      reliability += 5;
    } else if (suspension === 'Performance') {
      cornering += 6;
      braking += 3;
    }

    // Brakes modifiers
    if (brakes === 'Carbon Performance') {
      braking += 12;
      reliability += 3;
    } else {
      braking += 3;
      reliability -= 2;
    }

    // Clamp between 60 and 99
    const clamp = (num: number) => Math.min(99, Math.max(60, num));
    const powerScore = clamp(power);
    const speedScore = clamp(speed);
    const corneringScore = clamp(cornering);
    const brakingScore = clamp(braking);
    const reliabilityScore = clamp(reliability);

    const overallScore = Math.round(
      (powerScore + speedScore + corneringScore + brakingScore + reliabilityScore) / 5
    );

    return {
      powerScore,
      speedScore,
      corneringScore,
      brakingScore,
      reliabilityScore,
      overallScore,
    };
  };

  const scores = calculateScores();

  const handleSaveBuild = () => {
    soundFX.playTelemetryClick();
    const newBuild: SavedCarBuild = {
      id: 'build-' + Date.now(),
      name: buildName.trim() || 'Custom Spec Build',
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      engine,
      aero,
      tires,
      suspension,
      brakes,
      ...scores,
    };

    const updated = [newBuild, ...savedBuilds];
    setSavedBuilds(updated);
    try {
      localStorage.setItem('apex_saved_car_builds', JSON.stringify(updated));
    } catch {
      // safe
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDeleteBuild = (id: string) => {
    soundFX.playTelemetryClick();
    const updated = savedBuilds.filter((b) => b.id !== id);
    setSavedBuilds(updated);
    try {
      localStorage.setItem('apex_saved_car_builds', JSON.stringify(updated));
    } catch {
      // safe
    }
  };

  const handleLoadBuild = (build: SavedCarBuild) => {
    soundFX.playTelemetryClick();
    setBuildName(build.name);
    setEngine(build.engine as typeof engine);
    setAero(build.aero as typeof aero);
    setTires(build.tires as typeof tires);
    setSuspension(build.suspension as typeof suspension);
    setBrakes(build.brakes as typeof brakes);
  };

  return (
    <section id="configurator" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
          <Wrench className="w-3.5 h-3.5" />
          <span>VIRTUAL ENGINEERING WORKSHOP</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
          BUILD YOUR RACE CAR <span className="text-red-600 font-normal">///</span>
        </h2>
        <p className="text-white/40 text-xs font-telemetry max-w-2xl mt-1">
          Fine-tune power unit output, aero wing downforce, compound grip, and carbon braking deceleration to construct your ultimate racing weapon.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Configurator Controls */}
        <div className="lg:col-span-7 space-y-4">
          {/* Build Name Input */}
          <div className="p-4 bg-white/5 border border-white/10">
            <label className="text-[10px] font-telemetry uppercase text-white/40 block mb-1.5 font-bold">
              PROTOTYPE CHASSIS DESIGNATION
            </label>
            <input
              id="configurator-build-name-input"
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              className="w-full bg-black/60 border border-white/20 py-2 px-3 text-white font-heading font-black italic text-base focus:outline-none focus:border-red-600"
              placeholder="e.g. Apex Spec-1 Prototype"
            />
          </div>

          {/* ENGINE Options */}
          <div className="p-4 bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-telemetry uppercase font-bold text-white/70 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-red-500" />
                <span>1. ENGINE ARCHITECTURE</span>
              </span>
              <span className="text-xs font-telemetry text-red-500 font-black italic">{engine}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['V6 Turbo', 'V8 Performance', 'Hybrid V6'] as const).map((opt) => (
                <button
                  key={opt}
                  id={`config-engine-${opt.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    soundFX.playTelemetryClick();
                    setEngine(opt);
                  }}
                  className={`py-2.5 px-2 text-xs font-heading font-black italic uppercase tracking-wider transition-all cursor-pointer border ${
                    engine === opt
                      ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                      : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* AERODYNAMICS Options */}
          <div className="p-4 bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-telemetry uppercase font-bold text-white/70 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-blue-400" />
                <span>2. AERODYNAMICS PACKAGE</span>
              </span>
              <span className="text-xs font-telemetry text-blue-400 font-black italic">{aero}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['Balanced', 'High Downforce', 'Low Drag'] as const).map((opt) => (
                <button
                  key={opt}
                  id={`config-aero-${opt.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    soundFX.playTelemetryClick();
                    setAero(opt);
                  }}
                  className={`py-2.5 px-2 text-xs font-heading font-black italic uppercase tracking-wider transition-all cursor-pointer border ${
                    aero === opt
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* TIRES Options */}
          <div className="p-4 bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-telemetry uppercase font-bold text-white/70 flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-amber-400" />
                <span>3. TIRE COMPOUND</span>
              </span>
              <span className="text-xs font-telemetry text-amber-400 font-black italic">{tires} Compound</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['Soft', 'Medium', 'Hard'] as const).map((opt) => (
                <button
                  key={opt}
                  id={`config-tires-${opt.toLowerCase()}`}
                  onClick={() => {
                    soundFX.playTelemetryClick();
                    setTires(opt);
                  }}
                  className={`py-2.5 px-2 text-xs font-heading font-black italic uppercase tracking-wider transition-all cursor-pointer border ${
                    tires === opt
                      ? opt === 'Soft'
                        ? 'bg-red-600 text-white border-red-500'
                        : opt === 'Medium'
                        ? 'bg-yellow-500 text-black border-yellow-400'
                        : 'bg-slate-200 text-black border-white'
                      : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {opt} ({opt === 'Soft' ? 'C5' : opt === 'Medium' ? 'C3' : 'C1'})
                </button>
              ))}
            </div>
          </div>

          {/* SUSPENSION & BRAKES Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Suspension */}
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-telemetry uppercase font-bold text-white/70">
                  4. SUSPENSION
                </span>
                <span className="text-xs font-telemetry text-white/50 font-bold">{suspension}</span>
              </div>
              <div className="space-y-1.5">
                {(['Race', 'Balanced', 'Performance'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      soundFX.playTelemetryClick();
                      setSuspension(opt);
                    }}
                    className={`w-full py-1.5 px-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer border text-left flex items-center justify-between ${
                      suspension === opt
                        ? 'bg-white/20 text-white border-white'
                        : 'bg-black/30 border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt}</span>
                    {suspension === opt && <Check className="w-3.5 h-3.5 text-red-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brakes */}
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-telemetry uppercase font-bold text-white/70">
                  5. BRAKES
                </span>
                <span className="text-xs font-telemetry text-white/50 font-bold">{brakes}</span>
              </div>
              <div className="space-y-1.5">
                {(['Standard', 'Carbon Performance'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      soundFX.playTelemetryClick();
                      setBrakes(opt);
                    }}
                    className={`w-full py-1.5 px-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer border text-left flex items-center justify-between ${
                      brakes === opt
                        ? 'bg-red-600/30 text-white border-red-500'
                        : 'bg-black/30 border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt}</span>
                    {brakes === opt && <Check className="w-3.5 h-3.5 text-red-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Performance Readout & Save My Build */}
        <div className="lg:col-span-5 space-y-4">
          {/* Dynamic Overall Performance Card */}
          <div className="p-5 sm:p-6 bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
              <div>
                <span className="text-[9px] font-telemetry uppercase text-red-500 font-bold tracking-widest">
                  TELEMETRY SIMULATION
                </span>
                <h3 className="font-heading text-xl font-black italic uppercase text-white">
                  DYNAMIC BENCHMARK
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-telemetry text-white/40 uppercase block">OVERALL RATING</span>
                <div className="font-telemetry text-3xl font-black italic text-red-500">
                  {scores.overallScore}<span className="text-sm text-white/40">/100</span>
                </div>
              </div>
            </div>

            {/* Individual Telemetry Bars */}
            <div className="space-y-3 mb-6">
              {[
                { label: 'POWER', score: scores.powerScore, color: 'bg-red-600' },
                { label: 'SPEED', score: scores.speedScore, color: 'bg-orange-500' },
                { label: 'CORNERING', score: scores.corneringScore, color: 'bg-blue-500' },
                { label: 'BRAKING', score: scores.brakingScore, color: 'bg-emerald-500' },
                { label: 'RELIABILITY', score: scores.reliabilityScore, color: 'bg-purple-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs font-telemetry mb-1">
                    <span className="font-bold text-white/70">{item.label}</span>
                    <span className="font-black italic text-white">{item.score}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/60">
                    <div
                      className={`h-full ${item.color} transition-all duration-300`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Save My Build Button */}
            <button
              id="configurator-save-build-btn"
              onClick={handleSaveBuild}
              className="w-full py-3 px-6 bg-red-600 hover:bg-red-500 text-white font-heading font-black italic text-xs uppercase tracking-wider skew-x-[-12deg] shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="skew-x-[12deg] flex items-center gap-2">
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>SAVED TO GARAGE!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-white" />
                    <span>SAVE MY BUILD</span>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Saved Builds List in Garage */}
          {savedBuilds.length > 0 && (
            <div className="p-4 sm:p-5 bg-white/5 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                <span className="text-[10px] font-telemetry uppercase text-white/70 font-bold">
                  SAVED GARAGE PROTOTYPES ({savedBuilds.length})
                </span>
              </div>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {savedBuilds.map((build) => (
                  <div
                    key={build.id}
                    className="p-2.5 bg-black/40 hover:bg-white/10 border border-white/5 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <div className="font-heading text-xs font-black italic uppercase text-white">
                        {build.name}
                      </div>
                      <div className="text-[9px] font-telemetry text-white/40">
                        {build.engine} • {build.aero} • Rating: {build.overallScore}/100
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleLoadBuild(build)}
                        className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-[10px] font-telemetry text-white/80"
                      >
                        LOAD
                      </button>
                      <button
                        onClick={() => handleDeleteBuild(build.id)}
                        className="p-1 text-white/40 hover:text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

