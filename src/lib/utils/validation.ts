import { AdventData } from '../types'

export function validateData(data: any): string | null {
  // Check if data exists and has members
  if (!data || typeof data !== 'object') {
    return 'Invalid data format: data must be an object'
  }

  if (!data.members || typeof data.members !== 'object') {
    return 'Invalid data format: missing or invalid members field'
  }

  // Check if there's at least one member with stats
  const hasValidMembers = Object.values(data.members).some(
    (member: any) => 
      member && 
      typeof member === 'object' && 
      member.name && 
      typeof member.stars === 'number' &&
      typeof member.local_score === 'number'
  )

  if (!hasValidMembers) {
    return 'Invalid data format: no valid members found'
  }

  return null
}

export function isAdventData(data: any): data is AdventData {
  return validateData(data) === null
}