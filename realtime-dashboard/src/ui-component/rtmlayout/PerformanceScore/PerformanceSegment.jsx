import React, { useEffect } from "react";
import PerformanceGaugeChart from "./PerformanceGaugeChart";
// NOTE: Maximize is no longer imported as it's not used
import Card from "../../common/commonCard"; // Adjust path if needed
import { useMachineStatus } from "../../../contexts/MachineStatusContext"; // Adjust path if needed
import { getPerformanceStatus } from "../../../utils/statusUtils";
// Helper function to determine status remains here

// The component now accepts score (with a default) and machineId
export default function PerformanceSegment({ score = 87, machineId }) {
  const { updateMachineStatus } = useMachineStatus();

  // This useEffect hook watches for changes and updates the global context
  useEffect(() => {
    if (machineId) {
      const newStatus = getPerformanceStatus(score);
      updateMachineStatus(machineId, { status: newStatus, score: score });
    }
  }, [score, machineId, updateMachineStatus]);

  const headerControls = null;

  return (
    <Card title="Real Time Performance Score" headerControls={headerControls}>
      <div
        style={{
          display: "flex", // ✅ real flex
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: 280, // ✅ give it a vertical area to center within
        }}
      >
        <div
          style={{
            width: "clamp(220px, 55%, 420px)", // ✅ scales with card width, with sane min/max
            aspectRatio: "1 / 1", // ✅ keep it square (good for gauges)
            height: "auto",
          }}
        >
          <PerformanceGaugeChart value={score} />
        </div>
      </div>
    </Card>
  );
}
