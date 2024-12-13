import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { validateData } from '../../lib/utils/validation'

interface ManualInputProps {
  onClose: () => void
}

export function ManualInput({ onClose }: ManualInputProps) {
  const { setData, setError } = useData()
  const [text, setText] = useState('')

  const handleSubmit = () => {
    try {
      const jsonData = JSON.parse(text)
      
      const validationError = validateData(jsonData)
      if (validationError) {
        throw new Error(validationError)
      }
      
      setData(jsonData)
      setError(null)
      onClose()
      setText('')
    } catch (err) {
      let errorMessage = 'Error processing input: '
      if (err instanceof SyntaxError) {
        errorMessage += 'Invalid JSON format. Please ensure you\'ve entered valid JSON data.'
      } else {
        errorMessage += err.message || 'Unknown error occurred while processing input.'
      }
      setError(errorMessage)
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your JSON data here..."
        className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                   placeholder-blue-200/50 focus:outline-none focus:border-white/20 focus:ring-1 
                   focus:ring-white/20 resize-none"
      />
      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="flex-1 py-2 px-4 rounded-xl bg-white/10 text-white hover:bg-white/20 
                     transition-colors disabled:opacity-50"
          disabled={!text.trim()}
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="py-2 px-4 text-blue-200 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}