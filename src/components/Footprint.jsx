import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

// 1. Import your local map data (Ensure this file exists in src/assets/)
import indiaData from "../data/india.json"; 

// ─── City / Supplier Data ───────────────────────────────────────────────────
const CITIES = {
  bengaluru: {
    label: "Bengaluru",
    color: "#10b981",
    textColor: "#065f46",
    coords: [77.5946, 12.9716],
    suppliers: [
      { no: 5, process: "PDC", tonnage: "150 T",  units: 3 },
      { no: 6, process: "PDC", tonnage: "430 T",  units: 1 },
      { no: 7, process: "PDC", tonnage: "460 T",  units: 1 },
    ],
  },
  hosur: {
    label: "Hosur",
    color: "#a855f7",
    textColor: "#581c87",
    coords: [77.8253, 12.7409],
    suppliers: [
      { no: 3, process: "PDC", tonnage: "150 T",  units: 1 },
      { no: 4, process: "GDC", tonnage: "300 Kg", units: 4 },
    ],
  },
  chennai: {
    label: "Chennai",
    color: "#f97316",
    textColor: "#9a3412",
    coords: [80.2785, 13.0827],
    suppliers: [
      { no: 1, process: "PDC", tonnage: "250 T",  units: 1 },
      { no: 2, process: "PDC", tonnage: "420 T",  units: 1 },
    ],
  },
};

const SOUTH_STATES = new Set([
  "Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Telangana"
]);

function normaliseName(props) {
  return props.NAME_1 || props.name || props.st_nm || props.STATE || props.Name || "";
}

const STATE_CONFIG = {
  "Karnataka":      { fill: "#fef9c3", stroke: "#a16207" },
  "Tamil Nadu":     { fill: "#ffe4e6", stroke: "#be185d" },
  "Kerala":         { fill: "#ede9fe", stroke: "#7c3aed" },
  "Andhra Pradesh": { fill: "#d1fae5", stroke: "#065f46" },
  "Telangana":      { fill: "#dbeafe", stroke: "#1d4ed8" },
};

// ─── D3 Map Component ───────────────────────────────────────────────────────
function SouthIndiaMap({ activeCity, onSelect }) {
  const svgRef  = useRef(null);
  const [status, setStatus] = useState("loading");
  const W = 640, H = 660;

  const drawMap = (features) => {
    setStatus("ready");
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const collection = { type: "FeatureCollection", features };
    const projection = d3.geoMercator()
      .fitExtent([[28, 28], [W - 28, H - 56]], collection);
    const pathGen = d3.geoPath().projection(projection);

    const defs = svg.append("defs");
    const wg = defs.append("linearGradient")
      .attr("id","wGrad").attr("x1","0%").attr("y1","0%")
      .attr("x2","100%").attr("y2","100%");
    wg.append("stop").attr("offset","0%").attr("stop-color","#bfdbfe");
    wg.append("stop").attr("offset","100%").attr("stop-color","#7dd3fc");

    const sf = defs.append("filter").attr("id","pShadow")
      .attr("x","-60%").attr("y","-60%").attr("width","220%").attr("height","220%");
    sf.append("feDropShadow")
      .attr("dx",0).attr("dy",2).attr("stdDeviation",3)
      .attr("flood-color","#00000055");

    svg.append("rect").attr("width",W).attr("height",H).attr("fill","url(#wGrad)");

    const graticule = d3.geoGraticule().step([1,1]);
    svg.append("path").datum(graticule())
      .attr("d", pathGen).attr("fill","none")
      .attr("stroke","#93c5fd").attr("stroke-width",0.4).attr("opacity",0.45);

    // Render Merged State Boundaries
    svg.selectAll(".state")
      .data(features)
      .join("path")
      .attr("d", pathGen)
      .attr("fill", d => STATE_CONFIG[d.properties.NAME_1]?.fill || "#e2e8f0")
      .attr("stroke", d => STATE_CONFIG[d.properties.NAME_1]?.stroke || "#94a3b8")
      .attr("stroke-width", 1.6)
      .attr("stroke-linejoin","round");

    Object.entries(CITIES).forEach(([id, city]) => {
      const coords = projection(city.coords);
      if(!coords) return;
      const [x, y] = coords;
      const isActive = activeCity === id;
      
      const g = svg.append("g").style("cursor","pointer").on("click", () => onSelect(id));

      g.append("circle").attr("cx",x).attr("cy",y).attr("r", isActive ? 18 : 13)
        .attr("fill",city.color).attr("opacity",0.25);

      g.append("circle").attr("cx",x).attr("cy",y).attr("r", isActive?11:9)
        .attr("fill","#fff").attr("stroke",city.color).attr("stroke-width", isActive?3.5:2.5)
        .attr("filter","url(#pShadow)");

      g.append("circle").attr("cx",x).attr("cy",y).attr("r", isActive?5.5:4.5).attr("fill",city.color);

      const offsetX = id === "hosur" ? -16 : 16;
      const lx = x + offsetX, ly = y - 8;
      const pw = city.label.length * 6.5 + 16;
      const px = id === "hosur" ? lx - pw + 4 : lx - 6;

      g.append("rect").attr("x",px).attr("y",ly-13).attr("width",pw).attr("height",18).attr("rx",5)
        .attr("fill","#fffffff2").attr("stroke",city.color).attr("stroke-width",1);
      g.append("text").attr("x",px+6).attr("y",ly).attr("font-size",10).attr("font-weight",700)
        .attr("fill",city.textColor).text(city.label);
    });
  };

  useEffect(() => {
    try {
      const key = Object.keys(indiaData.objects)[0];
      const topologyObject = indiaData.objects[key];

      // Merge (dissolve) district geometries into state geometries
      const stateFeatures = Array.from(SOUTH_STATES).map(stateName => {
        // Find all geometries (districts) that belong to the current state
        const matchingGeometries = topologyObject.geometries.filter(g => 
          normaliseName(g.properties) === stateName
        );

        if (matchingGeometries.length === 0) return null;

        // Use topojson.merge to create a single geometry for the entire state
        return {
          type: "Feature",
          geometry: topojson.merge(indiaData, matchingGeometries),
          properties: { NAME_1: stateName }
        };
      }).filter(Boolean); // Remove nulls if a state isn't found in the data

      if (stateFeatures.length > 0) {
        drawMap(stateFeatures);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Map Error:", err);
      setStatus("error");
    }
  }, [activeCity]);

  return (
    <div style={{ position:"relative", minHeight: 220 }}>
      {status === "loading" && <div style={{ textAlign:"center", padding:20 }}>Loading Map...</div>}
      {status === "error" && <div style={{ textAlign:"center", color:"red", padding:20 }}>⚠️ Map Data Error</div>}
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto", display: status==="ready"?"block":"none" }}/>
    </div>
  );
}

// ─── Supplier Table ─────────────────────────────────────────────────────────
function SupplierTable({ cityKey }) {
  if (!cityKey) return null;
  const city = CITIES[cityKey];
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={{...styles.dot, background:city.color}}/>
        <span style={styles.cardTitle}>{city.label} — Suppliers</span>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>{["#","Process","Tonnage / Cap","Units","Machining"].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {city.suppliers.map((row, i) => (
              <tr key={i} style={{ background: i%2===0?"#fff":"#f8fafc" }}>
                <td style={styles.td}>{row.no}</td>
                <td style={styles.td}><span style={styles.badge}>{row.process}</span></td>
                <td style={styles.td}>{row.tonnage}</td>
                <td style={styles.td}>{row.units}</td>
                <td style={styles.td}><span style={{...styles.badge,...styles.badgeGreen}}>Yes</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function FootprintSection() {
  const [active, setActive] = useState(null);
  const toggle = id => setActive(prev => prev === id ? null : id);

  return (
    <section style={styles.section}>
      <div style={styles.heading}>
        <h2 style={styles.h2}>Our Footprint</h2>
        <p style={styles.sub}>Supplier Network — South India Focus</p>
      </div>

      <div style={styles.legend}>
        {Object.entries(CITIES).map(([id, city]) => (
          <button key={id} onClick={() => toggle(id)}
            style={{
              ...styles.legendBtn,
              borderColor: active===id ? city.color : "#e2e8f0",
              background:  active===id ? `${city.color}12` : "#fff",
            }}>
            <span style={{...styles.legendDot, background:city.color}}/>
            {city.label}
          </button>
        ))}
      </div>

      <div style={styles.mapWrap}>
        <SouthIndiaMap activeCity={active} onSelect={toggle}/>
      </div>

      {active ? <SupplierTable cityKey={active}/> : <p style={styles.note}>Click a city pin or button above</p>}
    </section>
  );
}

const styles = {
  section: { padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", background: "#f8fafc" },
  heading: { textAlign: "center", marginBottom: 30 },
  h2: { fontFamily: "'Syne', sans-serif", fontSize: "2rem", color: "#0f172a", margin: 0 },
  sub: { color: "#64748b", marginTop: 5 },
  legend: { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", justifyContent: "center" },
  legendBtn: { display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, border: "1px solid", cursor: "pointer", transition: "0.2s", fontWeight: 500, background: "#fff" },
  legendDot: { width: 10, height: 10, borderRadius: "50%" },
  mapWrap: { width: "100%", maxWidth: 640, background: "#fff", borderRadius: 16, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", overflow: "hidden", marginBottom: 30 },
  note: { color: "#94a3b8", fontSize: "0.9rem", fontStyle: "italic" },
  card: { width: "100%", maxWidth: 640, background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)" },
  cardHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 15 },
  dot: { width: 12, height: 12, borderRadius: "50%" },
  cardTitle: { fontWeight: 700, fontSize: "1.1rem" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "10px", borderBottom: "2px solid #f1f5f9", fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase" },
  td: { padding: "12px 10px", borderBottom: "1px solid #f1f5f9", fontSize: "0.85rem" },
  badge: { padding: "2px 8px", borderRadius: 12, fontSize: "0.75rem", background: "#f1f5f9", fontWeight: 600 },
  badgeGreen: { background: "#dcfce7", color: "#166534" }
};