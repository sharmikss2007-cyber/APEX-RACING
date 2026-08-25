import React, { useEffect, useState, useRef } from 'react';
import { Trophy, Users, Shield, Flag, Crown, Activity } from 'lucide-react';

export const ChampionshipDashboard: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animated state counters
  const [races, setRaces] = useState(0);
  const [drivers, setDrivers] = useState(0);
  const [teams, setTeams] = useState(0);
  const [laps, setLaps] = useState(0);
  const [champion, setChampion] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate count-ups smoothly
          const duration = 1200; // ms
          const frameRate = 1000 / 60;
          const totalFrames = Math.round(duration / frameRate);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOutQuad = (t: number) => t * (2 - t);
            const ease = easeOutQuad(progress);

            setRaces(Math.min(10, Math.floor(ease * 10)));
            setDrivers(Math.min(20, Math.floor(ease * 20)));
            setTeams(Math.min(10, Math.floor(ease * 10)));
            setLaps(Math.min(58, Math.floor(ease * 58)));
            setChampion(Math.min(1, Math.floor(ease * 1)));

            if (frame >= totalFrames) {
              clearInterval(timer);
              setRaces(10);
              setDrivers(20);
              setTeams(10);
              setLaps(58);
              setChampion(1);
            }
          }, frameRate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    {
      id: 'stat-races',
      number: races,
      suffix: '',
      label: '10 RACES',
      sublabel: 'Global Grand Prix circuits',
      icon: Flag,
      color: 'bg-red-600',
      textColor: 'text-red-500',
    },
    {
      id: 'stat-drivers',
      number: drivers,
      suffix: '',
      label: '20 DRIVERS',
      sublabel: 'Elite international talents',
      icon: Users,
      color: 'bg-blue-600',
      textColor: 'text-blue-400',
    },
    {
      id: 'stat-teams',
      number: teams,
      suffix: '',
      label: '10 TEAMS',
      sublabel: 'World-class constructors',
      icon: Shield,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
    },
    {
      id: 'stat-laps',
      number: laps,
      suffix: '',
      label: '58 LAPS / RACE',
      sublabel: 'High intensity average distance',
      icon: Activity,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
    },
    {
      id: 'stat-champion',
      number: champion,
      suffix: '',
      label: '1 WORLD TITLE',
      sublabel: 'One ultimate championship crown',
      icon: Crown,
      color: 'bg-yellow-400',
      textColor: 'text-yellow-400',
    },
  ];

  return (
    <section
      id="championship-dashboard"
      ref={sectionRef}
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>SEASON 2026 METRICS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            THE NUMBERS BEHIND THE GLORY <span className="text-red-600 font-normal">///</span>
          </h2>
        </div>
        <p className="text-white/40 text-xs font-telemetry max-w-md">
          Precision engineering, tactical warfare, and human endurance across 10 worldwide circuits.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={item.id}
              className="relative p-4 sm:p-5 bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 shadow-xl group overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${item.color} opacity-70 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-black/40 text-white/50 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-telemetry text-white/30 uppercase tracking-widest font-bold">
                  2026
                </span>
              </div>

              <div className="flex items-baseline gap-1 my-1">
                <span className="font-telemetry text-4xl sm:text-5xl font-black italic text-white tracking-tight">
                  {item.number}
                </span>
                {item.suffix && <span className="font-telemetry text-xl text-white/40">{item.suffix}</span>}
              </div>

              <div className="font-heading text-base sm:text-lg font-black uppercase tracking-tight text-white mt-1">
                {item.label}
              </div>

              <p className="text-[11px] text-white/40 font-light mt-0.5">
                {item.sublabel}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

