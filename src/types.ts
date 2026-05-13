// ゲーム全体の型定義

export type PlayerType = 'Attacker' | 'Defender' | 'Supporter' | 'Floater';
export type SponsorType = 'Hardware' | 'Energy' | 'Apparel' | 'Media';
export type GamePhase = 'setup' | 'draft' | 'playing' | 'match' | 'season-end' | 'final-result';

export interface Player {
  id: string;
  name: string;
  type: PlayerType;
  level: number; // 1-5
  fans: number;
  experience: number;
  retired: boolean;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  position: number; // ボード上の位置
  money: number; // 資金（万ST）
  fans: number;
  sponsors: Sponsor[];
  tournamentWins: number;
  seasonHistory: SeasonRecord[];
}

export interface Sponsor {
  id: string;
  name: string;
  type: SponsorType;
  contractTurns: number; // 残り契約ターン数
  reward: number; // 毎ターンの報酬（万ST）
  fanBonus: number; // ファンボーナス（%）
}

export interface Match {
  team1Id: string;
  team2Id: string;
  team1Score: number;
  team2Score: number;
  winner: string | null;
}

export interface BoardSquare {
  position: number;
  name: string;
  effect: 'train' | 'fans' | 'sponsor' | 'event' | 'rest';
  description: string;
}

export interface GameLog {
  turn: number;
  season: number;
  message: string;
  timestamp: number;
}

export interface SeasonRecord {
  season: number;
  finalRank: number;
  totalFans: number;
  totalMoney: number;
  wins: number;
}

export interface GameState {
  phase: GamePhase;
  teams: Team[];
  currentTeamIndex: number;
  currentSeason: number;
  currentTurn: number;
  diceResult: number;
  gameLog: GameLog[];
  matches: Match[];
  boardSquares: BoardSquare[];
}
