import React, { useState, useEffect } from 'react';
import {
  Flag,
  Radio,
  Trophy,
  Users,
  User,
  Gauge,
  Calendar,
  Layers,
  Sparkles,
  Newspaper,
  Image as ImageIcon,
  Menu,
  X,
  Volume2,
  VolumeX,
  Search,
  ChevronRight,
  Flame,
  Activity
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenSearch?: () => void;
  onOpenRaceControl?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = 'hero',
  onNavigate,
  onOpenSearch,
  onOpenRaceControl,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    const nextMute = !isMuted;
    soundFX.setMuted(nextMute);
    setIsMuted(nextMute);
    if (!nextMute) {
      soundFX.playTelemetryClick();
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Dashboard', icon: Flag },
    { id: 'standings', label: 'Championship', icon: Trophy },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'drivers', label: 'Drivers', icon: User },
    { id: 'cars', label: 'Machines', icon: Gauge },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'race-control', label: 'Live Race', icon: Radio },
    { id: 'results', label: 'Results', icon: Layers },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'fan-zone', label: 'Fan Zone', icon: Sparkles },
  ];

  const handleLinkClick = (id: string) => {
    soundFX.playTelemetryClick();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleRaceControlClick = () => {
    soundFX.playTelemetryClick();
    if (onOpenRaceControl) {
      onOpenRaceControl();
    } else {
      const el = document.getElementById('race-control');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'h-16 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80'
          : 'h-16 sm:h-20 bg-gradient-to-b from-[#050505]/95 via-[#050505]/75 to-transparent border-b border-white/5'
      } flex items-center`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Navigation */}
        <div className="flex items-center gap-6 lg:gap-10">
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('hero')}
            className="flex items-center text-left cursor-pointer focus:outline-none group"
          >
            <div className="text-2xl sm:text-3xl font-black italic tracking-tighter flex items-center text-white select-none">
              <span className="text-red-600 mr-1 group-hover:translate-x-0.5 transition-transform">//</span>
              <span>APEX</span>
              <span className="font-light ml-1.5 opacity-60 text-slate-300">RACING</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[10px] font-bold uppercase tracking-widest">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-red-500 font-black'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Track Status, Race Control Skewed CTA, Audio, Search */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Live Track Status Indicator */}
          <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-4">
            <span className="text-[9px] text-white/40 uppercase font-bold tracking-tighter">
              Track Status
            </span>
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              GREEN FLAG
            </span>
          </div>

          {/* Search Button */}
          <button
            id="nav-search-btn"
            onClick={() => {
              soundFX.playTelemetryClick();
              if (onOpenSearch) onOpenSearch();
              else {
                const searchEl = document.getElementById('search-drivers-input') || document.getElementById('search-teams-input');
                if (searchEl) searchEl.focus();
              }
            }}
            title="Search Championship (Drivers, Teams, Tracks)"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sound FX Toggle */}
          <button
            id="nav-audio-btn"
            onClick={toggleMute}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-red-500" />}
          </button>

          {/* Skewed High-Octane Race Control Button */}
          <button
            id="nav-race-control-cta"
            onClick={handleRaceControlClick}
            className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-black px-4 sm:px-5 py-2 uppercase tracking-widest skew-x-[-12deg] transition-all transform hover:scale-105 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/30"
          >
            <span className="skew-x-[12deg] flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>RACE CONTROL</span>
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden absolute top-full left-0 right-0 bg-[#07080c]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                    link.id === 'race-control'
                      ? 'col-span-2 bg-red-600 text-white shadow-md'
                      : isActive
                      ? 'bg-red-600/20 border border-red-500/40 text-red-400'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${link.id === 'race-control' ? 'text-white' : isActive ? 'text-red-400' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-telemetry text-slate-400 px-1">
            <span className="uppercase text-white/40 font-bold tracking-tighter">Track Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              GREEN FLAG
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
