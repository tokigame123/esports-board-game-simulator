import React, { useState } from 'react'
import { GameState, Team } from '../types'
import { calculateFinalScore } from '../logic/scoring'

interface ScoreResultProps {
  gameState: GameState
  dispatch: any
}

const ScoreResult: React.FC<ScoreResultProps> = ({ gameState, dispatch }) => {
  const [blueOceanPoints, setBlueOceanPoints] = useState<{ [teamId: string]: number }>(
    gameState.teams.reduce(
      (acc, team) => {
        acc[team.id] = 0
        return acc
      },
      {} as { [key: string]: number }
    )
  )

  const scores = gameState.teams.map((team) => {
    const matchWins = gameState.matches.filter((m) => m.winner === team.id).length
    return calculateFinalScore(team, matchWins, blueOceanPoints[team.id] || 0)
  })

  const sortedScores = [...scores].sort((a, b) => b.score - a.score)

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">最終スコア</h1>

      <div className="bg-gray-900 rounded-lg p-8 space-y-6">
        {/* ランキング */}
        <div>
          <h2 className="text-2xl font-bold mb-4">順位</h2>
          <div className="space-y-4">
            {sortedScores.map((score, index) => (
              <div key={score.teamId} className="bg-gray-800 rounded p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">
                      {index + 1}位: {score.teamName}
                    </p>
                    <div className="text-sm space-y-1 mt-2">
                      <p>選手育成: {score.breakdown.playerDevelopment}</p>
                      <p>ファン成長: {score.breakdown.fanGrowth}</p>
                      <p>スポンサー: {score.breakdown.sponsorValue}</p>
                      <p>大会成績: {score.breakdown.tournamentWins}</p>
                      <p>ブルーオーシャン: {score.breakdown.blueOcean}</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">{score.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ブルーオーシャン調整 */}
        <div>
          <h3 className="text-xl font-bold mb-4">ブルーオーシャン点（手動設定）</h3>
          <div className="space-y-3">
            {gameState.teams.map((team) => (
              <div key={team.id}>
                <label className="block text-sm mb-1">{team.name}</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={blueOceanPoints[team.id] || 0}
                  onChange={(e) =>
                    setBlueOceanPoints({
                      ...blueOceanPoints,
                      [team.id]: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ゲーム終了 */}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
        >
          ゲーム終了
        </button>
      </div>
    </div>
  )
}

export default ScoreResult
