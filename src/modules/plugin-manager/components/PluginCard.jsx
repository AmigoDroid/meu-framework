export default function PluginCard({ plugin, onUninstall }) {
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="plugin-card">
      <div className="plugin-card-header">
        <div>
          <h3 className="plugin-name">{plugin.name}</h3>
          <p className="plugin-version">v{plugin.version}</p>
        </div>
        <button
          className="btn danger small"
          onClick={onUninstall}
          title="Desinstalar plugin"
        >
          🗑️
        </button>
      </div>

      <div className="plugin-card-body">
        <div className="plugin-info">
          <span className="info-label">Instalado em:</span>
          <span className="info-value">{formatDate(plugin.installedAt)}</span>
        </div>
      </div>

      <div className="plugin-card-footer">
        <span className="status-badge active">✓ Ativo</span>
      </div>
    </div>
  );
}
