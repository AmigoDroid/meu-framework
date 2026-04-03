const bars = [140, 118, 164, 126, 152, 134];

export default function FinanceiroPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Financeiro</p>
          <h1 className="page-title">Saude financeira</h1>
          <p className="page-lead">
            Tenha visao rapida de receita, despesas e riscos antes de cada decisao.
          </p>
        </div>
        <div className="actions">
          <button className="btn primary">Novo lancamento</button>
          <button className="btn ghost">Centro de custos</button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card stat-card">
          <span className="pill">Receita recorrente</span>
          <div className="stat-value">R$ 312k</div>
          <p className="stat-label">Projecao mensal</p>
        </div>
        <div className="card stat-card">
          <span className="pill">Liquidez</span>
          <div className="stat-value">8.3 meses</div>
          <p className="stat-label">Cobertura de caixa</p>
        </div>
        <div className="card stat-card">
          <span className="pill">Alertas</span>
          <div className="stat-value">6 tickets</div>
          <p className="stat-label">Custos fora do orcamento</p>
        </div>
      </div>

      <div className="panel-grid">
        <div className="card">
          <h3 className="card-title">Fluxo projetado</h3>
          <div className="chart">
            {bars.map((height, index) => (
              <span
                key={index}
                className="chart-bar"
                style={{ height: `${height}px` }}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="footer-note">Projecao baseada nos ultimos 90 dias.</p>
        </div>

        <div className="card">
          <h3 className="card-title">Checklist rapido</h3>
          <ul className="list">
            <li className="list-item">
              <div>
                <strong>Conferir notas fiscais</strong>
                <p className="muted">Fechamento semanal automatico.</p>
              </div>
              <span className="badge">OK</span>
            </li>
            <li className="list-item">
              <div>
                <strong>Validar custos variaveis</strong>
                <p className="muted">Comparar com previsao do trimestre.</p>
              </div>
              <span className="badge">Hoje</span>
            </li>
            <li className="list-item">
              <div>
                <strong>Enviar DRE</strong>
                <p className="muted">Compartilhar com diretoria ate sexta.</p>
              </div>
              <span className="badge">Prioridade</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
