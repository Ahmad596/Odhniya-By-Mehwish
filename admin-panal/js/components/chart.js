export function salesChart() {
  const series = [
    { name: "Stolers", color: "#858585", values: [0, 12, 38, 30, 32] },
    { name: "Undercaps", color: "#dedede", values: [12, 4, 20, 15, 50] },
    { name: "Pins", color: "#efa9b9", values: [18, 30, 25, 40, 42] },
  ];
  const W = 540,
    H = 260,
    L = 48,
    R = 20,
    T = 20,
    B = 42;
  const x = (i) => L + (i * (W - L - R)) / 4;
  const y = (v) => T + ((50 - v) * (H - T - B)) / 50;
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sales comparison across five items"><g class="chart-grid">${[0, 10, 20, 30, 40, 50].map((v) => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 12}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}</g>${series.map((s) => `<polyline points="${s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}" fill="none" stroke="${s.color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${s.values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="4.8" fill="${s.color}"/>`).join("")}`).join("")}${[1, 2, 3, 4, 5].map((n, i) => `<text x="${x(i)}" y="${H - 15}" text-anchor="middle" class="axis-label">Item ${n}</text>`).join("")}</svg><div class="legend">${series.map((s) => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join("")}</div></div>`;
}
