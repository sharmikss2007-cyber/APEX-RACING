import React, { useState } from 'react';
import { Gauge, Zap, Wind, Shield, Activity, Volume2, ArrowRight, Layers } from 'lucide-react';
import { RACE_CARS_DATA } from '../data/racingData';
import { RaceCar } from '../types';
import { soundFX } from '../utils/audio';

export const RaceCarsSection: React.FC = () => {
  const [selectedCarId, setSelectedCarId] = useState<string>(RACE_CARS_DATA[0].id);
  const [isRevving, setIsRevving] = useState(false);

  const selectedCar = RACE_CARS_DATA.find((c) => c.id === selectedCarId) || RACE_CARS_DATA[0];

  const handleRevEngine = () => {
    setIsRevving(true);
    soundFX.playEngineRev(1.0 + Math.random() * 0.3);
    setTimeout(() => setIsRevving(false), 900);
  };

  return (
    <section id="cars" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Gauge className="w-3.5 h-3.5" />
            <span>AERODYNAMIC WEAPONRY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            THE MACHINES <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Ground-effect aerodynamics, 1,000+ horsepower hybrid power units, and carbon fiber monocoques built for extreme deceleration.
          </p>
        </div>

        {/* Engine Rev Sound Button */}
        <button
          id="cars-sound-rev-btn"
          onClick={handleRevEngine}
          className={`px-4 py-2 bg-black/80 hover:bg-red-600 hover:text-white text-white/80 font-telemetry text-xs tracking-wider border border-white/20 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer skew-x-[-12deg] ${
            isRevving ? 'ring-2 ring-red-600 bg-red-600 text-white' : ''
          }`}
        >
          <span className="skew-x-[12deg] flex items-center gap-2">
            <Volume2 className={`w-3.5 h-3.5 ${isRevving ? 'text-white animate-pulse' : 'text-red-500'}`} />
            <span>{isRevving ? 'TELEMETRY: 15,000 RPM' : 'TEST POWER UNIT REV'}</span>
          </span>
        </button>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Car Selector List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[10px] font-telemetry uppercase text-white/40 tracking-widest mb-1 font-bold">
            SELECT MONOCOQUE CHASSIS:
          </div>
          {RACE_CARS_DATA.map((car) => {
            const isSelected = car.id === selectedCarId;
            return (
              <button
                key={car.id}
                id={`car-select-${car.id}`}
                onClick={() => {
                  soundFX.playTelemetryClick();
                  setSelectedCarId(car.id);
                }}
                className={`w-full p-3.5 text-left transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 border-l-4 border-l-red-600 border-white/20 text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="font-heading text-lg font-black italic uppercase text-white tracking-wide">
                    {car.name}
                  </div>
                  <div className="text-xs text-white/50 font-telemetry">
                    {car.teamName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-telemetry text-sm font-black italic text-red-500">
                    {car.topSpeed} KM/H
                  </div>
                  <div className="text-[10px] font-telemetry text-white/40">
                    {car.horsepower} HP
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Car Spec Card & Photography */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="text-[10px] font-telemetry text-red-500 uppercase font-black tracking-widest">
                {selectedCar.teamName} SPECIFICATION
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight">
                {selectedCar.name}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 text-xs font-telemetry text-white/70">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span>FIA HOMOLOGATION</span>
            </div>
          </div>

          {/* Large Hero Car Image */}
          <div className="relative h-60 sm:h-72 overflow-hidden mb-6 bg-black/60 border border-white/10 group">
            <img
              src={selectedCar.imageUrl}
              alt={selectedCar.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-telemetry text-white/70 border border-white/10">
              CARBON FIBER MONOCOQUE
            </div>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-telemetry text-white/80">
              <span>0–100 KM/H: <strong className="text-white font-black italic">{selectedCar.zeroToHundred} SEC</strong></span>
              <span>MIN WEIGHT: <strong className="text-white font-black italic">{selectedCar.weight} KG</strong></span>
            </div>
          </div>

          {/* Primary Performance Metrics Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="p-3 bg-black/40 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase font-bold">TOP SPEED</div>
              <div className="font-telemetry text-2xl font-black italic text-white">{selectedCar.topSpeed}</div>
              <div className="text-[9px] text-white/40 font-telemetry">KM/H</div>
            </div>
            <div className="p-3 bg-black/40 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase font-bold">HORSEPOWER</div>
              <div className="font-telemetry text-2xl font-black italic text-red-500">{selectedCar.horsepower}</div>
              <div className="text-[9px] text-white/40 font-telemetry">BHP @ 15K RPM</div>
            </div>
            <div className="p-3 bg-black/40 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase font-bold">0-100 KM/H</div>
              <div className="font-telemetry text-2xl font-black italic text-emerald-400">{selectedCar.zeroToHundred}</div>
              <div className="text-[9px] text-white/40 font-telemetry">SECONDS</div>
            </div>
            <div className="p-3 bg-black/40 border border-white/10">
              <div className="text-[9px] font-telemetry text-white/40 uppercase font-bold">KERB WEIGHT</div>
              <div className="font-telemetry text-2xl font-black italic text-white">{selectedCar.weight}</div>
              <div className="text-[9px] text-white/40 font-telemetry">KG (WITH PILOT)</div>
            </div>
          </div>

          {/* Aerodynamic & Reliability Rating Meters */}
          <div className="space-y-3 p-4 bg-black/40 border border-white/10">
            {/* Aero Rating */}
            <div>
              <div className="flex items-center justify-between text-xs font-telemetry mb-1">
                <span className="flex items-center gap-1.5 text-white/80">
                  <Wind className="w-3.5 h-3.5 text-blue-400" />
                  <span>AERODYNAMIC EFFICIENCY</span>
                </span>
                <span className="font-bold text-white font-telemetry">{selectedCar.aeroRating}/100</span>
              </div>
              <div className="h-1.5 w-full bg-white/10">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${selectedCar.aeroRating}%` }}
                />
              </div>
            </div>

            {/* Downforce Rating */}
            <div>
              <div className="flex items-center justify-between text-xs font-telemetry mb-1">
                <span className="flex items-center gap-1.5 text-white/80">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>DOWNFORCE LOAD COEFFICIENT</span>
                </span>
                <span className="font-bold text-white font-telemetry">{selectedCar.downforceRating}/100</span>
              </div>
              <div className="h-1.5 w-full bg-white/10">
                <div
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${selectedCar.downforceRating}%` }}
                />
              </div>
            </div>

            {/* Reliability Rating */}
            <div>
              <div className="flex items-center justify-between text-xs font-telemetry mb-1">
                <span className="flex items-center gap-1.5 text-white/80">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>POWER UNIT RELIABILITY</span>
                </span>
                <span className="font-bold text-white font-telemetry">{selectedCar.reliabilityRating}/100</span>
              </div>
              <div className="h-1.5 w-full bg-white/10">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${selectedCar.reliabilityRating}%` }}
                />
              </div>
            </div>
          </div>

          {/* Engineering Specifications Footer */}
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-telemetry text-white/40 uppercase block mb-0.5 font-bold">POWER UNIT ARCHITECTURE</span>
              <span className="text-white/70 leading-relaxed font-light">{selectedCar.engineSpecs}</span>
            </div>
            <div>
              <span className="font-telemetry text-white/40 uppercase block mb-0.5 font-bold">CHASSIS COMPOSITION</span>
              <span className="text-white/70 leading-relaxed font-light">{selectedCar.chassisMaterial}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

