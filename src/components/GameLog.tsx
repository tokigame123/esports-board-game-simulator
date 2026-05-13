import React from 'react'
import { GameLog } from '../types'

interface GameLogProps {
  logs: GameLog[]
}

const GameLogComponent: React.FC<GameLogProps> = ({ logs }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">ゲームログ</h3>
      <div className="bg-gray-800 rounded p-4 max-h-48 overflow-y-auto space-y-2">
        {logs.slice(0, 20).map((log, index) => (
          <p key={index} className="text-sm text-gray-300">
            <span className="text-gray-500">
              S{log.season}T{log.turn}
            </span>: {log.message}
          </p>
        ))}
      </div>
    </div>
  )
}

export default GameLogComponent
