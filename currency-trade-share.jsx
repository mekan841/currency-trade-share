import { useState } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

const trendData = [
  { year: 1960, USD: 80, GBP: 10, JPY: 1.0, AUD: 0.5, CNY: 0, Other: 8.5 },
  { year: 1965, USD: 80, GBP: 8, JPY: 1.5, AUD: 0.5, CNY: 0, Other: 10 },
  { year: 1970, USD: 80, GBP: 6, JPY: 3.0, AUD: 0.5, CNY: 0, Other: 10.5 },
  { year: 1975, USD: 79, GBP: 4, JPY: 4.0, AUD: 0.5, CNY: 0, Other: 12.5 },
  { year: 1980, USD: 76, GBP: 3.5, JPY: 5.0, AUD: 0.5, CNY: 0, Other: 15 },
  { year: 1985, USD: 74, GBP: 3, JPY: 5.5, AUD: 0.8, CNY: 0, Other: 16.7 },
  { year: 1990, USD: 72, GBP: 3, JPY: 5.5, AUD: 1.0, CNY: 0, Other: 18.5 },
  { year: 1995, USD: 70, GBP: 3, JPY: 5.5, AUD: 1.0, CNY: 0, Other: 20.5 },
  { year: 1996, USD: 69, GBP: 4, JPY: 5.5, AUD: 1.0, CNY: 0, EUR: 16, Other: 4.5 },
  { year: 1999, USD: 68, GBP: 5, JPY: 5.0, AUD: 1.0, CNY: 0.01, EUR: 18, Other: 3 },
  { year: 2000, USD: 67, GBP: 5, JPY: 4.8, AUD: 1.0, CNY: 0.02, EUR: 19, Other: 3.2 },
  { year: 2003, USD: 66, GBP: 5, JPY: 4.5, AUD: 1.0, CNY: 0.05, EUR: 20, Other: 3.5 },
  { year: 2005, USD: 65, GBP: 5, JPY: 4.0, AUD: 1.0, CNY: 0.1, EUR: 21, Other: 3.9 },
  { year: 2008, USD: 64, GBP: 5, JPY: 3.5, AUD: 1.0, CNY: 0.3, EUR: 22, Other: 4.2 },
  { year: 2010, USD: 63, GBP: 5, JPY: 3.5, AUD: 1.0, CNY: 0.5, EUR: 22, Other: 5 },
  { year: 2012, USD: 62, GBP: 5, JPY: 3.5, AUD: 1.0, CNY: 0.8, EUR: 22, Other: 5.7 },
  { year: 2014, USD: 62, GBP: 5, JPY: 3.2, AUD: 1.0, CNY: 1.2, EUR: 22, Other: 5.6 },
  { year: 2016, USD: 62, GBP: 5, JPY: 3.0, AUD: 1.0, CNY: 1.5, EUR: 22, Other: 5.5 },
  { year: 2018, USD: 61, GBP: 5.5, JPY: 3.0, AUD: 1.0, CNY: 2.0, EUR: 22, Other: 5.5 },
  { year: 2020, USD: 60, GBP: 5.5, JPY: 3.0, AUD: 1.0, CNY: 2.5, EUR: 22, Other: 6 },
  { year: 2022, USD: 59, GBP: 5.5, JPY: 3.0, AUD: 1.0, CNY: 3.0, EUR: 22, Other: 6.5 },
  { year: 2023, USD: 60, GBP: 5.5, JPY: 3.0, AUD: 1.0, CNY: 3.0, EUR: 22, Other: 5.5 },
  { year: 2025, USD: 59, GBP: 5.5, JPY: 3.0, AUD: 1.0, CNY: 3.5, EUR: 22, Other: 6 },
];

const summaryRows = [
  { year: "1960", USD: "80.0%", EUR: "—", JPY: "0.1%", GBP: "10.0%", AUD: "0.5%", CNY: "—", Other: "8.5%" },
  { year: "1970", USD: "80.0%", EUR: "—", JPY: "3.0%", GBP: "6.0%", AUD: "0.5%", CNY: "—", Other: "10.5%" },
  { year: "1980", USD: "76.0%", EUR: "—", JPY: "5.0%", GBP: "3.5%", AUD: "0.5%", CNY: "—", Other: "15.0%" },
  { year: "1990", USD: "72.0%", EUR: "—", JPY: "5.5%", GBP: "3.0%", AUD: "1.0%", CNY: "—", Other: "18.5%" },
  { year: "2000", USD: "67.0%", EUR: "19.0%", JPY: "4.8%", GBP: "5.0%", AUD: "1.0%", CNY: "<0.1%", Other: "3.2%" },
  { year: "2010", USD: "63.0%", EUR: "22.0%", JPY: "3.5%", GBP: "5.0%", AUD: "1.0%", CNY: "0.5%", Other: "5.0%" },
  { year: "2015", USD: "62.0%", EUR: "22.0%", JPY: "3.0%", GBP: "5.0%", AUD: "1.0%", CNY: "1.5%", Other: "5.5%" },
  { year: "2020", USD: "60.0%", EUR: "22.0%", JPY: "3.0%", GBP: "5.5%", AUD: "1.0%", CNY: "2.5%", Other: "6.0%" },
  { year: "2023", USD: "60.0%", EUR: "22.0%", JPY: "3.0%", GBP: "5.5%", AUD: "1.0%", CNY: "3.0%", Other: "5.5%" },
  { year: "2025", USD: "59.0%", EUR: "22.0%", JPY: "3.0%", GBP: "5.5%", AUD: "1.0%", CNY: "3.5%", Other: "6.0%" },
];

const baseLookup = { USD: 1960, EUR: 1996, GBP: 1960, JPY: 1970, AUD: 1960, CNY: 2000, Other: 1960 };
const baseValues = {};
Object.entries(baseLookup).forEach(([c, baseYear]) => {
  const row = trendData.find(d => d.year === baseYear);
  if (row && row[c] != null && row[c] > 0) baseValues[c] = row[c];
});
const indexedData = trendData.map((row) => {
  const point = { year: row.year };
  Object.keys(baseLookup).forEach((c) => {
    if (row.year >= baseLookup[c] && row[c] != null && row[c] > 0 && baseValues[c]) {
      point[c] = Math.round((row[c] / baseValues[c]) * 1000) / 10;
    }
  });
  return point;
});
const cumulativeData = trendData.map((row) => {
  const point = { year: row.year };
  Object.keys(baseLookup).forEach((c) => {
    if (row.year >= baseLookup[c] && row[c] != null && baseValues[c]) {
      point[c] = Math.round((row[c] - baseValues[c]) * 10) / 10;
    }
  });
  return point;
});

const colors = { USD: "#2563eb", EUR: "#dc2626", GBP: "#16a34a", JPY: "#d97706", AUD: "#8b5cf6", CNY: "#ec4899", Other: "#71717a" };
const currencyLabels = { USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen", AUD: "Australian Dollar", CNY: "Chinese Yuan", Other: "Other" };
const allCurrencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CNY"];
const tickYears = [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025];

const ShareTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: "#1c1c1e", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
      <div style={{ color: "#999", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.filter(p => p.value != null && p.value > 0).sort((a, b) => b.value - a.value).map((p) => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
          <span style={{ color: "#ccc" }}>{currencyLabels[p.dataKey]}</span>
          <span style={{ color: "#fff", fontWeight: 600, marginLeft: "auto" }}>{p.value}%</span>
        </div>
      ))}
      {label < 1996 && <div style={{ color: "#52525b", fontSize: 11, marginTop: 4, borderTop: "1px solid #333", paddingTop: 4 }}>"Other" includes DM, FF, NLG, and other European currencies</div>}
    </div>
  );
};
const IndexedTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: "#1c1c1e", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
      <div style={{ color: "#999", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.filter(p => p.value != null).sort((a, b) => b.value - a.value).map((p) => {
        const pct = Math.round((p.value - 100) * 10) / 10;
        return (
          <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <span style={{ color: "#ccc" }}>{currencyLabels[p.dataKey]}</span>
            <span style={{ color: pct > 0 ? "#22c55e" : pct < 0 ? "#ef4444" : "#a1a1aa", fontWeight: 600, marginLeft: "auto" }}>{pct > 0 ? "+" : ""}{pct}%</span>
          </div>
        );
      })}
    </div>
  );
};
const CumulativeTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: "#1c1c1e", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
      <div style={{ color: "#999", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.filter(p => p.value != null).sort((a, b) => b.value - a.value).map((p) => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
          <span style={{ color: "#ccc" }}>{currencyLabels[p.dataKey]}</span>
          <span style={{ color: p.value > 0 ? "#22c55e" : p.value < 0 ? "#ef4444" : "#a1a1aa", fontWeight: 600, marginLeft: "auto" }}>{p.value > 0 ? "+" : ""}{p.value} pp</span>
        </div>
      ))}
    </div>
  );
};
const renderLegend = (props) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 18px", paddingTop: 12, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
    {props.payload.map((entry) => (
      <div key={entry.dataKey} style={{ display: "flex", alignItems: "center", gap: 5, color: "#a1a1aa" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: entry.color }} />
        {currencyLabels[entry.dataKey] || entry.dataKey}
      </div>
    ))}
  </div>
);
const SectionLabel = ({ title }) => (
  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#52525b", marginBottom: 12, marginTop: 8 }}>{title}</div>
);

const EventKey = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 24px", padding: "12px 8px 4px", fontSize: 11, color: "#71717a" }}>
    {[
      { year: "1971", label: "Nixon shock — US ends gold convertibility, dollar floats freely" },
      { year: "1999", label: "Euro launched — replaces DM, FF, NLG and other European currencies" },
      { year: "2015", label: "CIPS launched — China's cross-border yuan payment system goes live" },
    ].map((e) => (
      <div key={e.year} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
        <div style={{ width: 16, borderTop: "2px dashed #52525b", marginTop: 6, flexShrink: 0 }} />
        <span><span style={{ color: "#a1a1aa", fontWeight: 600 }}>{e.year}</span> — {e.label}</span>
      </div>
    ))}
  </div>
);

export default function CurrencyTradeShare() {
  const [hideUSA, setHideUSA] = useState(false);
  const [hideCNY, setHideCNY] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#111113", color: "#e4e4e7", minHeight: "100vh", padding: "32px 24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", marginBottom: 6 }}>SWIFT · CIPS · Global Trade · 1960–2025</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: "#f4f4f5", lineHeight: 1.2 }}>Currency Share in International Trade</h1>
          <p style={{ fontSize: 13, color: "#71717a", marginTop: 6, lineHeight: 1.6 }}>
            Estimated share of global trade settled/financed/invoiced in each currency across SWIFT, CIPS, and other networks. Excludes intra-eurozone flows. Euro line begins 1996 — prior to that, European legacy currencies are in "Other".
          </p>
        </div>

        {/* Chart 1 */}
        <SectionLabel title="Share of Global Trade" />
        <div style={{ background: "#18181b", borderRadius: 12, border: "1px solid #27272a", padding: "24px 12px 16px", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingLeft: 8, paddingRight: 8, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#d4d4d8" }}>{hideUSA ? "Excluding US Dollar" : "All Major Currencies — 1960 to 2025"}</div>
              <div style={{ fontSize: 12, color: "#52525b", marginTop: 2 }}>% of global trade by currency (excl. intra-eurozone)</div>
            </div>
            <button onClick={() => setHideUSA(!hideUSA)} style={{ background: "#27272a", border: "1px solid #3f3f46", borderRadius: 6, color: "#a1a1aa", fontSize: 11, padding: "5px 10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}>
              {hideUSA ? "Show USA" : "Hide USA"}
            </button>
          </div>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={trendData} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="year" type="number" domain={[1960, 2026]} ticks={tickYears} tick={{ fill: "#71717a", fontSize: 11 }} axisLine={{ stroke: "#27272a" }} tickLine={false} angle={-45} textAnchor="end" height={40} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={hideUSA ? [0, 25] : [0, 85]} />
              <Tooltip content={<ShareTooltip />} />
              <Legend content={renderLegend} />
              <ReferenceLine x={1971} stroke="#3f3f46" strokeDasharray="4 4" label={{ value: "Nixon shock", fill: "#52525b", fontSize: 10, position: "top" }} />
              <ReferenceLine x={1999} stroke="#3f3f46" strokeDasharray="4 4" label={{ value: "€ launched", fill: "#52525b", fontSize: 10, position: "top" }} />
              <ReferenceLine x={2015} stroke="#3f3f46" strokeDasharray="4 4" label={{ value: "CIPS launched", fill: "#52525b", fontSize: 10, position: "top" }} />
              {[...allCurrencies, "Other"].map((key) => {
                if (hideUSA && key === "USD") return null;
                return <Line key={key} type="monotone" dataKey={key} stroke={colors[key]} strokeWidth={key === "USD" ? 3 : key === "EUR" ? 2.5 : key === "Other" ? 1.5 : 2} strokeDasharray={key === "Other" ? "5 3" : undefined} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "#111" }} connectNulls={false} />;
              })}
            </LineChart>
          </ResponsiveContainer>
          <EventKey />
        </div>

        {/* Chart 2: Indexed */}
        <SectionLabel title="Indexed Trajectory (Rebased to 100)" />
        <div style={{ background: "#18181b", borderRadius: 12, border: "1px solid #27272a", padding: "24px 12px 16px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingLeft: 8, paddingRight: 8, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#d4d4d8" }}>Each Currency's Share Rebased to 100</div>
              <div style={{ fontSize: 12, color: "#52525b", marginTop: 2 }}>100 = starting value. USD/GBP/AUD from 1960, EUR from 1996, JPY from 1970, CNY from 2000.</div>
            </div>
            <button onClick={() => setHideCNY(!hideCNY)} style={{ background: "#27272a", border: "1px solid #3f3f46", borderRadius: 6, color: "#a1a1aa", fontSize: 11, padding: "5px 10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}>
              {hideCNY ? "Show CNY" : "Hide CNY"}
            </button>
          </div>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={indexedData} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="year" type="number" domain={[1960, 2026]} ticks={tickYears} tick={{ fill: "#71717a", fontSize: 11 }} axisLine={{ stroke: "#27272a" }} tickLine={false} angle={-45} textAnchor="end" height={40} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<IndexedTooltip />} />
              <Legend content={renderLegend} />
              <ReferenceLine y={100} stroke="#52525b" strokeWidth={1.5} strokeDasharray="6 3" />
              {[...allCurrencies, "Other"].map((key) => {
                if (hideCNY && key === "CNY") return null;
                return <Line key={key} type="monotone" dataKey={key} stroke={colors[key]} strokeWidth={key === "USD" || key === "CNY" ? 3 : key === "Other" ? 1.5 : 2} strokeDasharray={key === "Other" ? "5 3" : undefined} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "#111" }} connectNulls={false} />;
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ fontSize: 11, color: "#52525b", lineHeight: 1.5, marginBottom: 28 }}>CNY's growth from a near-zero base dominates the scale. USD's decline from 100 → ~74 and GBP's fall from 100 → ~55 are the other key movements.</div>

        {/* Chart 3: Cumulative pp */}
        <SectionLabel title="Cumulative Change (Percentage Points)" />
        <div style={{ background: "#18181b", borderRadius: 12, border: "1px solid #27272a", padding: "24px 12px 16px", marginBottom: 12 }}>
          <div style={{ paddingLeft: 8, paddingRight: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#d4d4d8" }}>Percentage Points Gained or Lost Over Time</div>
            <div style={{ fontSize: 12, color: "#52525b", marginTop: 2 }}>Running total of pp change since each currency's base year. Below zero = losing share.</div>
          </div>
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={cumulativeData} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="year" type="number" domain={[1960, 2026]} ticks={tickYears} tick={{ fill: "#71717a", fontSize: 11 }} axisLine={{ stroke: "#27272a" }} tickLine={false} angle={-45} textAnchor="end" height={40} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}`} />
              <Tooltip content={<CumulativeTooltip />} />
              <Legend content={renderLegend} />
              <ReferenceLine y={0} stroke="#52525b" strokeWidth={1.5} />
              {[...allCurrencies, "Other"].map((key) => (
                <Area key={key} type="monotone" dataKey={key} stroke={colors[key]} strokeWidth={key === "USD" || key === "CNY" || key === "EUR" ? 2.5 : key === "Other" ? 1.5 : 1.5} strokeDasharray={key === "Other" ? "5 3" : undefined} fill={colors[key]} fillOpacity={key === "USD" ? 0.15 : key === "CNY" ? 0.15 : key === "EUR" ? 0.1 : 0.04} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "#111" }} connectNulls={false} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ fontSize: 11, color: "#52525b", lineHeight: 1.5, marginBottom: 28 }}>The USD has shed –21pp since 1960. The EUR gained +6pp since 1996. The CNY has gained +3.5pp since 2000.</div>

        {/* Data Table */}
        <SectionLabel title="Data Table" />
        <div style={{ background: "#18181b", borderRadius: 12, border: "1px solid #27272a", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 700 }}>
              <thead>
                <tr>
                  {["Year", "USD", "EUR", "JPY", "GBP", "AUD", "CNY", "Other"].map((h, i) => (
                    <th key={i} style={{ padding: "16px 20px", textAlign: "left", fontWeight: 500, fontSize: 14, color: "#a1a1aa", borderBottom: "1px solid #27272a" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {summaryRows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < summaryRows.length - 1 ? "1px solid #1f1f23" : "none" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#d4d4d8", fontSize: 15 }}>{row.year}</td>
                    <td style={{ padding: "16px 20px", color: colors.USD, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{row.USD}</td>
                    <td style={{ padding: "16px 20px", color: row.EUR === "—" ? "#3f3f46" : colors.EUR, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{row.EUR}</td>
                    <td style={{ padding: "16px 20px", color: colors.JPY, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{row.JPY}</td>
                    <td style={{ padding: "16px 20px", color: colors.GBP, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{row.GBP}</td>
                    <td style={{ padding: "16px 20px", color: colors.AUD, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{row.AUD}</td>
                    <td style={{ padding: "16px 20px", color: row.CNY === "—" ? "#3f3f46" : colors.CNY, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{row.CNY}</td>
                    <td style={{ padding: "16px 20px", color: colors.Other, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{row.Other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 11, color: "#3f3f46", lineHeight: 1.7, textAlign: "center" }}>
          Sources: CBO (2023); US Federal Reserve (2021); BIS (2022); ECB International Role of the Euro (June 2025);
          Boz, Gopinath, Mehl et al. (IMF/ECB, 2025); Eichengreen, Mehl & Chiţu (2018); Schenk (2010); SWIFT RMB Tracker; CIPS / Atlantic Council.
          <br />
          Pre-1996 "Other" includes DM, FF, NLG, and other European legacy currencies. CNY incl. CIPS (est. 2015). Pre-1990 figures are scholarly estimates.
        </div>
      </div>
    </div>
  );
}
