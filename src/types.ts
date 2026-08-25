export interface Driver {
  id: string;
  name: string;
  number: number;
  code: string;
  nationality: string;
  countryCode: string;
  teamId: string;
  teamName: string;
  teamColor: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  avgQualifying: number;
  avgFinish: number;
  bio: string;
  birthDate: string;
  worldTitles: number;
  avatarUrl: string;
  helmetColor: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  base: string;
  teamPrincipal: string;
  technicalDirector: string;
  chassis: string;
  powerUnit: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  color: string;
  accentColor: string;
  logoText: string;
  driverIds: string[];
  carModel: string;
  carImageUrl: string;
  description: string;
  foundedYear: number;
}

export interface RaceCar {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  topSpeed: number; // km/h
  horsepower: number; // HP
  weight: number; // kg
  zeroToHundred: number; // sec
  downforceRating: number; // /100
  aeroRating: number; // /100
  reliabilityRating: number; // /100
  imageUrl: string;
  engineSpecs: string;
  chassisMaterial: string;
}

export interface CalendarRace {
  id: string;
  round: number;
  name: string;
  circuit: string;
  location: string;
  country: string;
  countryCode: string;
  date: string;
  laps: number;
  circuitLength: number; // km
  totalDistance: number; // km
  corners: number;
  drsZones: number;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  previousWinner: {
    driver: string;
    team: string;
    year: number;
  };
  status: 'completed' | 'upcoming' | 'next';
  weatherTendency: string;
  trackMapSvg?: string;
  elevationChange: number; // m
}

export interface RaceResultEntry {
  position: number;
  gridPosition: number;
  driverId: string;
  driverName: string;
  driverCode: string;
  teamName: string;
  teamColor: string;
  timeOrStatus: string;
  gap: string;
  interval: string;
  points: number;
  fastestLap: boolean;
  fastestLapTime?: string;
  pitStops: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Race Report' | 'Technical' | 'Paddock' | 'Weather' | 'Championship';
  date: string;
  readTime: string;
  imageUrl: string;
  content: string[];
  author: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cars' | 'Action' | 'Paddock' | 'Trophies' | 'Night Racing';
  location: string;
  imageUrl: string;
  caption: string;
}

export interface HallOfFameEntry {
  year: number;
  champion: string;
  team: string;
  nationality: string;
  points: number;
  wins: number;
  runnerUp: string;
  highlight: string;
  trophyType: string;
}

export interface SavedCarBuild {
  id: string;
  name: string;
  createdAt: string;
  engine: string;
  aero: string;
  tires: string;
  suspension: string;
  brakes: string;
  powerScore: number;
  speedScore: number;
  corneringScore: number;
  brakingScore: number;
  reliabilityScore: number;
  overallScore: number;
}

export interface SimulationDriverState {
  driverId: string;
  name: string;
  code: string;
  teamName: string;
  teamColor: string;
  currentPosition: number;
  startingPosition: number;
  gapToLeader: number; // in seconds
  intervalToAhead: number; // in seconds
  tireType: 'Soft' | 'Medium' | 'Hard';
  tireWear: number; // percentage 0-100
  pitStops: number;
  lastLapTime: string;
  bestLapTime: string;
  isFastestLap: boolean;
  status: 'Running' | 'In Pit' | 'Out' | 'Finished';
}
