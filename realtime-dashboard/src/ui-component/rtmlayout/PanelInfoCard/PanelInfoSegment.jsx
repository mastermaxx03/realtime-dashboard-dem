// import React from 'react';
// import { Maximize, AlertTriangle, Siren } from 'lucide-react';

// import Card from '../../common/commonCard';
// const styles = {
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: '1px'
//   },
//   content: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12px',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
//   },
//   infoRow: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   label: {
//     fontSize: '0.875rem',
//     fontWeight: '600',
//     color: '#4B5563',
//     width: '80px', // Fixed width for alignment
//     flexShrink: 0
//   },
//   value: {
//     fontSize: '0.875rem',
//     color: '#1F2937'
//   },
//   alarmContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   alarmTag: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     padding: '4px 8px',
//     borderRadius: '6px',
//     fontSize: '0.75rem',
//     fontWeight: 'bold'
//   },
//   criticalAlarm: {
//     backgroundColor: '#FEF2F2', // Light Red
//     color: '#EF4444' // Red
//   },
//   warningAlarm: {
//     backgroundColor: '#FFFBEB', // Light Yellow
//     color: '#F59E0B' // Yellow
//   },
//   statusIndicator: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px'
//   },
//   statusDot: {
//     width: '10px',
//     height: '10px',
//     borderRadius: '50%'
//   },
//   onlineDot: {
//     backgroundColor: '#22C55E' // Green
//   },
//   offlineDot: {
//     backgroundColor: '#6B7280' // Gray
//   }
// };

// // Reusable sub-components for clarity
// const InfoRow = ({ label, value }) => (
//   <div style={styles.infoRow}>
//     <span style={styles.label}>{label.toUpperCase()}:</span>
//     <span style={styles.value}>{value}</span>
//   </div>
// );

// const StatusIndicator = ({ isOnline }) => (
//   <div style={styles.statusIndicator}>
//     <div style={{ ...styles.statusDot, ...(isOnline ? styles.onlineDot : styles.offlineDot) }}></div>
//     <span style={styles.value}>{isOnline ? 'Online' : 'Offline'}</span>
//   </div>
// );

// export default function PanelInfoSegment({ data, onExpandClick }) {
//   // Use data from props where available, otherwise use default values
//   const panelName = data?.name || 'Main LT Panel';
//   const location = data?.location || 'Shop Floor, Assembly';
//   const criticalAlarms = data?.criticalAlarms || 7; // Default value
//   const warningAlarms = data?.warningAlarms || 10; // Default value
//   const isOnline = data?.panelStatus === 'ON';
//   const headerControls = <Maximize size={16} style={{ cursor: 'pointer', color: '#6B7280' }} onClick={onExpandClick} />;

//   return (
//     <Card title="Panel Information" headerControls={headerControls}>
//       <div style={styles.content}>
//         <InfoRow label="Name" value={panelName} />
//         <InfoRow label="Location" value={location} />

//         <div style={styles.infoRow}>
//           <span style={styles.label}>ALARM:</span>
//           <div style={styles.alarmContainer}>
//             <div style={{ ...styles.alarmTag, ...styles.criticalAlarm }}>
//               <Siren size={12} style={{ marginRight: '4px' }} />
//               {criticalAlarms} CRIT
//             </div>
//             <div style={{ ...styles.alarmTag, ...styles.warningAlarm }}>
//               <AlertTriangle size={12} style={{ marginRight: '4px' }} />
//               {warningAlarms} WARN
//             </div>
//           </div>
//         </div>

//         <div style={styles.infoRow}>
//           <span style={styles.label}>STATUS:</span>
//           <StatusIndicator isOnline={isOnline} />
//         </div>
//       </div>
//     </Card>
//   );
// }
import React, { useRef, useLayoutEffect, useState } from "react";
import { Maximize, AlertTriangle, Siren } from "lucide-react";
import Card from "../../common/commonCard";

// ---------- responsive scale ----------
const useScale = (base = 360, min = 0.9, max = 1.6) => {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect?.width || base;
      const s = Math.max(min, Math.min(max, w / base));
      setScale(s);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [base, min, max]);
  return [ref, (px) => `${Math.round(px * scale)}px`, scale];
};

// ---------- styles (static) ----------
const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    width: "fit-content",
    margin: "0 auto",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  label: {
    fontWeight: 600,
    color: "#4B5563",
    minWidth: 90,
    textAlign: "right",
    flexShrink: 0,
  },
  value: {
    color: "#1F2937",
  },
  alarmWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  crit: { backgroundColor: "#FEF2F2", color: "#EF4444" },
  warn: { backgroundColor: "#FFFBEB", color: "#F59E0B" },
  statusWrap: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    justifyContent: "center",
  },
  dot: { width: 10, height: 10, borderRadius: "50%" },
  dotOnline: { backgroundColor: "#22C55E" },
  dotOffline: { backgroundColor: "#6B7280" },
};

export default function PanelInfoSegment({ data, onExpandClick }) {
  // responsive scale
  const [containerRef, fs, scale] = useScale(360, 0.9, 1.6);

  // data
  const panelName = data?.name || "Main LT Panel";
  const location = data?.location || "Shop Floor, Assembly";
  const criticalAlarms = data?.criticalAlarms ?? 7;
  const warningAlarms = data?.warningAlarms ?? 10;
  const isOnline = data?.panelStatus === "ON";

  const headerControls = (
    <Maximize
      size={16}
      style={{ cursor: "pointer", color: "#6B7280" }}
      onClick={onExpandClick}
    />
  );

  return (
    <Card title="Panel Information" headerControls={headerControls}>
      <div ref={containerRef} style={styles.content}>
        {/* NAME */}
        <div style={styles.row}>
          <span style={{ ...styles.label, fontSize: fs(14) }}>NAME:</span>
          <span
            style={{ ...styles.value, fontSize: fs(18), fontWeight: fs(16) }}
          >
            {panelName}
          </span>
        </div>

        {/* LOCATION */}
        <div style={styles.row}>
          <span style={{ ...styles.label, fontSize: fs(14) }}>LOCATION:</span>
          <span style={{ ...styles.value, fontSize: fs(16) }}>{location}</span>
        </div>

        {/* ALARM */}
        <div style={styles.row}>
          <span style={{ ...styles.label, fontSize: fs(14) }}>ALARM:</span>
          <div style={styles.alarmWrap}>
            <div
              style={{
                ...styles.tag,
                ...styles.crit,
                fontSize: fs(12),
                padding: `4px ${Math.round(8 * scale)}px`,
              }}
            >
              <Siren
                size={Math.max(12, Math.round(12 * scale))}
                style={{ marginRight: 4 }}
              />
              {criticalAlarms} CRIT
            </div>
            <div
              style={{
                ...styles.tag,
                ...styles.warn,
                fontSize: fs(12),
                padding: `4px ${Math.round(8 * scale)}px`,
              }}
            >
              <AlertTriangle
                size={Math.max(12, Math.round(12 * scale))}
                style={{ marginRight: 4 }}
              />
              {warningAlarms} WARN
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div style={styles.row}>
          <span style={{ ...styles.label, fontSize: fs(14) }}>STATUS:</span>
          <div style={styles.statusWrap}>
            <div
              style={{
                ...styles.dot,
                ...(isOnline ? styles.dotOnline : styles.dotOffline),
                width: Math.round(10 * scale),
                height: Math.round(10 * scale),
              }}
            />
            <span style={{ ...styles.value, fontSize: fs(16) }}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
