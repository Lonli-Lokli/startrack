import { useState } from 'react';
import { DataUpload } from '../upload/DataUpload';
import { useData } from '../../context/DataContext';
import { ProgressChart } from './ProgressChart';
import { ProgressTable } from './ProgressTable';

export function DataVisualizer() {
  const { data } = useData();
  const [activeView, setActiveView] = useState<'table' | 'chart'>('table');

  if (!data) {
    return <DataUpload />;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Navigation tabs - adjusted padding and spacing */}
      <div className="flex gap-4 px-4 -mb-[2px]">
        <TabButton 
          isActive={activeView === 'table'} 
          onClick={() => setActiveView('table')}
        >
          Data Table
        </TabButton>
        <TabButton 
          isActive={activeView === 'chart'} 
          onClick={() => setActiveView('chart')}
        >
          Progress Chart
        </TabButton>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-slate-800 rounded-lg rounded-tl-none overflow-hidden">
        {activeView === 'table' ? <ProgressTable /> : <ProgressChart />}
      </div>
    </div>
  );
}

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-2
        text-sm font-medium 
        rounded-t-lg 
        transition-colors
        relative
        ${isActive 
          ? 'bg-slate-800 text-white before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-blue-500' 
          : 'text-blue-200 hover:text-white hover:bg-slate-800/50'
        }
        ${isActive ? 'font-semibold' : 'font-normal'}
      `}
    >
      <div className="flex items-center gap-2">
        {isActive ? (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/0" />
        )}
        {children}
      </div>
    </button>
  );
}