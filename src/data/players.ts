import { Player } from '../types';

export const INITIAL_PLAYERS: Player[] = [
  // Attackers
  { id: 'p1', name: 'Lightning', type: 'Attacker', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p2', name: 'Blaze', type: 'Attacker', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p3', name: 'Inferno', type: 'Attacker', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p4', name: 'Thunder', type: 'Attacker', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p5', name: 'Storm', type: 'Attacker', level: 1, fans: 0, experience: 0, retired: false },

  // Defenders
  { id: 'p6', name: 'Fortress', type: 'Defender', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p7', name: 'Guardian', type: 'Defender', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p8', name: 'Sentinel', type: 'Defender', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p9', name: 'Bastion', type: 'Defender', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p10', name: 'Rampart', type: 'Defender', level: 1, fans: 0, experience: 0, retired: false },

  // Supporters
  { id: 'p11', name: 'Echo', type: 'Supporter', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p12', name: 'Harmony', type: 'Supporter', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p13', name: 'Synergy', type: 'Supporter', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p14', name: 'Resonance', type: 'Supporter', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p15', name: 'Unity', type: 'Supporter', level: 1, fans: 0, experience: 0, retired: false },

  // Floaters
  { id: 'p16', name: 'Phantom', type: 'Floater', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p17', name: 'Shadow', type: 'Floater', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p18', name: 'Specter', type: 'Floater', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p19', name: 'Wraith', type: 'Floater', level: 1, fans: 0, experience: 0, retired: false },
  { id: 'p20', name: 'Mirage', type: 'Floater', level: 1, fans: 0, experience: 0, retired: false },
];

// 相性判定（攻撃vs防御）
const MATCHUP_TABLE: { [key: string]: { [key: string]: number } } = {
  'Attacker-Defender': {
    'Attacker-Attacker': 50,
    'Attacker-Supporter': 65,
    'Attacker-Floater': 45,
    'Defender-Defender': 35,
    'Defender-Supporter': 50,
    'Defender-Floater': 60,
    'Supporter-Supporter': 50,
    'Supporter-Floater': 55,
    'Floater-Floater': 50,
  },
};

export const getWinProbability = (attackerType: string, defenderType: string): number => {
  const key = `${attackerType}-${defenderType}`;
  const table = MATCHUP_TABLE['Attacker-Defender'];
  return table[key] || 50;
};
