import { BoardSquare } from '../types';

export const BOARD_SQUARES: BoardSquare[] = [
  { position: 0, name: 'スタート', effect: 'rest', description: 'ゲーム開始地点' },
  { position: 1, name: '訓練所', effect: 'train', description: '選手を1レベル強化' },
  { position: 2, name: 'ファン広場', effect: 'fans', description: 'ファン +500' },
  { position: 3, name: 'スポンサー接触', effect: 'sponsor', description: 'スポンサー契約チャンス' },
  { position: 4, name: 'イベント会場', effect: 'event', description: 'ランダムイベント' },
  { position: 5, name: '訓練所', effect: 'train', description: '選手を1レベル強化' },
  { position: 6, name: 'ファン広場', effect: 'fans', description: 'ファン +500' },
  { position: 7, name: 'スポンサー接触', effect: 'sponsor', description: 'スポンサー契約チャンス' },
  { position: 8, name: '休憩地点', effect: 'rest', description: 'ターン終了' },
  { position: 9, name: '訓練所', effect: 'train', description: '選手を1レベル強化' },
  { position: 10, name: 'ファン広場', effect: 'fans', description: 'ファン +800' },
  { position: 11, name: 'スポンサー接触', effect: 'sponsor', description: 'スポンサー契約チャンス' },
  { position: 12, name: 'ゴール', effect: 'rest', description: '1周完了' },
];

export const BOARD_SIZE = BOARD_SQUARES.length;
