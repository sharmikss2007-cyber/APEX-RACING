import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NextRaceCountdown } from './components/NextRaceCountdown';
import { ChampionshipDashboard } from './components/ChampionshipDashboard';
import { StandingsLeaderboard } from './components/StandingsLeaderboard';
import { TeamsSection } from './components/TeamsSection';
import { DriversSection } from './components/DriversSection';
import { RaceCarsSection } from './components/RaceCarsSection';
import { CarConfigurator } from './components/CarConfigurator';
import { RaceControlSimulator } from './components/RaceControlSimulator';
import { RaceCalendar } from './components/RaceCalendar';
import { PitStrategyTool } from './components/PitStrategyTool';
import { RaceResultsSection } from './components/RaceResultsSection';
import { HallOfFame } from './components/HallOfFame';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { FanZone } from './components/FanZone';
import { Footer } from './components/Footer';

import { TrackDetailModal } from './components/TrackDetailModal';
import { TeamModal } from './components/TeamModal';
import { DriverModal } from './components/DriverModal';

import { Team, Driver, CalendarRace } from './types';
import { CALENDAR_RACES_DATA } from './data/racingData';

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedTrackRace, setSelectedTrackRace] = useState<CalendarRace | null>(null);

  // Quick helper to open Singapore track modal from countdown
  const handleOpenSingaporeTrack = () => {
    const singapore = CALENDAR_RACES_DATA.find((r) => r.id === 'singapore') || CALENDAR_RACES_DATA[3];
    setSelectedTrackRace(singapore);
  };

  const handleOpenDriverCompare = (driverA?: Driver) => {
    const compareElement = document.getElementById('drivers-compare-toggle-btn');
    if (compareElement) {
      compareElement.scrollIntoView({ behavior: 'smooth' });
      // Trigger toggle if not already open
      const comparisonTool = document.getElementById('driver-comparison-tool');
      if (!comparisonTool) {
        compareElement.click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      {/* Carbon fiber subtle background pattern */}
      <div className="fixed inset-0 bg-carbon pointer-events-none opacity-40 z-0" />

      {/* Main App Layout */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <Navbar />

        <main id="main-content">
          {/* Cinematic Hero */}
          <Hero />

          {/* Next Race Countdown */}
          <NextRaceCountdown onOpenTrackModal={handleOpenSingaporeTrack} />

          {/* Championship Live Stat Matrix */}
          <ChampionshipDashboard />

          {/* Standings Leaderboard (Drivers & Constructors) */}
          <StandingsLeaderboard
            onSelectDriver={(driver) => setSelectedDriver(driver)}
            onSelectTeam={(team) => setSelectedTeam(team)}
          />

          {/* Teams / Constructors Section */}
          <TeamsSection onSelectTeam={(team) => setSelectedTeam(team)} />

          {/* Drivers Section & Comparison */}
          <DriversSection
            onSelectDriver={(driver) => setSelectedDriver(driver)}
            onOpenCompare={handleOpenDriverCompare}
          />

          {/* The Machines (Race Cars) */}
          <RaceCarsSection />

          {/* Interactive Car Configurator */}
          <CarConfigurator />

          {/* Live Race Simulator (Race Control) */}
          <RaceControlSimulator />

          {/* Championship Calendar & Track Maps */}
          <RaceCalendar onSelectRace={(race) => setSelectedTrackRace(race)} />

          {/* Pit Stop Strategy Simulator */}
          <PitStrategyTool />

          {/* Race Results & Classification Archive */}
          <RaceResultsSection />

          {/* Apex Trophy & Hall of Fame */}
          <HallOfFame />

          {/* News & Paddock Reports */}
          <NewsSection />

          {/* Cinematic Media Gallery */}
          <GallerySection />

          {/* Apex Fan Zone (Polls & Trivia) */}
          <FanZone />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* Interactive Modals */}
      {selectedTrackRace && (
        <TrackDetailModal
          race={selectedTrackRace}
          onClose={() => setSelectedTrackRace(null)}
        />
      )}

      {selectedTeam && (
        <TeamModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onSelectDriver={(driver) => setSelectedDriver(driver)}
        />
      )}

      {selectedDriver && (
        <DriverModal
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
          onOpenCompare={handleOpenDriverCompare}
        />
      )}
    </div>
  );
}
