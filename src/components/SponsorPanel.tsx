import React from 'react'
import { Sponsor } from '../types'

interface SponsorPanelProps {
  sponsor: Sponsor
}

const SponsorPanel: React.FC<SponsorPanelProps> = ({ sponsor }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-3">
      <h4 className="font-bold">{sponsor.name}</h4>
      <p className="text-sm opacity-90">{sponsor.type}</p>
      <p className="text-sm mt-2">報酬: {sponsor.reward}万ST/ターン</p>
      <p className="text-sm">ファンボーナス: +{sponsor.fanBonus}%</p>
    </div>
  )
}

export default SponsorPanel
