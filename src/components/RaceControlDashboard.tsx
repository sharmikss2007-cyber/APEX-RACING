import React from 'react';
import { Flag, Sun, CloudRain, Thermometer, Wind, ShieldAlert, Timer, Radio } from 'lucide-react';

interface RaceControlDashboardProps {
  trackStatus: 'GREEN' | 'YELLOW' | 'SAFETY_CAR' | 'RED' | 'CHEQUERED';
  weather: 'Clear' | 'Overcast' | 'Light Rain' | 'Heavy Rain';
  trackTemp: number;
  airTemp: number;
  windSpeed: number;
  safetyCarActive: boolean;
  fastestLap: {
    driver: string;
    time: string;
    team: string;
  };
}

export const RaceControlDashboard: React.FC<RaceControlDashboardProps> = ({
  trackStatus,
  weather,
  trackTemp,
  airTemp,
  windSpeed,
  safetyCarActive,
  fastestLap,
}) => {
  return (
    <div
      id="race-control-dashboard-panel"
      className="p-4 sm:p-5 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md mb-6"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-red-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="text-[10px] font-telemetry uppercase text-white font-black tracking-widest">
            FIA RACE CONTROL TELEMETRY HUB
          </span>
        </div>
        <span className="text-[9px] font-telemetry text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 font-bold animate-pulse">
          FEED ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Track Status */}
        <div className="p-3 bg-black/40 border border-white/10 flex flex-col justify-between">
          <span className="text-[9px] font-telemetry text-white/40 uppercase font-bold">TRACK STATUS</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                trackStatus === 'GREEN'
                  ? 'bg-emerald-400 animate-ping'
                  : trackStatus === 'YELLOW'
                  ? 'bg-yellow-400 animate-ping'
                  : trackStatus === 'SAFETY_CAR'
                  ? 'bg-amber-500 animate-ping'
                  : trackStatus === 'CHEQUERED'
                  ? 'bg-white animate-pulse'
                  : 'bg-red-500 animate-ping'
              }`}
            />
            <span
              className={`font-heading text-base font-black italic uppercase ${
                trackStatus === 'GREEN'
                  ? 'text-emerald-400'
                  : trackStatus === 'YELLOW'
                  ? 'text-yellow-400'
                  : trackStatus === 'SAFETY_CAR'
                  ? 'text-amber-400'
                  : trackStatus === 'CHEQUERED'
                  ? 'text-white'
                  : 'text-red-500'
              }`}
            >
              {trackStatus === 'GREEN'
                ? 'GREEN FLAG'
                : trackStatus === 'SAFETY_CAR'
                ? 'SAFETY CAR'
                : trackStatus === 'CHEQUERED'
                ? 'CHEQUERED'
                : trackStatus}
            </span>
          </div>
        </div>

        {/* Weather */}
        <div className="p-3 bg-black/40 border border-white/10 flex flex-col justify-between">
          <span className="text-[9px] font-telemetry text-white/40 uppercase font-bold">WEATHER</span>
          <div className="flex items-center gap-1.5 mt-1">
            {weather.includes('Rain') ? (
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="font-heading text-base font-black italic uppercase text-white">
              {weather}
            </span>
          </div>
        </div>

        {/* Track Temp */}
        <div className="p-3 bg-black/40 border border-white/10 flex flex-col justify-between">
          <span className="text-[9px] font-telemetry text-white/40 uppercase font-bold">TRACK TEMP</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Thermometer className="w-3.5 h-3.5 text-red-500" />
            <span className="font-telemetry text-base font-black italic text-white">
              {trackTemp}°C
            </span>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="p-3 bg-black/40 border border-white/10 flex flex-col justify-between">
          <span className="text-[9px] font-telemetry text-white/40 uppercase font-bold">WIND</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Wind className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-telemetry text-base font-black italic text-white">
              {windSpeed} KM/H
            </span>
          </div>
        </div>

        {/* Safety Car */}
        <div className="p-3 bg-black/40 border border-white/10 flex flex-col justify-between">
          <span className="text-[9px] font-telemetry text-white/40 uppercase font-bold">SAFETY CAR</span>
          <div className="flex items-center gap-1.5 mt-1">
            <ShieldAlert className={`w-3.5 h-3.5 ${safetyCarActive ? 'text-amber-400 animate-bounce' : 'text-white/40'}`} />
            <span className={`font-heading text-base font-black italic uppercase ${safetyCarActive ? 'text-amber-400' : 'text-white/40'}`}>
              {safetyCarActive ? 'DEPLOYED' : 'INACTIVE'}
            </span>
          </div>
        </div>

        {/* Fastest Lap */}
        <div className="p-3 bg-black/40 border border-white/10 flex flex-col justify-between">
          <span className="text-[9px] font-telemetry text-white/40 uppercase font-bold">FASTEST LAP</span>
          <div className="flex flex-col mt-0.5">
            <span className="font-telemetry text-sm font-black italic text-purple-400">
              {fastestLap.time}
            </span>
            <span className="text-[9px] font-telemetry text-white/40 truncate">
              {fastestLap.driver}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

