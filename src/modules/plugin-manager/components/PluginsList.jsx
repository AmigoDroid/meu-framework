import PluginCard from './PluginCard';

export default function PluginsList({ plugins, onUninstall }) {
  if (plugins.length === 0) {
    return (
      <section className="plugins-section">
        <h2>Plugins Instalados</h2>
        <div className="empty-state">
          <span className="empty-icon">🔌</span>
          <p>Nenhum plugin instalado</p>
          <small>Clique em "Instalar Plugin" para adicionar plugins</small>
        </div>
      </section>
    );
  }

  return (
    <section className="plugins-section">
      <h2>Plugins Instalados ({plugins.length})</h2>
      <div className="plugins-grid">
        {plugins.map((plugin) => (
          <PluginCard 
            key={plugin.name}
            plugin={plugin}
            onUninstall={() => onUninstall(plugin.name)}
          />
        ))}
      </div>
    </section>
  );
}
