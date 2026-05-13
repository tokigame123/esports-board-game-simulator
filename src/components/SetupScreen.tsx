import React, { useState } from 'react'
import { Team, Player } from '../types'
import { INITIAL_PLAYERS } from '../data/players'

interface SetupScreenProps {
  onStartGame: (teams: Team[], seasons: number, rounds: number) => void
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const [playerCount, setPlayerCount] = useState(2)
  const [teamNames, setTeamNames] = useState(['Team A', 'Team B'])
  const [seasons, setSeasons] = useState(3)
  const [rounds, setRounds] = useState(2)

  const handleTeamNameChange = (index: number, name: string) => {
    const newNames = [...teamNames]
    newNames[index] = name
    setTeamNames(newNames)
  }

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count)
    setTeamNames(Array(count).fill('').map((_, i) => `Team ${String.fromCharCode(65 + i)}`))
  }

  const handleStartGame = () => {
    const teams: Team[] = teamNames.map((name, index) => ({
      id: `team-${index}`,
      name,
      players: [],
      position: 0,
      money: 100, // 初期資金100万ST
      fans: 0,
      sponsors: [],
      tournamentWins: 0,
      seasonHistory: [],
    }))

    onStartGame(teams, seasons, rounds)
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
        最強のeスポーツチームを作ろう！
      </h1>

      <div className="bg-gray-900 rounded-lg p-8 space-y-6">
        {/* プレイヤー数選択 */}
        <div>
          <label className="block text-xl font-semibold mb-4">プレイヤー数</label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => handlePlayerCountChange(count)}
                className={`py-2 px-4 rounded ${
                  playerCount === count
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {count}人
              </button>
            ))}
          </div>
        </div>

        {/* チーム名入力 */}
        <div>
          <label className="block text-xl font-semibold mb-4">チーム名</label>
          <div className="space-y-3">
            {teamNames.map((name, index) => (
              <input
                key={index}
                type="text"
                value={name}
                onChange={(e) => handleTeamNameChange(index, e.target.value)}
                placeholder={`Team ${String.fromCharCode(65 + index)}`}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white"
              />
            ))}
          </div>
        </div>

        {/* シーズン数・周回数 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">シーズン数</label>
            <input
              type="number"
              value={seasons}
              onChange={(e) => setSeasons(parseInt(e.target.value) || 1)}
              min="1"
              max="10"
              className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">周回数</label>
            <input
              type="number"
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value) || 1)}
              min="1"
              max="10"
              className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white"
            />
          </div>
        </div>

        {/* ゲーム開始ボタン */}
        <button
          onClick={handleStartGame}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded text-lg"
        >
          ゲーム開始
        </button>
      </div>
    </div>
  )
}

export default SetupScreen
