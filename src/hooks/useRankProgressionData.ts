import { useMemo } from 'react';
import { Member } from '../lib/types';

export function useRankProgressionData(processedMembers: Member[]) {
  return useMemo(() => {
    const days = Array.from({ length: 25 }, (_, i) => i + 1);
    const result: Record<string, Record<number, { '1'?: number; '2'?: number }>> = {};
    const totalMembers = processedMembers.length;
    
    days.forEach(day => {
      const dayCompletions = processedMembers
        .map(member => ({
          memberId: member.id,
          completions: member.completion_day_level[day]
        }))
        .filter(x => x.completions);

      ['1', '2'].forEach(part => {
        const sortedCompletions = dayCompletions
          .filter(x => x.completions[part as '1' | '2'])
          .sort((a, b) => 
            a.completions[part as '1' | '2']!.get_star_ts -
            b.completions[part as '1' | '2']!.get_star_ts
          );

        sortedCompletions.forEach((completion, index) => {
          if (!result[completion.memberId]) {
            result[completion.memberId] = {};
          }
          if (!result[completion.memberId][day]) {
            result[completion.memberId][day] = {};
          }
          
          result[completion.memberId][day][part as '1' | '2'] = index + 1;
        });
      });
    });

    return result;
  }, [processedMembers]);
} 