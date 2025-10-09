import React from "react";
import ReactECharts from "echarts-for-react";
import { Maximize } from "lucide-react";
import Card from "../../common/commonCard"; // 1. Import the reusable Card
import "./AvgPFSegment.css"; // 2. Import the new CSS file

// --- ECharts modular (tree-shaken) imports ---
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([PieChart, TitleComponent, CanvasRenderer]);

// --- Incentive/Penalty Logic ---
const getIncentivePenalty = (avgPF) => {
  if (avgPF >= 0.955) return { text: "Incentive", color: "#22c55e" };
  if (avgPF >= 0.951) return { text: "Neutral", color: "#64748B" };
  if (avgPF < 0.895) return { text: "Penalty", color: "#ef4444" };
  return { text: "Neutral", color: "#64748B" };
};

// 3. Add the 'className' prop
export default function AvgPFSegment({ data, onExpandClick, className }) {
  if (!data) {
    return (
      <Card title="Power Factor Level" className={className}>
        <div>Loading...</div>
      </Card>
    );
  }

  const avgPFValue = data.avg || 0; // Safety check for data
  const maxPF = 1.0;
  const status = getIncentivePenalty(avgPFValue);

  const donutOption = {
    title: {
      text: `{pf|${avgPFValue.toFixed(3)}}\n{line|}\n{status|${status.text}}`,
      left: "center",
      top: "center",
      textStyle: {
        rich: {
          pf: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#1E293B",
            padding: [5, 0],
          },
          line: {
            backgroundColor: "#E2E8F0",
            height: 1,
            width: "100%",
            margin: [10, 0],
          },
          status: {
            fontSize: 14,
            fontWeight: "600",
            color: status.color,
            padding: [5, 0],
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        radius: ["80%", "100%"],
        startAngle: 90,
        label: { show: false },
        hoverAnimation: false,
        data: [
          { value: avgPFValue, itemStyle: { color: status.color } }, // 4. Added safety check
          {
            value: maxPF - avgPFValue,
            itemStyle: { color: "#E2E8F0", opacity: 0.5 },
          },
        ],
      },
    ],
  };

  // 5. Define headerControls for the Card
  const headerControls = (
    <Maximize
      size={16}
      style={{ cursor: "pointer", color: "#64748B" }}
      onClick={onExpandClick}
    />
  );

  // 6. Use the standard Card component structure
  return (
    <Card
      title="Power Factor Level"
      headerControls={headerControls}
      className={className}
    >
      <div className="pf-chart-wrapper">
        <ReactECharts
          echarts={echarts}
          option={donutOption}
          notMerge
          lazyUpdate
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </Card>
  );
}
