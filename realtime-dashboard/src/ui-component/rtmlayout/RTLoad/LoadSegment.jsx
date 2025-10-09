import React from "react";
import { Maximize } from "lucide-react";
import Card from "../../common/commonCard";
// Assuming you have a reusable gauge chart component
import GaugeChart from "./GaugeChart";

export default function LoadSegment({ data, onExpandClick, className }) {
  // Define the header controls
  const headerControls = (
    <Maximize
      size={16}
      style={{ cursor: "pointer", color: "#64748B" }}
      onClick={onExpandClick}
    />
  );

  return (
    // Wrap everything in the reusable Card component
    <Card
      title="RT LOAD %"
      headerControls={headerControls}
      className={className}
    >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100px",
        }}
      >
        {/* Render the chart component, passing the percentage */}
        <GaugeChart value={data ? data.percentage : 0} />
      </div>
    </Card>
  );
}
