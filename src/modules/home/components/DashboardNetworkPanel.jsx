import { useDashboardData } from "../hooks/useDashboardData";
import "./DashboardNetworkPanel.css";

const legendItems = [
  { label: "Online", color: "#10b981" },
  { label: "Offline", color: "#9ca3af" },
  { label: "Alarme", color: "#f59e0b" },
  { label: "Rompimento", color: "#ef4444" }
];

export default function DashboardNetworkPanel() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <section className="network-panel card network-card loading">
        <div className="network-header-row">
          <div>
            <p className="section-eyebrow">Mapa da rede</p>
            <h2 className="network-title">Topologia FTTH</h2>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="network-panel card network-card">
        <div className="error-message">Erro ao carregar dados da rede</div>
      </section>
    );
  }

  // Mapeia dados do JSON para nós do mapa
  const mapNodes = [
    {
      label: data.rede.olt.id,
      subtitle: `${data.rede.olt.nome} - ${data.rede.olt.fabricante}`,
      status: "Online",
      top: "12%",
      left: "18%"
    },
    ...data.rede.topologia.map((cto, index) => ({
      label: cto.id,
      subtitle: `${cto.nome} - ${cto.splitters.length} splitters`,
      status: cto.splitters.some(s => s.status === 'ok') ? "Online" : "Alarme",
      top: `${36 + (index * 20)}%`,
      left: `${70 + (index * 8)}%`
    })),
    ...data.onus.map((onu, index) => ({
      label: onu.id,
      subtitle: `${onu.cliente} - ${onu.potencia_rx}`,
      status: onu.status === 'online' ? "Online" : "Alarme",
      top: `${68 + (index * 8)}%`,
      left: `${78 + (index * 5)}%`
    }))
  ];

  return (
    <section className="network-panel card network-card">
      <div className="network-header-row">
        <div>
          <p className="section-eyebrow">Mapa da rede</p>
          <h2 className="network-title">Topologia FTTH</h2>
        </div>
        <div className="network-header-actions">
          <button className="btn ghost">Camadas</button>
          <button className="btn ghost">Plano</button>
        </div>
      </div>

      <div className="network-top-controls">
        <div className="network-search-box">
          <span>🔎</span>
          <input type="search" placeholder="Buscar local, ONU, CTO, OLT..." />
        </div>
        <div className="network-status-row">
          <span className="network-status-pill">Online</span>
          <span className="network-status-pill">Offline</span>
          <span className="network-status-pill alarm">Alarme</span>
          <span className="network-status-pill break">Rompimento</span>
        </div>
      </div>

      <div className="network-map">
        <span className="map-line map-line-1" />
        <span className="map-line map-line-2" />
        <span className="map-line map-line-3" />

        {mapNodes.map((node) => (
          <div key={node.label} className={`map-node map-node-${node.status.toLowerCase()}`} style={{ top: node.top, left: node.left }}>
            <strong>{node.label}</strong>
            <small>{node.subtitle}</small>
            <span>{node.status}</span>
          </div>
        ))}
      </div>

      <div className="network-footer-row">
        <div className="network-stat-block">
          <span className="network-stat-label">{data.resumo.pon_ativas} PONs</span>
          <strong>{data.rede.topologia.reduce((acc, cto) => acc + cto.splitters.length, 0)} Splitters</strong>
        </div>
        <div className="network-stat-block">
          <span className="network-stat-label">{data.rede.topologia.length} CTOs</span>
          <strong>{data.onus.length} ONUs</strong>
        </div>
        <div className="network-stat-block">
          <span className="network-stat-label">{data.resumo.uptime_rede} uptime</span>
          <strong>Monitorados</strong>
        </div>
      </div>
    </section>
  );
}
