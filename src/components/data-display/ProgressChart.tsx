import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import { useData } from '../../context/DataContext';
import { useRankProgressionData } from '../../hooks/useRankProgressionData';
import { useMemo, useState } from 'react';
import { Member } from 'src/lib/types';

const useMemberColors = (members: Member[]) => {
  return useMemo(() => {
    return Object.fromEntries(
      members.map(member => [
        member.id,
        `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
      ])
    );
  }, [members]);
};

export function ProgressChart() {
  const { processedMembers } = useData();
  const rankData = useRankProgressionData(processedMembers);
  const [showTop20, setShowTop20] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const memberColors = useMemberColors(processedMembers);
  
  const chartData = useMemo(() => {
    const daysWithData = new Set<number>();
    Object.values(rankData).forEach(memberData => {
      Object.keys(memberData).forEach(day => {
        daysWithData.add(Number(day));
      });
    });
    
    const sortedDays = Array.from(daysWithData).sort((a, b) => a - b);
    const dataPoints: Array<{ name: string } & Record<string, number>> = [];

    sortedDays.forEach(day => {
      ['1', '2'].forEach(part => {
        const pointName = `${day}-${part}`;
        const point = { name: pointName } as { name: string } & Record<string, number>;

        // Get all completions for this day-part
        const completions = Object.entries(rankData)
          .map(([memberId, memberData]) => ({
            memberId,
            rank: memberData[day]?.[part as '1' | '2']
          }))
          .filter(x => x.rank !== undefined)
          .sort((a, b) => (a.rank || 0) - (b.rank || 0));

        // Get top 3 for this day-part
        const topThree = completions.slice(0, 3).map(x => x.memberId);

        // Add ranks and medals to the point data
        completions.forEach(({ memberId, rank }) => {
          point[memberId] = rank!;
          const medalPosition = topThree.indexOf(memberId);
          if (medalPosition !== -1) {
            point[`${memberId}_medal`] = medalPosition + 1;
          }
        });

        dataPoints.push(point);
      });
    });

    return dataPoints;
  }, [rankData]);

  const filteredMembers = useMemo(() => {
    const sortedMembers = [...processedMembers]
      .sort((a, b) => (b.local_score || 0) - (a.local_score || 0));
    
    return showTop20 ? sortedMembers.slice(0, 20) : sortedMembers;
  }, [processedMembers, showTop20]);

  const formatXAxisTick = (value: string) => {
    return value.split('-')[0]; // Just show the day number
  };

  if (processedMembers.length === 0) return null;

  return (
    <div className="h-full w-full p-4 flex flex-col">
      {/* Controls */}
      <div className="mb-4 flex items-center">
        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={showTop20}
            onChange={(e) => setShowTop20(e.target.checked)}
            className="form-checkbox"
          />
          <span>Show Top 20 Only</span>
        </label>
      </div>

      {/* Chart container with vertical scroll */}
      <div className="flex flex-col sm:flex-row flex-1 overflow-y-auto">
        {/* Names list */}
        <div className="w-full sm:w-48 sm:pr-4 flex-shrink-0 mb-4 sm:mb-0">
          <div className="sm:pt-[45px]">
            {filteredMembers.map((member) => (
              <div 
                key={member.id}
                className={`text-sm py-1 truncate cursor-pointer 
                  hover:bg-gray-700 rounded px-2 transition-colors flex items-center
                  ${selectedMember === member.id ? 'bg-gray-600 font-bold' : ''}`}
                style={{ 
                  height: '24px',
                  color: memberColors[member.id],
                }}
                onClick={() => setSelectedMember(
                  selectedMember === member.id ? null : member.id
                )}
              >
                {member.name}
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1" style={{ minHeight: `${filteredMembers.length * 24}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{ top: 25, right: 10, left: 10, bottom: 0 }}
              onClick={(data) => {
                if (data && data.activePayload && data.activePayload.length > 0) {
                  // Find the most prominent line at the click point
                  const clickedPoint = data.activePayload[0];
                  const memberId = clickedPoint.dataKey as string;
                  setSelectedMember(selectedMember === memberId ? null : memberId);
                } else {
                  setSelectedMember(null);
                }
              }}
            >
              <XAxis 
                dataKey="name" 
                interval={1}
                tick={{ fontSize: 12, fill: '#fff' }}
                tickFormatter={formatXAxisTick}
                orientation="top"
                height={20}
                dy={-10}
              />
              <YAxis 
                reversed={true}
                domain={[1, filteredMembers.length]}
                hide
              />
              <Tooltip 
                formatter={(value: number, name: string, props: any) => {
                  return [value, props.payload.name];
                }}
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  
                  // Sort payload items by value (rank)
                  const sortedPayload = [...payload]
                    .filter(item => item.value !== undefined)
                    .sort((a, b) => (a.value as number) - (b.value as number));

                  return (
                    <div className="bg-gray-800 p-2 rounded border border-gray-700">
                      <p className="text-gray-400 mb-1">{payload[0].payload.name}</p>
                      {sortedPayload.map((item, index) => (
                        <div 
                          key={item.dataKey} 
                          className="flex justify-between gap-4 text-sm"
                          style={{ color: item.color }}
                        >
                          <span>{item.name}</span>
                          <span>#{item.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
              <Brush
                dataKey="name"
                height={30}
                stroke="#8884d8"
                fill="#1e1e1e"
                startIndex={0}
              />
              {filteredMembers.map((member) => (
                <Line
                  key={member.id}
                  type="monotone"
                  dataKey={member.id}
                  name={member.name ?? '<Unknown>'}
                  stroke={memberColors[member.id]}
                  strokeWidth={selectedMember === member.id ? 4 : 1}
                  opacity={selectedMember ? (selectedMember === member.id ? 1 : 0.1) : 1}
                  dot={({ cx, cy, payload, dataKey }) => {
                    if (!cx || !cy || !payload) return <></>;  // Return empty fragment instead of null
                    const medalPosition = payload[`${dataKey}_medal`];
                    if (medalPosition) {  // Check if this point earned a medal
                      const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={selectedMember === member.id ? 6 : 4}
                          fill={colors[medalPosition - 1]}
                          stroke="none"
                        />
                      );
                    }
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={selectedMember === member.id ? 4 : 2} 
                        fill={memberColors[member.id]}
                      />
                    );
                  }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}