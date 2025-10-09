import React from "react";
import { Maximize } from "lucide-react";
import Card from "../../common/commonCard"; // Import the reusable Card
import FrequencyRingChartSeg from "./FrequencyRingChartSeg";
import "./FrequencySegment.css"; // Import the new CSS file

export default function FrequencySegment({ data, onExpandClick, className }) {
  // Define the controls for the card's header
  const headerControls = (
    <Maximize
      size={16}
      style={{ cursor: "pointer", color: "#64748B" }}
      onClick={onExpandClick}
    />
  );

  return (
    // Use the standard Card component for a consistent layout
    <Card
      title="System Frequency"
      headerControls={headerControls}
      className={className}
    >
      {/* The content is now the child of the Card component */}
      <div className="frequency-chart-wrapper">
        {/* We can give the chart a container to control its size if needed, 
            but the wrapper is enough for centering. */}
        <FrequencyRingChartSeg value={data ? data.avg : 0} />
      </div>
    </Card>
  );
}
