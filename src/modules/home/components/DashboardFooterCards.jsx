import { useDashboardData } from "../hooks/useDashboardData";
import "./DashboardFooterCards.css";

export default function DashboardFooterCards() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <section className="footer-cards">
        {[...Array(4)].map((_, i) => (
          <article key={i} className="footer-card loading">
            <div className="footer-card-top">
              <div className="footer-icon loading" />
              <span className="footer-title loading" />
            </div>
            <p className="footer-value loading" />
            <p className="footer-note loading" />
          </article>
        ))}
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="footer-cards">
        <div className="error-message">Erro ao carregar dados do dashboard</div>
      </section>
    );
  }

  const footers = [
    {
      title: "Clientes",
      value: data.resumo.clientes_total.toLocaleString(),
      note: `${data.resumo.clientes_online} ativos no sistema`,
      icon: "👥",
      color: "#3b82f6"
    },
    {
      title: "Financeiro",
      value: "R$ 285.680",
      note: "Faturado este mês",
      icon: "💰",
      color: "#10b981"
    },
    {
      title: "Ordens de serviço",
      value: data.ordens_servico.length.toString(),
      note: `${data.ordens_servico.filter(os => os.status === 'agendado').length} abertas`,
      icon: "🛠️",
      color: "#f59e0b"
    },
    {
      title: "Uso da rede",
      value: "8.4 Gbps",
      note: `${data.resumo.uptime_rede} uptime`,
      icon: "📈",
      color: "#a855f7"
    }
  ];

  return (
    <section className="footer-cards">
      {footers.map((card) => (
        <article key={card.title} className="footer-card">
          <div className="footer-card-top">
            <div className="footer-icon" style={{ background: `${card.color}22`, color: card.color }}>
              {card.icon}
            </div>
            <span className="footer-title">{card.title}</span>
          </div>
          <p className="footer-value">{card.value}</p>
          <p className="footer-note">{card.note}</p>
        </article>
      ))}
    </section>
  );
}
