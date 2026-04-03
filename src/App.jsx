export default function App() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="page-title">Visao geral do sistema</h1>
          <p className="page-lead">
            Acompanhe clientes, financeiro e acessos com um visual limpo e rapido.
          </p>
        </div> 
        <div className="actions">
          <button className="btn primary">Criar atalho</button>
          <button className="btn ghost">Exportar relatorio</button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card stat-card">
          <span className="pill">Clientes ativos</span>
          <div className="stat-value">248</div>
          <p className="stat-label">Atualizado agora</p>
        </div>
        <div className="card stat-card">
          <span className="pill">Receita mensal</span>
          <div className="stat-value">R$ 312k</div>
          <p className="stat-label">Projecao 30 dias</p>
        </div>
        <div className="card stat-card">
          <span className="pill">Tarefas</span>
          <div className="stat-value">18 pendentes</div>
          <p className="stat-label">4 concluidas hoje</p>
        </div>
      </div>

      <div className="panel-grid">
        <div className="card">
          <h3 className="card-title">Proximas acoes</h3>
          <ul className="list">
            <li className="list-item">
              <div>
                <strong>Auditar acessos</strong>
                <p className="muted">Reveja permissoes dos modulos criticos.</p>
              </div>
              <span className="badge">Hoje</span>
            </li>
            <li className="list-item">
              <div>
                <strong>Enviar resumo financeiro</strong>
                <p className="muted">Compartilhe os ultimos indicadores com o time.</p>
              </div>
              <span className="badge">12:00</span>
            </li>
            <li className="list-item">
              <div>
                <strong>Seguimento com clientes</strong>
                <p className="muted">Priorize contas com risco de churn.</p>
              </div>
              <span className="badge">Amanha</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="card-title">Relatorios rapidos</h3>
          <div className="chips">
            <span className="chip">Clientes recentes</span>
            <span className="chip">Contas em atraso</span>
            <span className="chip">Metas do trimestre</span>
            <span className="chip">Eventos de seguranca</span>
          </div>
          <p className="footer-note">
            Use os atalhos para abrir visoes detalhadas em segundos.
          </p>
        </div>
      </div>
    </div>
  );
}
