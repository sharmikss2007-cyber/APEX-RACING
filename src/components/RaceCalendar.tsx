import React, { useState } from 'react';
import { Calendar, MapPin, Flag, Gauge, Trophy, ArrowUpRight, Filter, Clock } from 'lucide-react';
import { CALENDAR_RACES_DATA } from '../data/racingData';
import { CalendarRace } from '../types';
import { soundFX } from '../utils/audio';

interface RaceCalendarProps {
  onSelectRace: (race: CalendarRace) => void;
}

export const RaceCalendar: React.FC<RaceCalendarProps> = ({ onSelectRace }) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredRaces = CALENDAR_RACES_DATA.filter((race) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return race.status === 'upcoming' || race.status === 'next';
    if (filter === 'completed') return race.status === 'completed';
    return true;
  });

  return (
    <section id="calendar" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>2026 WORLD TOUR</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            CHAMPIONSHIP CALENDAR <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Ten iconic circuits traversing Asia, the Middle East, Europe, North America, and Australia.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex p-1 bg-black/60 border border-white/10">
          {(['all', 'upcoming', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              id={`calendar-filter-${tab}`}
              onClick={() => {
                soundFX.playTelemetryClick();
                setFilter(tab);
              }}
              className={`px-4 py-1.5 text-xs font-heading font-black italic uppercase tracking-wider transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {tab === 'all' ? 'ALL 10 ROUNDS' : tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Race Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredRaces.map((race) => {
          const isNext = race.status === 'next';
          const isCompleted = race.status === 'completed';

          return (
            <div
              key={race.id}
              id={`calendar-card-${race.id}`}
              onClick={() => {
                soundFX.playTelemetryClick();
                onSelectRace(race);
              }}
              className={`relative bg-white/5 border transition-all duration-300 hover:border-red-600/60 shadow-xl overflow-hidden group cursor-pointer flex flex-col justify-between ${
                isNext
                  ? 'border-red-600 ring-1 ring-red-600/40 bg-red-950/10'
                  : 'border-white/10'
              }`}
            >
              {/* Status Header Indicator */}
              <div className="p-5 sm:p-6 pb-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-white/10 text-white font-telemetry font-bold text-[10px]">
                      ROUND {race.round}
                    </span>
                    {isNext && (
                      <span className="px-2 py-0.5 bg-red-600 text-white font-telemetry font-black text-[9px] uppercase tracking-wider animate-pulse">
                        NEXT ROUND
                      </span>
                    )}
                    {isCompleted && (
                      <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-telemetry font-bold text-[9px]">
                        COMPLETED
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-telemetry uppercase text-white/50 font-bold tracking-widest">
                    {race.country}
                  </span>
                </div>

                {/* Race Title & Circuit */}
                <h3 className="font-heading text-2xl font-black italic uppercase text-white group-hover:text-red-500 transition-colors tracking-tight">
                  {race.name}
                </h3>
                <div className="text-xs font-telemetry text-white/60 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{race.circuit}</span>
                </div>

                <div className="text-xs font-telemetry text-red-400 flex items-center gap-1.5 mt-2 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{race.date}</span>
                </div>

                {/* Circuit Specs Matrix */}
                <div className="grid grid-cols-2 gap-2 my-4 p-2.5 bg-black/40 border border-white/10 text-xs font-telemetry">
                  <div>
                    <span className="text-white/40 text-[9px] block uppercase font-bold">LAPS</span>
                    <span className="font-bold text-white text-[11px]">{race.laps} Laps ({race.totalDistance} km)</span>
                  </div>
                  <div>
                    <span className="text-white/40 text-[9px] block uppercase font-bold">LENGTH</span>
                    <span className="font-bold text-white text-[11px]">{race.circuitLength} km</span>
                  </div>
                </div>

                {/* Previous Winner */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-telemetry text-white/40">
                  <span className="flex items-center gap-1 text-[10px]">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>DEFENDING WINNER:</span>
                  </span>
                  <span className="font-bold text-white text-[11px]">{race.previousWinner.driver}</span>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="px-5 sm:px-6 pb-5 pt-0">
                <div className="py-2 px-3 bg-white/5 hover:bg-red-600/20 text-xs font-heading font-black italic uppercase tracking-wider text-white/70 group-hover:text-white flex items-center justify-between transition-colors border border-white/5 group-hover:border-red-600/30">
                  <span>VIEW TRACK MAP & SECTORS</span>
                  <ArrowUpRight className="w-4 h-4 text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

