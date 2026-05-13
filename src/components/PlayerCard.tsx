import React from 'react'
import { Player } from '../types'

interface PlayerCardProps {
  player: Player
  onSelect?: () => void
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onSelect }) => {
  const typeColors = {
    Attacker: 'bg-red-600',
    Defender: 'bg-blue-600',
    Supporter: 'bg-green-600',
    Floater: 'bg-purple-600',
  }

  return (
    <div
      className={`${typeColors[player.type]} rounded-lg p-4 cursor-pointer hover:opacity-80 transition`}
      onClick={onSelect}
    >
      <h3 className="font-bold text-lg">{player.name}</h3>
      <p className="text-sm opacity-80">{player.type}</p>
      <p className="text-lg font-bold mt-2">Lv.{player.level}</p>
    </div>
  )
}

export default PlayerCard
