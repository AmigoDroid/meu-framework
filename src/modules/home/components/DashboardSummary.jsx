import { useDashboardData } from "../hooks/useDashboardData";
import "./DashboardSummary.css";

export default function DashboardSummary() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <section className="dashboard-summary">
        {[...Array(4)].map((_, i) => (
          <article key={i} className="summary-card loading">
            <div className="summary-card-header">
              <div className="summary-icon loading" />
              <div>
                <p className="summary-title loading" />
                <p className="summary-foot loading" />
              </div>
            </div>
            <p className="summary-value loading" />
          </article>
        ))}
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="dashboard-summary">
        <div className="error-message">Erro ao carregar dados do dashboard</div>
      </section>
    );
  }

  const metrics = [
    {
      title: "Clientes ativos",
      value: data.resumo.clientes_total.toLocaleString(),
      foot: `${data.resumo.clientes_online} online, ${data.resumo.clientes_offline} offline`,
      icon: "👥",
      accent: "#3b82f6"
    },
    {
      title: "ONUs online",
      value: data.resumo.clientes_online.toLocaleString(),
      foot: `${((data.resumo.clientes_online / data.resumo.clientes_total) * 100).toFixed(1)}% do total`,
      icon: "📡",
      accent: "#10b981"
    },
    {
      title: "Alarmes ativos",
      value: data.resumo.alertas_ativos.toString(),
      foot: `${data.alertas.length} alertas registrados`,
      icon: "⚠️",
      accent: "#f59e0b"
    },
    {
      title: "Uptime da rede",
      value: data.resumo.uptime_rede,
      foot: `${data.resumo.pon_ativas} PONs ativas`,
      icon: "📊",
      accent: "#8b5cf6"
    }
  ];

  return (
    <section className="dashboard-summary">
      {metrics.map((metric) => (
        <article key={metric.title} className="summary-card">
          <div className="summary-card-header">
            <div className="summary-icon" style={{ background: `${metric.accent}22`, color: metric.accent }}>
              {metric.icon}
            </div>
            <div>
              <p className="summary-title">{metric.title}</p>
              <p className="summary-foot">{metric.foot}</p>
            </div>
          </div>

          <p className="summary-value">{metric.value}</p>
        </article>
      ))}
    </section>
  );
}
