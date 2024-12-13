export function formatTime(timestamp: number | undefined, partNumber: '1' | '2' = '1', part1Time?: number): string {
    if (!timestamp) return '-'
    
    // Puzzle unlocks at 5:00 UTC (midnight EST)
    const getUnlockTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        const unlockDate = new Date(date)
        unlockDate.setUTCHours(5, 0, 0, 0)
        // If the completion was before 5:00 UTC, use previous day's unlock time
        if (date < unlockDate) {
            unlockDate.setDate(unlockDate.getDate() - 1)
        }
        return unlockDate.getTime() / 1000
    }

    const startTime = partNumber === '1' 
        ? getUnlockTime(timestamp)
        : part1Time

    if (!startTime) return '-'
    
    const durationSeconds = timestamp - startTime
    const hours = Math.floor(durationSeconds / 3600)
    const minutes = Math.floor((durationSeconds % 3600) / 60)
    const seconds = Math.floor(durationSeconds % 60)
    
    if (hours > 0) {
        return `${hours}h${minutes.toString().padStart(2, '0')}m`
    } else if (minutes > 0) {
        return `${minutes}m${seconds.toString().padStart(2, '0')}s`
    } else {
        return `${seconds}s`
    }
}
  
  interface DayCompletion {
    '1'?: { get_star_ts: number };
    '2'?: { get_star_ts: number };
  }
  
  export function getCompletionColor(
    timestamp: number | undefined, 
    partNumber: '1' | '2',
    allCompletions: Record<string, DayCompletion | undefined>
  ): React.CSSProperties {
    if (!timestamp) return {};
    
    const totalMembers = Object.keys(allCompletions).length;
    
    // Get all valid timestamps and sort them
    const timestamps = Object.values(allCompletions)
        .filter(completion => completion?.[partNumber]?.get_star_ts !== undefined)
        .map(completion => completion![partNumber]!.get_star_ts)
        .sort((a, b) => a - b);
    
    if (timestamps.length === 0) return {};
    
    // Find position and calculate points
    const position = timestamps.indexOf(timestamp);
    const points = totalMembers - position;
    
    // Use points directly for color calculation
    // Normalize points to 0-1 range and use power function
    const normalizedValue = Math.pow(points / totalMembers, 5);
    const hue = 120 * normalizedValue;
    
    return {
        backgroundColor: `hsl(${hue}, 100%, 35%)`,
        color: 'white'
    };
  }