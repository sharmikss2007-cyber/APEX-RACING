import React, { useState } from 'react';
import { Heart, Vote, Sparkles, Trophy, CheckCircle, HelpCircle } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface PollOption {
  id: string;
  name: string;
  votes: number;
  team: string;
  color: string;
}

export const FanZone: React.FC = () => {
  // Poll 1: Race Winner
  const [winnerOptions, setWinnerOptions] = useState<PollOption[]>([
    { id: 'alex-carter', name: 'Alex Carter', votes: 1420, team: 'Apex Velocity', color: '#ef4444' },
    { id: 'ryan-blake', name: 'Ryan Blake', votes: 1180, team: 'Titan Racing', color: '#3b82f6' },
    { id: 'daniel-cruz', name: 'Daniel Cruz', votes: 890, team: 'Nova Motorsport', color: '#10b981' },
    { id: 'ethan-cole', name: 'Ethan Cole', votes: 540, team: 'Shadow Racing', color: '#f59e0b' },
  ]);
  const [hasVotedWinner, setHasVotedWinner] = useState<string | null>(null);

  // Poll 2: Driver of the Day
  const [dotdOptions, setDotdOptions] = useState<PollOption[]>([
    { id: 'mason-reed', name: 'Mason Reed', votes: 760, team: 'Apex Velocity', color: '#ef4444' },
    { id: 'lucas-grant', name: 'Lucas Grant', votes: 940, team: 'Nova Motorsport', color: '#10b981' },
    { id: 'oliver-stone', name: 'Oliver Stone', votes: 610, team: 'Titan Racing', color: '#3b82f6' },
    { id: 'adrian-fox', name: 'Adrian Fox', votes: 430, team: 'Shadow Racing', color: '#f59e0b' },
  ]);
  const [hasVotedDotd, setHasVotedDotd] = useState<string | null>(null);

  // Interactive Motorsport Trivia
  const [triviaSelected, setTriviaSelected] = useState<number | null>(null);
  const [triviaSubmitted, setTriviaSubmitted] = useState(false);

  const triviaQuestion = {
    q: 'Which circuit features the longest continuous DRS zone in the Apex Championship?',
    options: [
      'Singapore Street Circuit',
      'Dubai Desert Grand Prix (1.2 km Straight)',
      'Monza International Circuit',
      'Tokyo Bay Street Track',
    ],
    correctIdx: 1,
    explanation: 'The Dubai Desert GP features a 1,240-meter full-throttle back straight generating speeds upwards of 354 km/h.',
  };

  const handleVoteWinner = (id: string) => {
    if (hasVotedWinner) return;
    soundFX.playTelemetryClick();
    setHasVotedWinner(id);
    setWinnerOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
  };

  const handleVoteDotd = (id: string) => {
    if (hasVotedDotd) return;
    soundFX.playTelemetryClick();
    setHasVotedDotd(id);
    setDotdOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
  };

  const totalWinnerVotes = winnerOptions.reduce((acc, curr) => acc + curr.votes, 0);
  const totalDotdVotes = dotdOptions.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <section id="fan-zone" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1">
            <Heart className="w-3.5 h-3.5" />
            <span>GLOBAL PADDOCK COMMUNITY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
            THE APEX FAN ZONE <span className="text-red-600 font-normal">///</span>
          </h2>
          <p className="text-white/40 text-xs font-telemetry max-w-xl mt-1">
            Cast official fan votes for Grand Prix winners, select Driver of the Day, and test your championship technical acumen.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Poll 1: Singapore GP Winner */}
        <div className="p-5 bg-white/5 border border-white/10 shadow-xl flex flex-col justify-between h-full backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
              <span className="text-[9px] font-telemetry uppercase text-red-500 font-black tracking-widest">
                ROUND 4 FAN POLL
              </span>
              <span className="text-[9px] font-telemetry text-white/40 font-bold">
                {totalWinnerVotes.toLocaleString()} VOTES CAST
              </span>
            </div>

            <h3 className="font-heading text-lg font-black italic uppercase text-white mb-1.5 leading-tight">
              WHO WILL WIN THE SINGAPORE GRAND PRIX?
            </h3>
            <p className="text-[11px] font-telemetry text-white/40 mb-4">
              Night street circuit with 19 high-precision corners. Select your projected race winner:
            </p>

            {/* Poll Options */}
            <div className="space-y-2">
              {winnerOptions.map((opt) => {
                const percentage = Math.round((opt.votes / totalWinnerVotes) * 100);
                const isSelected = hasVotedWinner === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleVoteWinner(opt.id)}
                    disabled={!!hasVotedWinner}
                    className={`w-full p-2.5 border text-left transition-all relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'border-red-600 bg-red-600/20'
                        : 'border-white/10 bg-black/40 hover:bg-white/10'
                    }`}
                  >
                    {/* Background fill percentage bar */}
                    {hasVotedWinner && (
                      <div
                        className="absolute inset-y-0 left-0 bg-white/10 transition-all duration-700 pointer-events-none"
                        style={{ width: `${percentage}%` }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="font-heading text-xs font-black italic uppercase text-white">
                          {opt.name}
                        </div>
                        <div className="text-[9px] font-telemetry text-white/40">
                          {opt.team}
                        </div>
                      </div>
                      {hasVotedWinner && (
                        <div className="font-telemetry text-xs font-black text-red-500">
                          {percentage}%
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-2.5 border-t border-white/5 text-[9px] font-telemetry text-white/40 text-center uppercase tracking-widest">
            {hasVotedWinner ? 'VOTE RECORDED • THANKS FOR PARTICIPATING' : 'CLICK TO CAST YOUR VOTE'}
          </div>
        </div>

        {/* Poll 2: Driver of the Day */}
        <div className="p-5 bg-white/5 border border-white/10 shadow-xl flex flex-col justify-between h-full backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
              <span className="text-[9px] font-telemetry uppercase text-emerald-400 font-black tracking-widest">
                FAN RECOGNITION
              </span>
              <span className="text-[9px] font-telemetry text-white/40 font-bold">
                {totalDotdVotes.toLocaleString()} VOTES
              </span>
            </div>

            <h3 className="font-heading text-lg font-black italic uppercase text-white mb-1.5 leading-tight">
              DRIVER OF THE DAY CANDIDATES
            </h3>
            <p className="text-[11px] font-telemetry text-white/40 mb-4">
              Awarded to the driver delivering the most impressive overtaking performance:
            </p>

            <div className="space-y-2">
              {dotdOptions.map((opt) => {
                const percentage = Math.round((opt.votes / totalDotdVotes) * 100);
                const isSelected = hasVotedDotd === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleVoteDotd(opt.id)}
                    disabled={!!hasVotedDotd}
                    className={`w-full p-2.5 border text-left transition-all relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-600/20'
                        : 'border-white/10 bg-black/40 hover:bg-white/10'
                    }`}
                  >
                    {hasVotedDotd && (
                      <div
                        className="absolute inset-y-0 left-0 bg-emerald-500/15 transition-all duration-700 pointer-events-none"
                        style={{ width: `${percentage}%` }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="font-heading text-xs font-black italic uppercase text-white">
                          {opt.name}
                        </div>
                        <div className="text-[9px] font-telemetry text-white/40">
                          {opt.team}
                        </div>
                      </div>
                      {hasVotedDotd && (
                        <div className="font-telemetry text-xs font-black text-emerald-400">
                          {percentage}%
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-2.5 border-t border-white/5 text-[9px] font-telemetry text-white/40 text-center uppercase tracking-widest">
            {hasVotedDotd ? 'OFFICIAL BALLOT RECORDED' : 'SELECT TO VOTE DOTD'}
          </div>
        </div>

        {/* Technical Trivia Challenge */}
        <div className="p-5 bg-white/5 border border-white/10 shadow-xl flex flex-col justify-between h-full backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
              <span className="text-[9px] font-telemetry uppercase text-amber-400 font-black tracking-widest flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                <span>PADDOCK QUIZ</span>
              </span>
              <span className="text-[9px] font-telemetry text-white/40 font-bold">+50 FAN XP</span>
            </div>

            <h3 className="font-heading text-lg font-black italic uppercase text-white mb-1.5 leading-tight">
              TECHNICAL TRIVIA
            </h3>
            <p className="text-xs text-white/70 font-telemetry mb-3">
              {triviaQuestion.q}
            </p>

            <div className="space-y-1.5 mb-3">
              {triviaQuestion.options.map((option, idx) => {
                const isSelected = triviaSelected === idx;
                const isCorrect = idx === triviaQuestion.correctIdx;

                let btnStyle = 'border-white/10 bg-black/40 hover:bg-white/10 text-white/60';
                if (triviaSubmitted) {
                  if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-600/20 text-emerald-300 font-bold';
                  else if (isSelected) btnStyle = 'border-red-600 bg-red-600/20 text-red-300';
                } else if (isSelected) {
                  btnStyle = 'border-amber-400 bg-amber-400/20 text-white font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!triviaSubmitted) {
                        soundFX.playTelemetryClick();
                        setTriviaSelected(idx);
                      }
                    }}
                    className={`w-full p-2 border text-[11px] font-telemetry text-left transition-all cursor-pointer ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {!triviaSubmitted ? (
              <button
                disabled={triviaSelected === null}
                onClick={() => {
                  soundFX.playTelemetryClick();
                  setTriviaSubmitted(true);
                }}
                className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black font-heading font-black italic text-xs uppercase tracking-wider disabled:opacity-40 cursor-pointer"
              >
                SUBMIT ANSWER
              </button>
            ) : (
              <div className="p-2.5 bg-black/40 border border-white/10 text-xs text-white/70 font-telemetry">
                <span className="text-amber-400 font-bold block mb-0.5">
                  {triviaSelected === triviaQuestion.correctIdx ? '🎉 CORRECT!' : '❌ INCORRECT'}
                </span>
                {triviaQuestion.explanation}
              </div>
            )}
          </div>

          <div className="mt-4 pt-2.5 border-t border-white/5 text-[9px] font-telemetry text-white/40 text-center uppercase tracking-widest">
            WEEKLY TECHNICAL MOTORSPORT CHALLENGE
          </div>
        </div>
      </div>
    </section>
  );
};

