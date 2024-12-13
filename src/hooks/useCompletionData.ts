import { useMemo } from 'react';
import { DayCompletion, Member } from '../lib/types';

export interface RankData {
  rank: number;
  points: number;
  time: number;
}

export interface DayRanks {
  '1'?: RankData;
  '2'?: RankData;
}

export function useCompletionData(processedMembers: Member[]) {
  return useMemo(() => {
    const days = Array.from({ length: 25 }, (_, i) => i + 1);
    const result: Record<string, Record<number, DayRanks>> = {};
    
    processedMembers.forEach(member => {
      result[member.id] = {};
      
      days.forEach(day => {
        const dayData = member.completion_day_level[day];
        if (!dayData) return;
        
        result[member.id][day] = {};
        
        ['1', '2'].forEach(part => {
          const completion = dayData[part as '1' | '2'];
          if (!completion) return;
          
          result[member.id][day][part as '1' | '2'] = {
            rank: 0, // We don't use this in table
            points: processedMembers.length,
            time: completion.get_star_ts
          };
        });
      });
    });

    return result;
  }, [processedMembers]);
} 