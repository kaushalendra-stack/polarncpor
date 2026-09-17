export type Region = "Antarctica" | "Arctic" | "Southern Ocean" | "Himalaya";

export type ExpeditionStatus = "active" | "completed" | "planned";

export interface Expedition {
  slug: string;
  name: string;
  designation: string;
  region: Region;
  station: string;
  year: number;
  startDate: string;
  endDate: string;
  leader: string;
  status: ExpeditionStatus;
  crewCount: number;
  ship: string;
  summary: string;
  objectives: string[];
  highlights: string[];
  theme: string;
  recent?: boolean;
}

export interface Dataset {
  id: string;
  title: string;
  category:
    | "Atmosphere"
    | "Oceans"
    | "Cryosphere"
    | "Paleoclimate"
    | "Biosphere"
    | "Land Surface"
    | "Biological Classification"
    | "Solid Earth"
    | "Human Dimensions"
    | "Sun-Earth Interactions";
  description: string;
  station: string;
  year: number;
  format: string;
  size: string;
  records: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  type: "Research Paper" | "Technical Report" | "Annual Report" | "Review";
}

export interface MediaItem {
  id: string;
  type: "photo" | "video";
  title: string;
  src?: string;
  expedition: string;
  year: number;
  location: string;
  tags: string[];
  duration?: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
}

export interface StationWeather {
  station: string;
  region: string;
  temp: number;
  wind: number;
  pressure: number;
  humidity: number;
  icon: string;
}

export interface Vessel {
  id: string;
  name: string;
  type: string;
  operator: string;
  status: "At Sea" | "In Harbour" | "Resupply Mission";
  ocean: string;
  destination: string;
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  distanceCovered: number;
  daysAtSea: number;
  startDate: string;
  crew: number;
  icon: string;
  route: { lat: number; lng: number }[];
}