import React, { useState } from 'react'
import { GameState } from '../types'
import TeamPanel from './TeamPanel'
import SponsorPanel from './SponsorPanel'
import GameLog from './GameLog'
import DebugPanel from './DebugPanel'

interface GameBoardProps {
  gameState: GameState
  dispatch: any
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, dispatch }) => {
  const [showDebug, setShowDebug] = useState(false)

  const handleRollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1
    dispatch({ type: 'ROLL_DICE', result })

    // プレイヤーを移動
    dispatch({
      type: 'MOVE_PLAYER',
      teamIndex: gameState.currentTeamIndex,
      distance: result,
    })
  }

  const handleNextTurn = () => {
    dispatch({ type: 'NEXT_TURN' })
  }

  const handleEndSeason = () => {
    dispatch({ type: 'END_SEASON' })
  }

  const currentTeam = gameState.teams[gameState.currentTeamIndex]

  return (
    <div className="max-w-7xl mx-auto mt-4 pb-8">
      {/* ヘッダー */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-left">
          <p className="text-sm text-gray-400">シーズン {gameState.currentSeason}</p>
          <p className="text-xl font-bold">ターン {gameState.currentTurn}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-yellow-400">{currentTeam.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">位置: {currentTeam.position}</p>
        </div>
      </div>

      {/* メインレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* ゲームボード */}
        <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">ボード</h2>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {gameState.boardSquares.map((square, index) => (
              <div
                key={index}
                className={`p-3 rounded text-center text-xs font-bold ${
                  currentTeam.position === index
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-700'
                }`}
              >
                {square.name}
              </div>
            ))}
          </div>

          {/* サイコロと操作 */}
          <div className="space-y-3">
            <button
              onClick={handleRollDice}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
            >
              サイコロを振る {gameState.diceResult > 0 ? `(${gameState.diceResult})` : ''}
            </button>
            <button
              onClick={handleNextTurn}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded"
            >
              次のチームへ
            </button>
            <button
              onClick={handleEndSeason}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded"
            >
              シーズン終了
            </button>
          </div>
        </div>

        {/* チーム情報パネル */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">チーム</h3>
            <div className="grid grid-cols-2 gap-2">
              {gameState.teams.map((team, index) => (
                <TeamPanel
                  key={team.id}
                  team={team}
                  isActive={index === gameState.currentTeamIndex}
                />
              ))}
            </div>
          </div>

          {/* スポンサー情報 */}
          {currentTeam.sponsors.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">契約中のスポンサー</h3>
              <div className="grid grid-cols-1 gap-2">
                {currentTeam.sponsors.map((sponsor) => (
                  <SponsorPanel key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ゲームログ */}
      <GameLog logs={gameState.gameLog} />

      {/* デバッグパネル */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        🐛 デバッグ
      </button>
      {showDebug && <DebugPanel gameState={gameState} dispatch={dispatch} />}
    </div>
  )
}

export default GameBoard
