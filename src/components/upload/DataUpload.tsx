import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { FileUploadZone } from './FileUploadZone'
import { ClipboardInput } from './ClipboardInput'
import { ManualInput } from './ManualInput'

export function DataUpload() {
  const { error } = useData()
  const [showManualInput, setShowManualInput] = useState(false)

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            {/* ... Logo SVG content ... */}
          </svg>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">StarTrack</h1>
            <p className="text-lg font-medium text-blue-100">Code Down to Christmas</p>
            <p className="text-sm text-blue-200 mt-2">Advent of Code Progress Visualization</p>
          </div>

          <div className="space-y-6 mt-8">
            <FileUploadZone />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-blue-600 to-blue-700 text-blue-200">
                  OR
                </span>
              </div>
            </div>

            <ClipboardInput />
          </div>

          {error && (
            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex flex-col gap-4">
                <div>{error}</div>
                <button
                  onClick={() => setShowManualInput(true)}
                  className="text-sm text-blue-200 hover:text-white transition-colors text-left"
                >
                  → Open manual input
                </button>
              </div>
            </div>
          )}

          {showManualInput && <ManualInput onClose={() => setShowManualInput(false)} />}
        </div>
      </div>
    </div>
  )
}