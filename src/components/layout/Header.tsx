import { useData } from '../../context/DataContext'
import { Logo } from './Logo'

export function Header() {
  const { data, setData } = useData()

  return (
    <header className="w-full py-2 sm:py-4 bg-blue-900">
      <div className="max-w-7xl mx-auto flex justify-between items-start px-4">
        {/* Left side */}
        <div className="flex items-center">
          {data && <Logo className="w-8 h-8 sm:w-12 sm:h-12" />}
          <div className="hidden sm:block ml-2 sm:ml-4">
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-bold text-white leading-none">Star Track</h1>
              <span className="text-xs text-blue-300">Advent of Code Progress Visualization</span>
            </div>
            <p className="text-sm text-blue-200">Code Down to Christmas</p>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center">
          <a
            href="https://www.buymeacoffee.com/LonliLokliV"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 px-2 sm:px-4 bg-blue-500 text-white text-sm sm:text-base font-medium rounded hover:bg-blue-600 transition-colors flex items-center gap-1 sm:gap-2 mr-2 sm:mr-4"
          >
            <span role="img" aria-label="coffee">☕️</span>
            <span>Buy me a coffee</span>
          </a>
          
          {data && (
            <button
              onClick={() => setData(null)}
              className="h-8 px-2 sm:px-4 bg-gray-700 text-white text-sm sm:text-base font-medium rounded hover:bg-gray-600 transition-colors flex items-center"
            >
              Upload New Data
            </button>
          )}
        </div>
      </div>
    </header>
  )
}