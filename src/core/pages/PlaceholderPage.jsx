import "./PlaceholderPage.css";

export default function PlaceholderPage({ title, description, icon }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-head">
        <div className="placeholder-icon">{icon || "📁"}</div>
        <div>
          <p className="eyebrow">Página de módulo</p>
          <h1>{title}</h1>
          <p>{description || "Conteúdo em desenvolvimento. Esta página foi criada para manter a navegação fiel ao menu."}</p>
        </div>
      </div>

      <div className="placeholder-body">
        <div className="placeholder-card">
          <strong>Status</strong>
          <p>Conteúdo em construção para este módulo.</p>
        </div>
        <div className="placeholder-card">
          <strong>Rota</strong>
          <p>Esta rota foi adicionada ao sistema para manter o menu completo.</p>
        </div>
      </div>
    </div>
  );
}
