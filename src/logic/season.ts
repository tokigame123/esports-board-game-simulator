import { Team } from '../types';

export const processSeasonEnd = (teams: Team[]): Team[] => {
  return teams.map((team) => {
    const newTeam = { ...team };

    // スポンサー報酬（毎ターン加算済みと仮定）
    // ここではスポンサー契約を自動更新
    newTeam.sponsors = newTeam.sponsors
      .map((s) => ({ ...s, contractTurns: s.contractTurns - 1 }))
      .filter((s) => s.contractTurns > 0);

    // 選手引退判定（5ターン以上経過で確率判定）
    newTeam.players = newTeam.players.filter((p) => {
      if (p.experience > 100) {
        return Math.random() > 0.3; // 30%の確率で引退
      }
      return true;
    });

    // 給料支払い（月50万ST × 3人 = 150万ST）
    const salaryPerPlayer = 50;
    const totalSalary = newTeam.players.length * salaryPerPlayer;
    newTeam.money = Math.max(0, newTeam.money - totalSalary);

    // シーズン記録を保存
    newTeam.seasonHistory.push({
      season: team.seasonHistory.length + 1,
      finalRank: 1,
      totalFans: team.fans,
      totalMoney: newTeam.money,
      wins: team.tournamentWins,
    });

    return newTeam;
  });
};
