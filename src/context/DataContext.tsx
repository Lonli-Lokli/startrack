import React, { createContext, useContext, useState } from 'react'
import { AdventData, Member } from '../lib/types'

interface DataContextType {
  data: AdventData | null
  setData: (data: AdventData | null) => void
  processedMembers: Member[]
  error: string | null
  setError: (error: string | null) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AdventData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const processedMembers = React.useMemo(() => {
    if (!data?.members) return []
    
    return Object.values(data.members)
      .filter(member => member.name && member.stars > 0)
      .sort((a, b) => b.local_score - a.local_score)
  }, [data])

  const value = {
    data,
    setData,
    processedMembers,
    error,
    setError,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}