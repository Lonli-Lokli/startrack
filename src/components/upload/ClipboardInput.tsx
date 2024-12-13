import { useData } from '../../context/DataContext'
import { validateData } from '../../lib/utils/validation'

export function ClipboardInput() {
  const { setData, setError } = useData()

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      const jsonData = JSON.parse(text)
      
      const validationError = validateData(jsonData)
      if (validationError) {
        throw new Error(validationError)
      }
      
      setData(jsonData)
      setError(null)
    } catch (err) {
      let errorMessage = 'Error reading clipboard: '
      
      if (err instanceof SyntaxError) {
        errorMessage += 'Invalid JSON format. Please ensure you\'ve copied valid JSON data.'
      } else if (err.name === 'NotAllowedError') {
        errorMessage += 'Clipboard access denied. Please allow clipboard access and try again.'
      } else if (err.name === 'ClipboardAPINotAvailable') {
        errorMessage += 'Clipboard functionality is not available in your browser.'
      } else {
        errorMessage += err.message || 'Unknown error occurred while reading clipboard.'
      }
      
      setError(errorMessage)
      console.error('Paste error:', err)
    }
  }

  return (
    <button
      onClick={handlePaste}
      className="w-full py-3 px-4 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
    >
      Paste from Clipboard
    </button>
  )
}