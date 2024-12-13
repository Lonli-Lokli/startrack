import { useData } from '../../context/DataContext'
import { validateData } from '../../lib/utils/validation'

export function FileUploadZone() {
  const { setData, setError } = useData()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const jsonData = JSON.parse(text)
      
      const validationError = validateData(jsonData)
      if (validationError) {
        throw new Error(validationError)
      }
      
      setData(jsonData)
      setError(null)
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format. Please ensure it\'s a valid JSON file.')
      } else {
        setError((err as Error).message || 'Error reading file.')
      }
      console.error('File upload error:', err)
    }
  }

  return (
    <div className="relative border-2 border-dashed border-white/30 rounded-xl p-6 text-center cursor-pointer hover:border-white/50 transition-colors">
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="text-white mb-4">
          <svg 
            className="w-12 h-12 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          <p className="text-sm text-blue-100">
            Drop your JSON file here or click to browse
          </p>
        </div>
      </label>
    </div>
  )
}