import { useData } from '../../context/DataContext'
import { Logo } from './Logo'

export function Header() {
  const { data, setData } = useData()

  return (
    <header className="w-full py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold text-white">StarTrack</h1>
            <p className="text-sm text-blue-200">Code Down to Christmas</p>
          </div>
        </div>
        
        {data && (
          <button
            onClick={() => setData(null)}
            className="px-4 py-2 text-sm text-blue-100 hover:text-white transition-colors"
          >
            Upload New Data
          </button>
        )}
      </div>
    </header>
  )
}