import { Team, Player } from '../types';
import { getWinProbability } from '../data/players';

export interface MatchResult {
  team1Id: string;
  team2Id: string;
  team1Score: number;
  team2Score: number;
  winner: string;
}

const calculateTeamStrength = (team: Team): number => {
  if (team.players.length === 0) return 0;
  const avgLevel = team.players.reduce((sum, p) => sum + p.level, 0) / team.players.length;
  const avgFans = team.fans / 1000;
  return avgLevel * 10 + avgFans;
};

const getPlayerComposition = (team: Team) => {
  const types: { [key: string]: number } = {};
  team.players.forEach((p) => {
    types[p.type] = (types[p.type] || 0) + 1;
  });
  return types;
};

const simulateRound = (team1: Team, team2: Team): { team1: number; team2: number } => {
  const str1 = calculateTeamStrength(team1);
  const str2 = calculateTeamStrength(team2);

  const total = str1 + str2;
  const prob1 = str1 / total;

  const random = Math.random();
  return random < prob1 ? { team1: 1, team2: 0 } : { team1: 0, team2: 1 };
};

export const resolveMatch = (team1: Team, team2: Team): MatchResult => {
  let team1Wins = 0;
  let team2Wins = 0;

  // BO3（先に2勝）
  for (let i = 0; i < 3; i++) {
    const round = simulateRound(team1, team2);
    team1Wins += round.team1;
    team2Wins += round.team2;

    if (team1Wins === 2 || team2Wins === 2) {
      break;
    }
  }

  return {
    team1Id: team1.id,
    team2Id: team2.id,
    team1Score: team1Wins,
    team2Score: team2Wins,
    winner: team1Wins > team2Wins ? team1.id : team2.id,
  };
};

export const resolveAllMatches = (teams: Team[]): MatchResult[] => {
  const matches: MatchResult[] = [];
  const played = new Set<string>();

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const key = `${i}-${j}`;
      if (!played.has(key)) {
        const match = resolveMatch(teams[i], teams[j]);
        matches.push(match);
        played.add(key);
      }
    }
  }

  return matches;
};
