import "./DashboardTopBar.css";

export default function DashboardTopBar() {
  return (
    <section className="dashboard-topbar">
      <div>
        <p className="dashboard-eyebrow">Dashboard</p>
        <h1 className="dashboard-title">Visão Geral</h1>
        <p className="dashboard-subtitle">
          Painel completo para monitorar clientes, rede, alarmes e finanças.
        </p>
      </div>

      <div className="topbar-actions">
        <button className="btn ghost">Exportar</button>
        <button className="btn primary">Novo relatório</button>
      </div>
    </section>
  );
}
