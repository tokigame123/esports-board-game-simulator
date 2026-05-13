import React from 'react'
import { Team } from '../types'

interface SeasonEndModalProps {
  teams: Team[]
  onNext: () => void
}

const SeasonEndModal: React.FC<SeasonEndModalProps> = ({ teams, onNext }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-8 max-w-2xl max-h-96 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">シーズン終了</h2>
        <div className="space-y-4 mb-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-gray-800 rounded p-4">
              <h3 className="font-bold">{team.name}</h3>
              <p className="text-sm">ファン: {team.fans.toLocaleString()}</p>
              <p className="text-sm">資金: {team.money}万ST</p>
            </div>
          ))}
        </div>
        <button
          onClick={onNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          次へ
        </button>
      </div>
    </div>
  )
}

export default SeasonEndModal
