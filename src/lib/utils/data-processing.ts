import { Member } from '../types'
import { formatTime } from './formatting'

export interface ChartDataPoint {
  timestamp: number
  formattedTime: string
  [key: string]: number | string // For member star counts
}

export function processChartData(members: Member[]): ChartDataPoint[] {
  if (!members?.length) return []
  const timePoints = new Set<number>()
  
  members.forEach(member => {
    Object.values(member.completion_day_level || {}).forEach(day => {
      if (day['1']?.get_star_ts) timePoints.add(day['1'].get_star_ts)
      if (day['2']?.get_star_ts) timePoints.add(day['2'].get_star_ts)
    })
  })

  const sortedTimes = Array.from(timePoints).sort((a, b) => a - b)
  
  return sortedTimes.map(time => {
    const point: ChartDataPoint = {
      timestamp: time,
      formattedTime: formatTime(time),
    }
    
    // Calculate points for each member at this timestamp
    const memberPoints = members.map(member => {
      let points = 0
      Object.entries(member.completion_day_level || {}).forEach(([day, parts]) => {
        // For each day, calculate points based on completion order
        const part1Completions = members
          .map(m => m.completion_day_level?.[day]?.['1']?.get_star_ts || Infinity)
          .sort((a, b) => a - b)
        const part2Completions = members
          .map(m => m.completion_day_level?.[day]?.['2']?.get_star_ts || Infinity)
          .sort((a, b) => a - b)

        // Points for part 1
        const memberPart1Time = parts?.['1']?.get_star_ts
        if (memberPart1Time && memberPart1Time <= time) {
          const rank = part1Completions.indexOf(memberPart1Time)
          points += members.length - rank
        }

        // Points for part 2
        const memberPart2Time = parts?.['2']?.get_star_ts
        if (memberPart2Time && memberPart2Time <= time) {
          const rank = part2Completions.indexOf(memberPart2Time)
          points += members.length - rank
        }
      })
      return { member, points }
    })

    // Sort by points (descending) to determine ranks
    memberPoints.sort((a, b) => b.points - a.points)

    // Assign ranks
    memberPoints.forEach((memberData, index) => {
      if (memberData.member.name) {
        point[memberData.member.name] = index + 1
      }
    })
    
    return point
  })
}

export function getDayTimestamps(member: Member): number[] {
  return Object.values(member.completion_day_level).reduce((acc: number[], parts) => {
    if (parts['1']?.get_star_ts) acc.push(parts['1'].get_star_ts)
    if (parts['2']?.get_star_ts) acc.push(parts['2'].get_star_ts)
    return acc
  }, [])
}