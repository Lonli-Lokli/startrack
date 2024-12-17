import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FileUploadZone } from './FileUploadZone';
import { ClipboardInput } from './ClipboardInput';
import { ManualInput } from './ManualInput';
import { Logo } from '../layout/Logo';

export function DataUpload() {
  const { error } = useData();
  const [showManualInput, setShowManualInput] = useState(false);

  return (
    <div className="w-full py-4 md:py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex justify-center mb-4 md:mb-6">
          <Logo className="w-16 h-16 md:w-24 md:h-24" />
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-xl mb-20">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
              Star Track
            </h1>
            <p className="text-sm md:text-lg font-medium text-blue-100">
              Code Down to Christmas
            </p>
            <p className="text-xs md:text-sm text-blue-200 mt-1 md:mt-2">
              Advent of Code Progress Visualization
            </p>
          </div>

          <div className="mt-3 md:mt-4 mb-4 md:mb-6 text-xs md:text-sm text-blue-200 bg-blue-900/20 p-2 md:p-4 rounded-lg">
            <p className="font-medium mb-2">
              How to get your leaderboard data:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-blue-300">
              <li>
                Go&nbsp;to
                <div className="text-blue-100 hover:text-white underline ml-3 md:ml-5 break-words">
                  <a
                    href="https://adventofcode.com/2024/leaderboard/private"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    adventofcode.com/2024/leaderboard/private
                  </a>
                  <div className="text-xs text-blue-300 mt-0.5">
                    (adjust year as needed)
                  </div>
                </div>
              </li>
              <li>View your private leaderboard</li>
              <li>Find and click [API] button</li>
              <li>
                Copy the JSON content and either:
                <ul className="list-disc list-inside ml-4 mt-1 text-blue-300/80">
                  <li>Save it as a .json file and drag it here</li>
                  <li>Or paste the content directly from clipboard</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="w-full max-w-xl space-y-4 md:space-y-6 mt-6 md:mt-8">
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

          {showManualInput && (
            <ManualInput onClose={() => setShowManualInput(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
