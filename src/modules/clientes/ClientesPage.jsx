const highlights = [
  { label: "Novos leads", value: "32", note: "Esta semana" },
  { label: "Implantacoes", value: "12 em andamento", note: "3 atrasadas" },
  { label: "Satisfacao", value: "92%", note: "NPS medio" }
];

export default function ClientesPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Clientes</p>
          <h1 className="page-title">Gestao de clientes</h1>
          <p className="page-lead">
            Organize o relacionamento, acompanhe onboarding e priorize contas com risco.
          </p>
        </div>
        <div className="actions">
          <button className="btn primary">Novo cliente</button>
          <button className="btn ghost">Exportar CSV</button>
        </div>
      </div>

      <div className="stat-grid">
        {highlights.map((item) => (
          <div className="card stat-card" key={item.label}>
            <span className="pill">{item.label}</span>
            <div className="stat-value">{item.value}</div>
            <p className="stat-label">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="panel-grid">
        <div className="card">
          <h3 className="card-title">Lista rapida</h3>
          <ul className="list">
            <li className="list-item">
              <div>
                <strong>Alfa Labs</strong>
                <p className="muted">Onboarding em curso</p>
              </div>
              <span className="badge">SLA 12h</span>
            </li>
            <li className="list-item">
              <div>
                <strong>Blue Market</strong>
                <p className="muted">Contrato renovacao Q2</p>
              </div>
              <span className="badge">Follow-up</span>
            </li>
            <li className="list-item">
              <div>
                <strong>Cluster Data</strong>
                <p className="muted">Risco de churn</p>
              </div>
              <span className="badge">Urgente</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="card-title">Filtros salvos</h3>
          <div className="chips">
            <span className="chip">Health score alto</span>
            <span className="chip">Sem visita ha 30 dias</span>
            <span className="chip">Tickets criticos</span>
            <span className="chip">Planos enterprise</span>
          </div>
          <p className="footer-note">
            Combine filtros e salve como visao para compartilhar com o time.
          </p>
        </div>
      </div>
    </div>
  );
}
