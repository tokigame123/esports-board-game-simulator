import React from 'react'
import { Match } from '../types'

interface MatchModalProps {
  match: Match
  onClose: () => void
}

const MatchModal: React.FC<MatchModalProps> = ({ match, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">試合結果</h2>
        <div className="text-center space-y-4">
          <div className="text-lg font-bold">
            {match.team1Score} - {match.team2Score}
          </div>
          <p className="text-xl">
            {match.winner === match.team1Id ? 'Team 1' : 'Team 2'} が勝利！
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          閉じる
        </button>
      </div>
    </div>
  )
}

export default MatchModal
