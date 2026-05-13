import React from 'react'
import { Team } from '../types'

interface TeamPanelProps {
  team: Team
  isActive: boolean
}

const TeamPanel: React.FC<TeamPanelProps> = ({ team, isActive }) => {
  return (
    <div
      className={`rounded-lg p-4 ${
        isActive ? 'bg-yellow-700 border-2 border-yellow-400' : 'bg-gray-800'
      }`}
    >
      <h3 className="text-lg font-bold mb-2">{team.name}</h3>
      <div className="space-y-1 text-sm">
        <p>資金: {team.money}万ST</p>
        <p>ファン: {team.fans.toLocaleString()}</p>
        <p>選手数: {team.players.length}</p>
        <p>スポンサー: {team.sponsors.length}</p>
      </div>
    </div>
  )
}

export default TeamPanel
