import React from "react";
// 1. Import the necessary components
import { Maximize } from "lucide-react";
import Card from "../../common/commonCard";
import SegmentedControl from "../../common/SegmentedControl";

// ---- Styles ----
const styles = {
  mainContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  primaryValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1a73e8",
  },
  secondaryWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    height: "20px",
  },
  absoluteChange: {
    fontSize: "1rem",
    color: "#5f6368",
    fontWeight: "500",
  },
  trendIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "1rem",
    fontWeight: "500",
  },
};

const TrendIndicator = ({ current, previous }) => {
  if (
    previous === null ||
    previous === undefined ||
    current === previous ||
    previous === 0
  ) {
    return null;
  }
  const change = current - previous;
  const percentageChange = (change / previous) * 100;
  const isIncrease = change > 0;
  const color = isIncrease ? "#ef4444" : "#22c55e";
  const arrow = isIncrease ? "▲" : "▼";

  return (
    <div style={{ ...styles.trendIndicator, color }}>
      <span>{arrow}</span>
      <span>{Math.abs(percentageChange).toFixed(1)}%</span>
    </div>
  );
};

// 2. Add the missing props: onSelectMetric, onExpandClick, className
export default function EnergyConsumptionSegment({
  data,
  activeMetric,
  onSelectMetric,
  onExpandClick,
  className,
}) {
  const {
    totalKWH = 0,
    totalKVAh = 0,
    totalKWH_previous = null,
    totalKVAh_previous = null,
  } = data || {};

  const isKwhMode = activeMetric === "kwh";
  const primaryValue = isKwhMode ? totalKWH : totalKVAh;
  const previousValue = isKwhMode ? totalKWH_previous : totalKVAh_previous;
  const unit = isKwhMode ? "kWh" : "kVAh";

  const absoluteChange = primaryValue - (previousValue || 0);

  // 3. Define the headerControls, including the SegmentedControl
  const headerControls = (
    <>
      <SegmentedControl
        options={[
          { id: "kwh", label: "kWh" },
          { id: "kvah", label: "kVAh" },
        ]}
        activeOptionId={activeMetric}
        onSelect={onSelectMetric}
      />
      <Maximize
        size={16}
        style={{ cursor: "pointer", color: "#64748B" }}
        onClick={onExpandClick}
      />
    </>
  );

  // 4. Wrap everything in the <Card> component
  return (
    <Card
      title="Energy Consumption"
      headerControls={headerControls}
      className={className}
    >
      <div style={styles.mainContent}>
        <div style={styles.primaryValue}>
          {primaryValue.toLocaleString("en-IN", { maximumFractionDigits: 1 })}{" "}
          {unit}
        </div>
        <div style={styles.secondaryWrapper}>
          {previousValue !== null && (
            <>
              <div style={styles.absoluteChange}>
                {absoluteChange >= 0 ? "+" : ""}
                {absoluteChange.toLocaleString("en-IN", {
                  maximumFractionDigits: 1,
                })}{" "}
                {unit}
              </div>
              <TrendIndicator current={primaryValue} previous={previousValue} />
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
