import { Team } from '../types';

export interface FinalScore {
  teamId: string;
  teamName: string;
  score: number;
  breakdown: {
    playerDevelopment: number;
    fanGrowth: number;
    sponsorValue: number;
    tournamentWins: number;
    blueOcean: number;
  };
}

export const calculateFinalScore = (
  team: Team,
  matchWins: number,
  blueOceanPoints: number = 0
): FinalScore => {
  const playerDevelopment = team.players.reduce((sum, p) => sum + p.level * 10, 0);
  const fanGrowth = Math.floor(team.fans / 100);
  const sponsorValue = team.sponsors.reduce((sum, s) => sum + s.reward * 10, 0);
  const tournamentWins = matchWins * 100;
  const blueOcean = blueOceanPoints;

  const totalScore =
    playerDevelopment + fanGrowth + sponsorValue + tournamentWins + blueOcean;

  return {
    teamId: team.id,
    teamName: team.name,
    score: totalScore,
    breakdown: {
      playerDevelopment,
      fanGrowth,
      sponsorValue,
      tournamentWins,
      blueOcean,
    },
  };
};

export const calculateAllFinalScores = (
  teams: Team[],
  matchResults: any[],
  blueOceanPoints: { [teamId: string]: number }
): FinalScore[] => {
  return teams.map((team) => {
    const wins = matchResults.filter((m) => m.winner === team.id).length;
    const blueOcean = blueOceanPoints[team.id] || 0;
    return calculateFinalScore(team, wins, blueOcean);
  });
};
