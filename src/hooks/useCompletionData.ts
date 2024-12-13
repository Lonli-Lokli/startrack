import { useMemo } from 'react';
import {  Member } from '../lib/types';

export interface RankData {
  rank: number;
  points: number;
  time: number;
  color: { backgroundColor: string };
}

export interface DayRanks {
  '1'?: RankData;
  '2'?: RankData;
}

function getColor(points: number, maxPoints: number): { backgroundColor: string } {
  const ratio = Math.pow(points / maxPoints, 3);
  // Generate a color from green (hue: 142) to red (hue: 0)
  const hue = Math.round(142 * ratio);
  return { backgroundColor: `hsl(${hue}, 90%, 35%)` };
}

export function useCompletionData(processedMembers: Member[]) {
  return useMemo(() => {
    const days = Array.from({ length: 25 }, (_, i) => i + 1);
    const result: Record<string, Record<number, DayRanks>> = {};
    const totalMembers = processedMembers.length;
    
    days.forEach(day => {
      const completions: Record<'1' | '2', Array<{ memberId: string, time: number }>> = {
        '1': [],
        '2': []
      };

      processedMembers.forEach(member => {
        const dayData = member.completion_day_level[day];
        if (!dayData) return;

        ['1', '2'].forEach(part => {
          const completion = dayData[part as '1' | '2'];
          if (completion) {
            completions[part as '1' | '2'].push({
              memberId: member.id,
              time: completion.get_star_ts
            });
          }
        });
      });

      ['1', '2'].forEach(part => {
        completions[part as '1' | '2'].sort((a, b) => a.time - b.time);
      });

      processedMembers.forEach(member => {
        const dayData = member.completion_day_level[day];
        if (!dayData) return;
        
        if (!result[member.id]) result[member.id] = {};
        result[member.id][day] = {};
        
        ['1', '2'].forEach(part => {
          const completion = dayData[part as '1' | '2'];
          if (!completion) return;
          
          const rank = completions[part as '1' | '2']
            .findIndex(c => c.memberId === member.id) + 1;
          
          result[member.id][day][part as '1' | '2'] = {
            rank,
            points: totalMembers - rank + 1,
            time: completion.get_star_ts,
            color: getColor(totalMembers - rank + 1, totalMembers)
          };
        });
      });
    });

    return result;
  }, [processedMembers]);
} 