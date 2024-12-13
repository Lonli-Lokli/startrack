import { useData } from '../../context/DataContext'
import { DataUpload } from '../upload/DataUpload'
import { ProgressTable } from './ProgressTable'
import { ProgressChart } from './ProgressChart'
import { useState } from 'react'

export function DataVisualizer() {
  const { data } = useData()
  const [activeView, setActiveView] = useState<'table' | 'chart'>('table')

  if (!data) {
    return <DataUpload />
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveView('table')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeView === 'table'
              ? 'bg-white/20 text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          Data Table
        </button>
        <button
          onClick={() => setActiveView('chart')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeView === 'chart'
              ? 'bg-white/20 text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          Progress Chart
        </button>
      </div>

      <div className="flex-1 min-h-0">
        {activeView === 'table' ? <ProgressTable /> : <ProgressChart />}
      </div>
    </div>
  )
}