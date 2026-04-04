import { useState, useEffect } from 'react';
import { pluginSystem } from '../../core/plugin/pluginSystem';
import PluginsList from './components/PluginsList';
import PluginInstaller from './components/PluginInstaller';
import './PluginManagerPage.css';

export default function PluginManagerPage() {
  const [installedPlugins, setInstalledPlugins] = useState([]);
  const [showInstaller, setShowInstaller] = useState(false);

  // Atualizar lista de plugins instalados
  const refreshPlugins = () => {
    setInstalledPlugins(pluginSystem.getInstalledPlugins());
  };

  useEffect(() => {
    refreshPlugins();
  }, []);

  const handlePluginInstalled = () => {
    refreshPlugins();
    setShowInstaller(false);
  };

  const handleUninstall = (pluginName) => {
    try {
      pluginSystem.uninstall(pluginName);
      refreshPlugins();
    } catch (error) {
      console.error('Erro ao desinstalar plugin:', error);
    }
  };

  return (
    <div className="plugin-manager-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Configuração</p>
          <h1 className="page-title">Gerenciador de Plugins</h1>
          <p className="page-lead">Instale, gerencie e controle plugins do framework</p>
        </div>
      </div>

      <div className="plugin-manager-content">
        {/* Resumo */}
        <section className="plugin-stats">
          <div className="stat-card">
            <span className="stat-icon">🔌</span>
            <div>
              <p className="stat-label">Plugins Instalados</p>
              <strong className="stat-value">{installedPlugins.length}</strong>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📍</span>
            <div>
              <p className="stat-label">Rotas Adicionadas</p>
              <strong className="stat-value">{pluginSystem.getRoutes().length}</strong>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📋</span>
            <div>
              <p className="stat-label">Menus Adicionados</p>
              <strong className="stat-value">{pluginSystem.getMenus().length}</strong>
            </div>
          </div>
        </section>

        {/* Botão de Instalação */}
        <div className="plugin-actions">
          <button 
            className="btn primary" 
            onClick={() => setShowInstaller(!showInstaller)}
          >
            {showInstaller ? '✕ Cancelar' : '+ Instalar Plugin'}
          </button>
        </div>

        {/* Formulário de Instalação */}
        {showInstaller && (
          <PluginInstaller onPluginInstalled={handlePluginInstalled} />
        )}

        {/* Lista de Plugins */}
        <PluginsList 
          plugins={installedPlugins}
          onUninstall={handleUninstall}
        />
      </div>
    </div>
  );
}
