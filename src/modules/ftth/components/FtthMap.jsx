import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useFtthNetwork } from "../context/useFtthNetwork";
import { getCableSelectionColors } from "../services/ftthColorStandards";
import "./FtthMap.css";

const mapCenter = [-23.5505, -46.6333];
const nodeTypes = ["pop", "dio", "cto", "ceo", "splitter", "cliente"];
const edgeTypes = ["cabo", "fusao", "conexao"];

const nodeLabels = {
  pop: "POP",
  dio: "DIO",
  cto: "CTO",
  ceo: "CEO",
  splitter: "SPL",
  cliente: "CLI"
};

const edgeColors = {
  cabo: "#94a3b8",
  fusao: "#f59e0b",
  conexao: "#c4b5fd"
};

const nodeSummaryKeys = {
  pop: "pops",
  dio: "dios",
  cto: "ctos",
  ceo: "ceos",
  splitter: "splitters",
  cliente: "clientes"
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getNodeIconSvg(kind) {
  switch (kind) {
    case "pop":
      return `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="9" y="13" width="30" height="24" rx="4" />
          <path d="M14 18h20M14 24h20M14 30h20" />
          <circle cx="18" cy="24" r="1.8" />
          <circle cx="24" cy="24" r="1.8" />
          <circle cx="30" cy="24" r="1.8" />
          <path d="M24 8v5M18 40v-3M30 40v-3" />
        </svg>
      `;
    case "dio":
      return `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="10" y="10" width="28" height="28" rx="3" />
          <path d="M15 17h18M15 24h18M15 31h18" />
          <circle cx="17" cy="17" r="1.5" />
          <circle cx="22" cy="17" r="1.5" />
          <circle cx="27" cy="17" r="1.5" />
          <circle cx="32" cy="17" r="1.5" />
          <path d="M17 24c4 5 10 5 14 0" />
        </svg>
      `;
    case "cto":
      return `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="11" y="12" width="26" height="26" rx="6" />
          <path d="M16 20h16M16 27h16" />
          <circle cx="18" cy="32" r="1.7" />
          <circle cx="24" cy="32" r="1.7" />
          <circle cx="30" cy="32" r="1.7" />
          <path d="M24 8v4M24 38v4" />
        </svg>
      `;
    case "ceo":
      return `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="9" y="15" width="30" height="20" rx="10" />
          <path d="M14 25h20" />
          <path d="M17 20c4 6 10 6 14 0" />
          <path d="M17 30c4-6 10-6 14 0" />
          <circle cx="24" cy="25" r="2" />
        </svg>
      `;
    case "splitter":
      return `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="16" r="5" />
          <circle cx="14" cy="34" r="4" />
          <circle cx="24" cy="34" r="4" />
          <circle cx="34" cy="34" r="4" />
          <path d="M24 21v6M24 27l-10 3M24 27l10 3" />
        </svg>
      `;
    case "cliente":
      return `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M10 24l14-12 14 12" />
          <path d="M14 22v16h20V22" />
          <path d="M21 38v-9h6v9" />
          <circle cx="34" cy="14" r="3" />
          <path d="M34 8v-3M39 14h3M37.5 10.5l2-2" />
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="12" y="12" width="24" height="24" rx="5" />
          <path d="M18 24h12" />
        </svg>
      `;
  }
}

function getCollection(state, item) {
  return Object.entries(state.nodes).find(([, values]) => values.some((value) => value.id === item.id))?.[0]
    || Object.entries(state.edges).find(([, values]) => values.some((value) => value.id === item.id))?.[0];
}

function createNodeIcon(node, isSelected) {
  const label = nodeLabels[node.kind] || node.kind.toUpperCase();
  const name = escapeHtml(node.nome);

  return L.divIcon({
    className: "",
    html: `
      <div class="ftth-map-node ftth-map-node-${node.kind} ${isSelected ? "active" : ""}">
        <div class="ftth-map-node-icon">${getNodeIconSvg(node.kind)}</div>
        <div class="ftth-map-node-copy">
          <strong>${label}</strong>
          <span>${name}</span>
        </div>
      </div>
    `,
    iconSize: isSelected ? [118, 68] : [48, 48],
    iconAnchor: isSelected ? [59, 34] : [24, 24]
  });
}

export default function FtthMap() {
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);
  const nodeLayerRef = useRef(null);
  const edgeLayerRef = useRef(null);
  const draftLayerRef = useRef(null);
  const stateRef = useRef(null);

  const {
    state,
    selectedElement,
    addNode,
    addEdge,
    selectElement,
    selectCableFiber,
    setDrawing
  } = useFtthNetwork();

  const nodes = useMemo(() => Object.values(state.nodes).flat(), [state.nodes]);
  const edges = useMemo(() => Object.values(state.edges).flat(), [state.edges]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;

    const map = L.map(mapElementRef.current, {
      center: mapCenter,
      zoom: 14,
      zoomControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 22,
      attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    nodeLayerRef.current = L.layerGroup().addTo(map);
    edgeLayerRef.current = L.layerGroup().addTo(map);
    draftLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    map.on("click", (event) => {
      const currentState = stateRef.current;
      const { tool, toolKind, drawing } = currentState.draft;
      const latlng = [event.latlng.lat, event.latlng.lng];

      if (nodeTypes.includes(tool) && toolKind === "node") {
        const collection = nodeSummaryKeys[tool];
        const nextIndex = (currentState.nodes[collection]?.length || 0) + 1;
        addNode(tool, {
          nome: `${tool.toUpperCase()} ${nextIndex}`,
          lat: latlng[0],
          lng: latlng[1],
          metadata: {
            origem: "mapa"
          }
        });
        return;
      }

      if (edgeTypes.includes(tool) && toolKind === "edge") {
        const currentDrawing = drawing?.type === tool ? drawing : { type: tool, coordenadas: [] };
        setDrawing({
          ...currentDrawing,
          coordenadas: [...currentDrawing.coordenadas, latlng]
        });
      }
    });

    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [addNode, setDrawing]);

  useEffect(() => {
    const layer = nodeLayerRef.current;
    if (!layer) return;

    layer.clearLayers();
    nodes
      .filter((node) => Number.isFinite(node.lat) && Number.isFinite(node.lng))
      .forEach((node) => {
        const marker = L.marker([node.lat, node.lng], {
          icon: createNodeIcon(node, selectedElement?.id === node.id)
        });

        marker.on("click", (event) => {
          event.originalEvent.stopPropagation();
          selectElement({
            id: node.id,
            kind: node.kind,
            collection: getCollection(state, node)
          });
        });

        marker.addTo(layer);
      });
  }, [nodes, selectElement, selectedElement?.id, state]);

  useEffect(() => {
    const layer = edgeLayerRef.current;
    if (!layer) return;

    layer.clearLayers();
    edges
      .filter((edge) => edge.coordenadas.length >= 2)
      .forEach((edge) => {
        const cableColors = getCableSelectionColors(state, edge);
        const isSelected = selectedElement?.id === edge.id;
        const lineColor = cableColors?.fiber.hex || edgeColors[edge.kind] || "#22d3ee";
        const borderColor = cableColors?.tube.hex || "#0f172a";

        if (cableColors) {
          L.polyline(edge.coordenadas, {
            color: borderColor,
            weight: 12,
            opacity: 0.96,
            interactive: false,
            className: "ftth-cable-tube-border"
          }).addTo(layer);
        }

        const line = L.polyline(edge.coordenadas, {
          color: lineColor,
          weight: cableColors ? 6 : isSelected ? 6 : 4,
          opacity: cableColors || isSelected ? 0.98 : 0.72,
          dashArray: cableColors ? "18 18" : null,
          className: cableColors ? "ftth-fiber-flow-line" : ""
        });

        line.on("click", (event) => {
          event.originalEvent.stopPropagation();
          selectElement({
            id: edge.id,
            kind: edge.kind,
            collection: getCollection(state, edge)
          });

          if (edge.kind === "cabo") {
            const currentSelection = state.draft.cableFiberSelection;

            if (currentSelection?.cableId !== edge.id) {
              selectCableFiber({
                cableId: edge.id,
                tubeNumber: 1,
                fiberNumber: 1
              });
            }
          }
        });

        line.bindTooltip(cableColors
          ? `${edge.nome} | Tubo ${cableColors.tubeNumber} ${cableColors.tube.name} | Fibra ${cableColors.fiberNumber} ${cableColors.fiber.name}`
          : edge.nome);
        line.addTo(layer);
      });
  }, [edges, selectCableFiber, selectElement, selectedElement?.id, state]);

  useEffect(() => {
    const layer = draftLayerRef.current;
    if (!layer) return;

    layer.clearLayers();

    const drawing = state.draft.drawing;
    if (!drawing?.coordenadas?.length) return;

    drawing.coordenadas.forEach((point, index) => {
      L.circleMarker(point, {
        radius: 5,
        color: "#e5e7eb",
        fillColor: edgeColors[drawing.type] || "#22d3ee",
        fillOpacity: 1,
        weight: 2
      }).bindTooltip(`Ponto ${index + 1}`).addTo(layer);
    });

    if (drawing.coordenadas.length >= 2) {
      L.polyline(drawing.coordenadas, {
        color: edgeColors[drawing.type] || "#22d3ee",
        dashArray: "8 8",
        weight: 4,
        opacity: 0.85
      }).addTo(layer);
    }
  }, [state.draft.drawing]);

  function handleFinishDrawing() {
    const drawing = state.draft.drawing;
    if (!drawing || drawing.coordenadas.length < 2) return;

    addEdge(drawing.type, {
      nome: `${drawing.type.toUpperCase()} ${edges.length + 1}`,
      coordenadas: drawing.coordenadas,
      ...(drawing.type === "cabo" ? { totalTubos: 1, fibrasPorTubo: 12 } : {}),
      metadata: {
        origem: "mapa",
        total_pontos: drawing.coordenadas.length
      }
    });
    setDrawing(null);
  }

  function handleCancelDrawing() {
    setDrawing(null);
  }

  const drawingPointCount = state.draft.drawing?.coordenadas?.length || 0;

  return (
    <div className="ftth-real-map-wrap">
      <div className="ftth-map-underlay" aria-hidden="true">
        <span className="ftth-map-ring ftth-map-ring-1" />
        <span className="ftth-map-ring ftth-map-ring-2" />
        <span className="ftth-map-route ftth-map-route-1" />
        <span className="ftth-map-route ftth-map-route-2" />
        <span className="ftth-map-place ftth-map-place-pop">POP</span>
        <span className="ftth-map-place ftth-map-place-cto">CTO</span>
        <span className="ftth-map-place ftth-map-place-cli">Cliente</span>
      </div>
      <div className="ftth-real-map" ref={mapElementRef} />

      <div className="ftth-map-floating-panel">
        <strong>{state.draft.toolKind === "select" ? "Selecao" : state.draft.tool.toUpperCase()}</strong>
        <span>
          {state.draft.toolKind === "node" && "Clique no mapa para posicionar o elemento."}
          {state.draft.toolKind === "edge" && "Clique no mapa para adicionar pontos ao trajeto."}
          {state.draft.toolKind === "select" && "Clique em elementos ou caminhos para selecionar."}
        </span>
      </div>

      {state.draft.toolKind === "edge" && (
        <div className="ftth-map-drawing-panel">
          <span>{drawingPointCount} ponto{drawingPointCount === 1 ? "" : "s"}</span>
          <button className="btn ghost" type="button" onClick={handleCancelDrawing} disabled={drawingPointCount === 0}>
            Cancelar
          </button>
          <button className="btn primary" type="button" onClick={handleFinishDrawing} disabled={drawingPointCount < 2}>
            Finalizar
          </button>
        </div>
      )}

      <div className="ftth-map-legend">
        {Object.entries(edgeColors).map(([type, color]) => (
          <span key={type}>
            <i style={{ background: color }} />
            {type === "cabo" ? "cabo base" : type}
          </span>
        ))}
      </div>
    </div>
  );
}
