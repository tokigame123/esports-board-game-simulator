import React, { useReducer, useState, useEffect } from 'react'
import { GameState, Team } from './types'
import { gameReducer } from './logic/gameReducer'
import SetupScreen from './components/SetupScreen'
import DraftScreen from './components/DraftScreen'
import GameBoard from './components/GameBoard'
import ScoreResult from './components/ScoreResult'

const initialGameState: GameState = {
  phase: 'setup',
  teams: [],
  currentTeamIndex: 0,
  currentSeason: 1,
  currentTurn: 0,
  diceResult: 0,
  gameLog: [],
  matches: [],
  boardSquares: [],
}

const App: React.FC = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState)
  const [savedGames, setSavedGames] = useState<GameState[]>([])

  // ローカルストレージからゲーム状態を読み込む
  useEffect(() => {
    const saved = localStorage.getItem('gameState')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // ここでゲーム状態を復元できる
      } catch (e) {
        console.error('Failed to load game state', e)
      }
    }
  }, [])

  // ゲーム状態をローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState))
  }, [gameState])

  const handleStartGame = (teams: Team[], seasons: number, rounds: number) => {
    dispatch({ type: 'START_GAME', teams })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-esports-dark to-esports-darker text-white p-4">
      {gameState.phase === 'setup' && (
        <SetupScreen onStartGame={handleStartGame} />
      )}
      {gameState.phase === 'draft' && (
        <DraftScreen gameState={gameState} dispatch={dispatch} />
      )}
      {gameState.phase === 'playing' && (
        <GameBoard gameState={gameState} dispatch={dispatch} />
      )}
      {gameState.phase === 'final-result' && (
        <ScoreResult gameState={gameState} dispatch={dispatch} />
      )}
    </div>
  )
}

export default App
