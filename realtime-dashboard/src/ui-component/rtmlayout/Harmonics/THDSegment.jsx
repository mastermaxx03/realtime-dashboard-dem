import React, { useState } from 'react';
import { Maximize } from 'lucide-react';
import Card from '../../common/commonCard';
import SegmentedControl from '../../common/SegmentedControl';
import THDRingChart from './THDIRingChart'; // Assuming a generic ring chart component

export default function THDSegment({ vData, iData, onExpandClick, className }) {
  const [activeChart, setActiveChart] = useState('voltage'); // 'voltage' or 'current'

  const chartData = activeChart === 'voltage' ? vData : iData;

  const headerControls = (
    <>
      <SegmentedControl
        options={[
          { id: 'voltage', label: 'V' },
          { id: 'current', label: 'I' }
        ]}
        activeOptionId={activeChart}
        onSelect={setActiveChart}
      />
      <Maximize size={16} style={{ cursor: 'pointer', color: '#64748B' }} onClick={onExpandClick} />
    </>
  );

  return (
    <Card title="THD" headerControls={headerControls} className={className}>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px' }}>
        <THDRingChart
          value={chartData ? chartData.percentage : 0}
          // You can pass different colors for V and I
          color={activeChart === 'voltage' ? '#3B82F6' : '#F59E0B'}
        />
      </div>
    </Card>
  );
}
