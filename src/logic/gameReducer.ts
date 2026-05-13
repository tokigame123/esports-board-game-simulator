import { GameState, Team, Player, GamePhase, GameLog } from '../types';
import { BOARD_SQUARES } from '../data/board';
import { INITIAL_PLAYERS } from '../data/players';

export type GameAction =
  | { type: 'START_GAME'; teams: Team[] }
  | { type: 'ROLL_DICE'; result: number }
  | { type: 'MOVE_PLAYER'; teamIndex: number; distance: number }
  | { type: 'APPLY_SQUARE_EFFECT'; teamIndex: number }
  | { type: 'NEXT_TURN' }
  | { type: 'END_SEASON' }
  | { type: 'ADD_LOG'; message: string }
  | { type: 'UPDATE_TEAM'; teamIndex: number; team: Team }
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'HIRE_PLAYER'; teamIndex: number; playerId: string; cost: number }
  | { type: 'CONTRACT_SPONSOR'; teamIndex: number; sponsorId: string }
  | { type: 'RESOLVE_MATCHES'; matches: any[] };

const initialGameState: GameState = {
  phase: 'setup',
  teams: [],
  currentTeamIndex: 0,
  currentSeason: 1,
  currentTurn: 0,
  diceResult: 0,
  gameLog: [],
  matches: [],
  boardSquares: BOARD_SQUARES,
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        teams: action.teams,
        phase: 'playing',
        currentTurn: 1,
      };

    case 'ROLL_DICE':
      return {
        ...state,
        diceResult: action.result,
      };

    case 'MOVE_PLAYER':
      const team = state.teams[action.teamIndex];
      const newPosition = (team.position + action.distance) % BOARD_SQUARES.length;
      const updatedTeams = [...state.teams];
      updatedTeams[action.teamIndex] = { ...team, position: newPosition };
      return {
        ...state,
        teams: updatedTeams,
      };

    case 'APPLY_SQUARE_EFFECT':
      // スクエアの効果を適用（別の関数で実装）
      return state;

    case 'NEXT_TURN':
      const nextTeamIndex = (state.currentTeamIndex + 1) % state.teams.length;
      const isNewRound = nextTeamIndex === 0;
      return {
        ...state,
        currentTeamIndex: nextTeamIndex,
        currentTurn: isNewRound ? state.currentTurn + 1 : state.currentTurn,
        diceResult: 0,
      };

    case 'END_SEASON':
      return {
        ...state,
        phase: 'season-end',
      };

    case 'ADD_LOG':
      const newLog: GameLog = {
        turn: state.currentTurn,
        season: state.currentSeason,
        message: action.message,
        timestamp: Date.now(),
      };
      return {
        ...state,
        gameLog: [newLog, ...state.gameLog],
      };

    case 'UPDATE_TEAM':
      const updatedTeams2 = [...state.teams];
      updatedTeams2[action.teamIndex] = action.team;
      return {
        ...state,
        teams: updatedTeams2,
      };

    case 'SET_PHASE':
      return {
        ...state,
        phase: action.phase,
      };

    case 'HIRE_PLAYER':
      const teamToHire = state.teams[action.teamIndex];
      const player = INITIAL_PLAYERS.find((p) => p.id === action.playerId);
      if (player && teamToHire.money >= action.cost) {
        const newTeam = {
          ...teamToHire,
          players: [...teamToHire.players, { ...player }],
          money: teamToHire.money - action.cost,
        };
        const updatedTeams3 = [...state.teams];
        updatedTeams3[action.teamIndex] = newTeam;
        return {
          ...state,
          teams: updatedTeams3,
        };
      }
      return state;

    case 'CONTRACT_SPONSOR':
      // スポンサー契約処理
      return state;

    case 'RESOLVE_MATCHES':
      return {
        ...state,
        matches: action.matches,
      };

    default:
      return state;
  }
};
