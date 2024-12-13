import { useData } from '../../context/DataContext'
import { validateData } from '../../lib/utils/validation'
import { DragEvent, useState } from 'react'

export function FileUploadZone() {
  const { setData, setError } = useData()
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = async (file: File) => {
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    await handleFile(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return
    
    if (!file.name.endsWith('.json')) {
      setError('Please upload a JSON file')
      return
    }

    await handleFile(file)
  }

  return (
    <div 
      className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
        ${isDragging 
          ? 'border-blue-400 bg-blue-500/10' 
          : 'border-white/30 hover:border-white/50'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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