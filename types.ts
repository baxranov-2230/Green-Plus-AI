export interface KPIMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  icon: 'trending-up' | 'shield' | 'clock' | 'database';
  color: string;
}

export interface BudgetItem {
  year: string;
  amount: number;
  phase: string;
}

export interface TechItem {
  category: string;
  items: string;
  icon: 'cpu' | 'network' | 'brain' | 'server' | 'lock';
}

export interface Deliverable {
  type: string;
  count: string;
  comment: string;
}

export interface ImpactItem {
  area: string;
  description: string;
  icon: 'leaf' | 'users' | 'dollar-sign' | 'eye';
}

export interface Sensor {
  id: string;
  name: string;
  type: 'air' | 'water' | 'waste' | 'energy' | 'noise' | 'vibration' | 'radiation';
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  location: { x: number; y: number }; // Percentage coordinates
}

export interface Enterprise {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'maintenance' | 'offline';
}