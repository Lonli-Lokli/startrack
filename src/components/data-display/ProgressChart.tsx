import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';
import { useRankProgressionData } from '../../hooks/useRankProgressionData';
import { useMemo } from 'react';

export function ProgressChart() {
  const { processedMembers } = useData();
  const rankData = useRankProgressionData(processedMembers);

  console.log('processedMembers:', processedMembers);
  console.log('rankData:', rankData);
  
  const chartData = useMemo(() => {
    const days = Array.from({ length: 25 }, (_, i) => i + 1);
    const dataPoints: Array<{ name: string } & Record<string, number>> = [];

    days.forEach(day => {
      ['1', '2'].forEach(part => {
        const pointName = `${day}-${part}`;
        const point = { name: pointName } as { name: string } & Record<string, number>;

        Object.entries(rankData).forEach(([memberId, memberData]) => {
          const rank = memberData[day]?.[part as '1' | '2'];
          if (rank) {
            point[memberId] = rank;
          }
        });

        console.log(`Point ${pointName}:`, point);
        dataPoints.push(point);
      });
    });

    console.log('Final chartData:', dataPoints);
    return dataPoints;
  }, [rankData]);

  if (processedMembers.length === 0) return null;

  return (
    <div className="h-full w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis 
            dataKey="name" 
            interval={1}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            reversed 
            domain={[1, processedMembers.length]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          {processedMembers.map((member) => (
            <Line
              key={member.id}
              type="monotone"
              dataKey={member.id}
              name={member.name ?? '<Unknown>'}
              stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
              dot={{ r: 2 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}