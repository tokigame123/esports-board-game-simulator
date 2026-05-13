import React, { useState } from 'react'
import { GameState, Team } from '../types'
import { INITIAL_PLAYERS } from '../data/players'
import PlayerCard from './PlayerCard'

interface DraftScreenProps {
  gameState: GameState
  dispatch: any
}

const DraftScreen: React.FC<DraftScreenProps> = ({ gameState, dispatch }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [draftedPlayers, setDraftedPlayers] = useState<{ [teamId: string]: string[] }>({})
  const [message, setMessage] = useState('ドラフトを開始してください')

  const currentTeam = gameState.teams[currentPlayerIndex]
  const availablePlayers = INITIAL_PLAYERS.filter(
    (p) => !Object.values(draftedPlayers).flat().includes(p.id)
  )

  const handleDraftPlayer = (playerId: string) => {
    const player = INITIAL_PLAYERS.find((p) => p.id === playerId)
    const cost = player?.level === 1 ? 30 : 50

    if (currentTeam.money < cost) {
      setMessage('資金が不足しています')
      return
    }

    const currentDrafted = draftedPlayers[currentTeam.id] || []
    if (currentDrafted.length >= 3) {
      setMessage('選手は最大3人です')
      return
    }

    setDraftedPlayers({
      ...draftedPlayers,
      [currentTeam.id]: [...currentDrafted, playerId],
    })

    if (currentDrafted.length === 2) {
      // ドラフト完了
      if (currentPlayerIndex === gameState.teams.length - 1) {
        // 全チーム完了
        dispatch({ type: 'SET_PHASE', phase: 'playing' })
      } else {
        setCurrentPlayerIndex(currentPlayerIndex + 1)
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">{currentTeam.name} - ドラフト</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 利用可能な選手 */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">利用可能な選手</h2>
          <div className="grid grid-cols-2 gap-4">
            {availablePlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onSelect={() => handleDraftPlayer(player.id)}
              />
            ))}
          </div>
        </div>

        {/* チーム情報 */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">チーム情報</h3>
          <div className="space-y-3">
            <div>資金: {currentTeam.money}万ST</div>
            <div>ドラフト済み: {(draftedPlayers[currentTeam.id] || []).length}/3</div>
          </div>
          <div className="mt-6 p-4 bg-blue-900 rounded">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraftScreen
