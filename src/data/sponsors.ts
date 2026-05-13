import { Sponsor } from '../types';

export const AVAILABLE_SPONSORS: Sponsor[] = [
  {
    id: 's1',
    name: 'TechCorp Gaming',
    type: 'Hardware',
    contractTurns: 3,
    reward: 50,
    fanBonus: 10,
  },
  {
    id: 's2',
    name: 'Energy Boost',
    type: 'Energy',
    contractTurns: 2,
    reward: 30,
    fanBonus: 5,
  },
  {
    id: 's3',
    name: 'Pro Apparel',
    type: 'Apparel',
    contractTurns: 4,
    reward: 40,
    fanBonus: 15,
  },
  {
    id: 's4',
    name: 'Media Star',
    type: 'Media',
    contractTurns: 3,
    reward: 60,
    fanBonus: 20,
  },
];

export const SPONSOR_CONDITIONS = {
  'TechCorp Gaming': { minTeamLevel: 2, minFans: 5000 },
  'Energy Boost': { minTeamLevel: 1, minFans: 2000 },
  'Pro Apparel': { minTeamLevel: 2, minFans: 8000 },
  'Media Star': { minTeamLevel: 3, minFans: 15000 },
};
