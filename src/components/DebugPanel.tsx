import React, { useState } from 'react'
import { GameState } from '../types'

interface DebugPanelProps {
  gameState: GameState
  dispatch: any
}

const DebugPanel: React.FC<DebugPanelProps> = ({ gameState, dispatch }) => {
  const [showState, setShowState] = useState(false)

  const handleAddMoney = () => {
    const team = gameState.teams[gameState.currentTeamIndex]
    dispatch({
      type: 'UPDATE_TEAM',
      teamIndex: gameState.currentTeamIndex,
      team: { ...team, money: team.money + 100 },
    })
  }

  const handleAddFans = () => {
    const team = gameState.teams[gameState.currentTeamIndex]
    dispatch({
      type: 'UPDATE_TEAM',
      teamIndex: gameState.currentTeamIndex,
      team: { ...team, fans: team.fans + 1000 },
    })
  }

  const handleEndSeason = () => {
    dispatch({ type: 'END_SEASON' })
  }

  return (
    <div className="fixed bottom-20 right-4 bg-gray-800 border-2 border-red-500 rounded-lg p-4 max-w-xs">
      <h3 className="font-bold mb-3 text-red-400">🐛 デバッグメニュー</h3>
      <div className="space-y-2">
        <button
          onClick={handleAddMoney}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
        >
          +100万ST
        </button>
        <button
          onClick={handleAddFans}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          +1000ファン
        </button>
        <button
          onClick={handleEndSeason}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          シーズン強制終了
        </button>
        <button
          onClick={() => setShowState(!showState)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
        >
          ゲーム状態表示
        </button>
      </div>
      {showState && (
        <div className="mt-3 bg-gray-900 p-2 rounded text-xs overflow-auto max-h-48">
          <pre className="text-gray-300">{JSON.stringify(gameState, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default DebugPanel
