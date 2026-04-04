import { useDashboardData } from "../hooks/useDashboardData";
import "./DashboardRightPanel.css";

export default function DashboardRightPanel() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="dashboard-bottom-grid">
        <section className="realtime-card card loading">
          <div className="section-head">
            <div>
              <p className="section-eyebrow">Monitoramento</p>
              <h3 className="section-title">Em tempo real</h3>
            </div>
            <span className="status-pill">Carregando...</span>
          </div>
        </section>
        <section className="alarms-card card loading">
          <div className="section-head">
            <div>
              <p className="section-eyebrow">Alertas recentes</p>
              <h3 className="section-title">Alarmes ativos</h3>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-bottom-grid">
        <div className="error-message">Erro ao carregar dados do dashboard</div>
      </div>
    );
  }

  // Mapeia alertas do JSON para o formato esperado
  const alarms = data.alertas.map(alerta => {
    const levelMap = {
      alta: "Crítico",
      media: "Médio",
      baixa: "Info"
    };

    const titleMap = {
      potencia_baixa: "Potência baixa",
      rompimento_fibra: "Rompimento de fibra",
      los: "LOS - Perda de sinal",
      lof: "LOF - Falha de luz"
    };

    return {
      title: titleMap[alerta.tipo] || alerta.descricao,
      target: alerta.referencia,
      level: levelMap[alerta.gravidade] || "Info",
      time: new Date(alerta.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  });

  return (
    <div className="dashboard-bottom-grid">
      <section className="realtime-card card">
        <div className="section-head">
          <div>
            <p className="section-eyebrow">Monitoramento</p>
            <h3 className="section-title">Em tempo real</h3>
          </div>
          <span className="status-pill">Últimos 30 minutos</span>
        </div>

        <div className="metric-row">
          <div className="metric-block">
            <span className="metric-label">RX</span>
            <strong>{data.onus[0]?.potencia_rx || "-19.2 dBm"}</strong>
          </div>
          <div className="metric-block">
            <span className="metric-label">TX</span>
            <strong>{data.onus[0]?.potencia_tx || "2.1 dBm"}</strong>
          </div>
          <div className="metric-block">
            <span className="metric-label">ONUs Online</span>
            <strong>{data.resumo.clientes_online.toLocaleString()}</strong>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-lines">
            <span className="chart-line line-one" />
            <span className="chart-line line-two" />
            <span className="chart-line line-three" />
          </div>
          <div className="chart-legend-row">
            <div>
              <span className="legend-dot legend-blue" />
              <span>RX</span>
            </div>
            <div>
              <span className="legend-dot legend-green" />
              <span>TX</span>
            </div>
            <div>
              <span className="legend-dot legend-white" />
              <span>ONUs Online</span>
            </div>
          </div>
          <div className="chart-footer-row">
            <span>14:00</span>
            <span>14:10</span>
            <span>14:20</span>
            <span>14:30</span>
          </div>
        </div>
      </section>

      <section className="alarms-card card">
        <div className="section-head">
          <div>
            <p className="section-eyebrow">Alertas recentes</p>
            <h3 className="section-title">Alarmes ativos ({data.alertas.length})</h3>
          </div>
          <button className="btn ghost">Ver todos</button>
        </div>

        <ul className="alarm-list">
          {alarms.map((alarm, index) => {
            const severityClass = alarm.level
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "-");

            return (
              <li key={`${alarm.title}-${index}`} className="alarm-item">
                <div>
                  <strong>{alarm.title}</strong>
                  <p className="alarm-target">{alarm.target}</p>
                </div>
                <div className="alarm-meta">
                  <span className={`alarm-tag alarm-${severityClass}`}>{alarm.level}</span>
                  <span className="alarm-time">{alarm.time}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
