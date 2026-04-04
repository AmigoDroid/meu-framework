import "../core/pages/PlaceholderPage.css";

export default function NotificationsPage() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-head">
        <div className="placeholder-icon">🔔</div>
        <div>
          <p className="eyebrow">Plugin de Notificações</p>
          <h1>Notificações</h1>
          <p>Sistema de notificações em tempo real do framework.</p>
        </div>
      </div>

      <div className="placeholder-body">
        <div className="placeholder-card">
          <strong>Status</strong>
          <p>Plugin instalado e funcionando. Aqui você veria suas notificações.</p>
        </div>
        <div className="placeholder-card">
          <strong>Funcionalidades</strong>
          <p>Notificações em tempo real, alertas, histórico.</p>
        </div>
      </div>
    </div>
  );
}