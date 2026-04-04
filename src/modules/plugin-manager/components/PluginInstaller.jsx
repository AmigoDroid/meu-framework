import { useState } from 'react';
import { pluginSystem } from '../../../core/plugin/pluginSystem';
import {
  notificationsPlugin,
  analyticsPlugin,
  themeSwitcherPlugin,
  auditPlugin,
  autoBackupPlugin
} from '../../../plugins/examples';

// Lista de plugins disponíveis
const availablePlugins = [
  {
    id: 'notifications',
    plugin: notificationsPlugin,
    description: 'Sistema de notificações em tempo real',
    features: ['Notificações', 'Alertas', 'Histórico']
  },
  {
    id: 'analytics',
    plugin: analyticsPlugin,
    description: 'Dashboard avançado de analytics',
    features: ['Relatórios', 'Gráficos', 'Exportação']
  },
  {
    id: 'theme-switcher',
    plugin: themeSwitcherPlugin,
    description: 'Alternar temas da aplicação',
    features: ['Temas', 'Personalização', 'Salvamento']
  },
  {
    id: 'audit',
    plugin: auditPlugin,
    description: 'Auditoria e registro de ações',
    features: ['Logs', 'Rastreamento', 'Relatórios']
  },
  {
    id: 'backup',
    plugin: autoBackupPlugin,
    description: 'Backups automáticos de dados',
    features: ['Backup automático', 'Agendamento', 'Restauração']
  }
];

export default function PluginInstaller({ onPluginInstalled }) {
  const [selectedPlugins, setSelectedPlugins] = useState([]);
  const [installing, setInstalling] = useState(false);
  const [message, setMessage] = useState('');

  const togglePlugin = (id) => {
    setSelectedPlugins(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleInstall = async () => {
    if (selectedPlugins.length === 0) {
      setMessage('⚠️ Selecione pelo menos um plugin');
      return;
    }

    setInstalling(true);
    setMessage('');

    try {
      for (const id of selectedPlugins) {
        console.log('Installing plugin by id:', id);
        pluginSystem.installPluginById(id);
      }

      setMessage(`✅ ${selectedPlugins.length} plugin(s) instalado(s) com sucesso!`);
      setSelectedPlugins([]);

      // Recarregar página para aplicar mudanças
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage(`❌ Erro ao instalar: ${error.message}`);
    } finally {
      setInstalling(false);
    }
  };

  return (
    <section className="plugin-installer card">
      <div className="installer-header">
        <h3>Instalar Plugins</h3>
        <p>Selecione os plugins que deseja instalar</p>
      </div>

      <div className="plugins-available">
        {availablePlugins.map(({ id, plugin, description, features }) => (
          <div key={id} className="plugin-option">
            <input
              type="checkbox"
              id={`plugin-${id}`}
              checked={selectedPlugins.includes(id)}
              onChange={() => togglePlugin(id)}
            />
            <label htmlFor={`plugin-${id}`}>
              <div className="option-content">
                <strong>{plugin.name}</strong>
                <p className="option-description">{description}</p>
                <div className="features">
                  {features.map((feature, i) => (
                    <span key={i} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'warning'}`}>
          {message}
        </div>
      )}

      <div className="installer-actions">
        <button
          className="btn primary"
          onClick={handleInstall}
          disabled={installing || selectedPlugins.length === 0}
        >
          {installing ? '⏳ Instalando...' : `Instalar ${selectedPlugins.length} Plugin(s)`}
        </button>
      </div>
    </section>
  );
}
