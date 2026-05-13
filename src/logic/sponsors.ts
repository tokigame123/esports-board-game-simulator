import { Team, Sponsor } from '../types';
import { SPONSOR_CONDITIONS, AVAILABLE_SPONSORS } from '../data/sponsors';

export const checkSponsorConditions = (team: Team): Sponsor[] => {
  const avgPlayerLevel =
    team.players.length > 0
      ? team.players.reduce((sum, p) => sum + p.level, 0) / team.players.length
      : 0;

  return AVAILABLE_SPONSORS.filter((sponsor) => {
    const condition = SPONSOR_CONDITIONS[sponsor.name];
    return avgPlayerLevel >= condition.minTeamLevel && team.fans >= condition.minFans;
  });
};

export const contractSponsor = (team: Team, sponsor: Sponsor): Team => {
  // 既に同じスポンサーと契約していないか確認
  if (team.sponsors.find((s) => s.id === sponsor.id)) {
    return team;
  }

  return {
    ...team,
    sponsors: [...team.sponsors, { ...sponsor, contractTurns: sponsor.contractTurns }],
  };
};

export const applySponsorRewards = (team: Team): Team => {
  let totalReward = 0;
  let totalFanBonus = 0;

  team.sponsors.forEach((sponsor) => {
    totalReward += sponsor.reward;
    totalFanBonus += sponsor.fanBonus;
  });

  return {
    ...team,
    money: team.money + totalReward,
    fans: Math.floor(team.fans * (1 + totalFanBonus / 100)),
  };
};
