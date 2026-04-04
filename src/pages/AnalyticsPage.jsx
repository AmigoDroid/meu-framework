import "../core/pages/PlaceholderPage.css";

export default function AnalyticsPage() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-head">
        <div className="placeholder-icon">📈</div>
        <div>
          <p className="eyebrow">Plugin de Analytics</p>
          <h1>Analytics</h1>
          <p>Dashboard avançado de analytics do framework.</p>
        </div>
      </div>

      <div className="placeholder-body">
        <div className="placeholder-card">
          <strong>Status</strong>
          <p>Plugin instalado. Aqui você veria gráficos e relatórios.</p>
        </div>
        <div className="placeholder-card">
          <strong>Funcionalidades</strong>
          <p>Relatórios, gráficos, exportação de dados.</p>
        </div>
      </div>
    </div>
  );
}