import { useData } from '../../context/DataContext';
import React from 'react';
import { formatTime } from '../../lib/utils/formatting';
import { useCompletionData } from '../../hooks/useCompletionData';

export function ProgressTable() {
  const { processedMembers } = useData();
  const completionData = useCompletionData(processedMembers);
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  // Sync scroll handlers
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const containers = document.querySelectorAll('.sync-scroll');
    containers.forEach((container) => {
      if (container instanceof HTMLElement && container !== e.currentTarget) {
        container.scrollLeft = scrollLeft;
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top scrollbar */}
      <div 
        className="sync-scroll overflow-x-auto overflow-y-hidden h-4 bg-white/5 rounded-t-lg"
        onScroll={handleScroll}
      >
        <div className="min-w-[1800px] md:min-w-[2400px] h-full" />
      </div>

      {/* Table container */}
      <div className="flex-1 min-h-0 sync-scroll scrollbar-style overflow-auto">
        <div className="relative bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
          {/* Sticky Header Wrapper */}
          <div className="sticky top-0 z-30 bg-gray-900">
            <table className="w-[1800px] md:w-[2400px] table-fixed">
              <colgroup>
                <col className="w-48" /> {/* Name */}
                <col className="w-20" /> {/* Stars */}
                <col className="w-20" /> {/* Score */}
                {days.map((day) => (
                  <React.Fragment key={day}>
                    <col className="w-16" /> {/* Part 1 */}
                    <col className="w-16" /> {/* Part 2 */}
                  </React.Fragment>
                ))}
              </colgroup>
              <thead>
                <tr className="border-b border-white/10">
                  <th className="sticky left-0 p-2 text-left text-sm font-semibold text-white bg-gray-900">Name</th>
                  <th className="p-2 text-right text-sm font-semibold text-white">Stars</th>
                  <th className="p-2 text-right text-sm font-semibold text-white">Score</th>
                  {days.map((day) => (
                    <th
                      key={day}
                      colSpan={2}
                      className="p-1 text-center text-xs font-semibold text-white"
                    >
                      Day {day}
                    </th>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <th className="sticky left-0 p-2 bg-gray-900"></th>
                  <th className="p-2"></th>
                  <th className="p-2"></th>
                  {days.map((day) => (
                    <React.Fragment key={day}>
                      <th className="p-1 text-center text-xs font-semibold text-white">*</th>
                      <th className="p-1 text-center text-xs font-semibold text-white">**</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          {/* Main Table */}
          <table className="w-[1800px] md:w-[2400px] table-fixed">
            <colgroup>
              <col className="w-48" /> {/* Name */}
              <col className="w-20" /> {/* Stars */}
              <col className="w-20" /> {/* Score */}
              {days.map((day) => (
                <React.Fragment key={day}>
                  <col className="w-16" /> {/* Part 1 */}
                  <col className="w-16" /> {/* Part 2 */}
                </React.Fragment>
              ))}
            </colgroup>
            <tbody>
              {processedMembers.map((member) => (
                <tr key={member.id}>
                  <td className="sticky left-0 z-20 p-2 text-sm font-medium text-white bg-gray-900">{member.name}</td>
                  <td className="p-2 text-sm text-right text-white">{member.stars}</td>
                  <td className="p-2 text-sm text-right text-white">{member.local_score}</td>
                  {days.map((day) => {
                    const dayData = completionData[member.id]?.[day];
                    return (
                      <React.Fragment key={day}>
                        <td className="p-1 text-xs text-center" style={dayData?.['1']?.color} title={`Time: ${formatTime(dayData?.['1']?.time, '1')} Points: ${dayData?.['1']?.points || 0}`}>
                          {dayData?.['1']?.points || ''}
                        </td>
                        <td className="p-1 text-xs text-center" style={dayData?.['2']?.color} title={`Time: ${formatTime(dayData?.['2']?.time, '2', dayData?.['1']?.time)} Points: ${dayData?.['2']?.points || 0}`}>
                          {dayData?.['2']?.points || ''}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
