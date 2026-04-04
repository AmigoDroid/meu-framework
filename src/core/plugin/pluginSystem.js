/**
 * Sistema de Plugins do Framework
 * Permite adicionar funcionalidades sem modificar o código-fonte principal
 */

class PluginSystem {
  constructor() {
    this.routes = [];
    this.menus = [];
    this.plugins = [];
    this.availablePlugins = new Map();
    this.installedPluginIds = JSON.parse(localStorage.getItem('gmf-installed-plugins') || '[]');
    this.hooks = {
      beforeInstall: [],
      afterInstall: [],
      beforeUninstall: [],
      afterUninstall: []
    };

    console.log('PluginSystem initialized, installed:', this.installedPluginIds);
  }

  /**
   * Registra um plugin disponível para instalação
   */
  registerPlugin(id, plugin) {
    this.availablePlugins.set(id, plugin);
    console.log('Plugin registrado:', id);

    if (this.installedPluginIds.includes(id) && !this.plugins.some(p => p.id === id)) {
      console.log(`Reinstalando plugin registrado: ${id}`);
      try {
        this._installPlugin(plugin, id, false);
      } catch (error) {
        console.error(`Erro ao reinstalar plugin ${id}:`, error);
      }
    }
  }

  /**
   * Instala um plugin registrado por id
   */
  installPluginById(id) {
    const plugin = this.availablePlugins.get(id);
    if (!plugin) {
      throw new Error(`Plugin ${id} não está registrado para instalação`);
    }
    this.use(plugin, id);
  }

  /**
   * Verifica se o plugin está instalado
   */
  isInstalled(id) {
    return this.installedPluginIds.includes(id);
  }

  /**
   * Salva lista de plugins instalados
   */
  _saveInstalled() {
    localStorage.setItem('gmf-installed-plugins', JSON.stringify(this.installedPluginIds));
    console.log('Saving installed plugins:', this.installedPluginIds);
  }

  /**
   * Registra um novo plugin
   * @param {Object} plugin - Plugin com método install(app)
   * @param {string} id - ID único do plugin
   */
  use(plugin, id) {
    if (!plugin || typeof plugin.install !== 'function') {
      throw new Error(`Plugin inválido: ${plugin?.name || 'anônimo'}. Deve ter método install(app)`);
    }

    if (!id) {
      id = plugin.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'plugin';
    }

    // Verificar se já está instalado
    if (this.installedPluginIds.includes(id)) {
      console.log(`Plugin ${id} já está instalado`);
      return;
    }

    // Executar hook antes da instalação
    this._executeHook('beforeInstall', plugin);

    try {
      this._installPlugin(plugin, id, true);
      this._executeHook('afterInstall', plugin);
    } catch (error) {
      console.error(`❌ Erro ao instalar plugin ${plugin.name}:`, error);
      throw error;
    }
  }

  _installPlugin(plugin, id, save = true) {
    plugin.install(this);

    this.plugins.push({
      name: plugin.name || 'anônimo',
      version: plugin.version || '1.0.0',
      instance: plugin,
      installedAt: new Date().toISOString(),
      id
    });

    if (save && !this.installedPluginIds.includes(id)) {
      this.installedPluginIds.push(id);
      this._saveInstalled();
    }

    console.log(`✅ Plugin instalado: ${plugin.name || 'anônimo'} v${plugin.version || '1.0.0'}`);
  }

  /**
   * Adiciona rota ao sistema
   * @param {Object} route - Configuração da rota
   */
  addRoutes(route) {
    if (!route.path || !route.element) {
      throw new Error('Rota deve ter path e element');
    }
    this.routes.push(route);
    console.log(`📍 Rota adicionada: ${route.path}`);
  }

  /**
   * Adiciona item de menu
   * @param {Object} menu - Configuração do menu
   */
  addMenu(menu) {
    if (!menu.label || !menu.path) {
      throw new Error('Menu deve ter label e path');
    }
    this.menus.push(menu);
    console.log(`📋 Menu adicionado: ${menu.label}`);
  }

  /**
   * Retorna todas as rotas (módulos + plugins)
   */
  getRoutes() {
    return this.routes;
  }

  /**
   * Retorna todos os menus (módulos + plugins)
   */
  getMenus() {
    return this.menus;
  }

  /**
   * Retorna lista de plugins instalados
   */
  getInstalledPlugins() {
    return this.plugins;
  }

  /**
   * Registra um hook customizado
   */
  on(hookName, callback) {
    if (!this.hooks[hookName]) {
      this.hooks[hookName] = [];
    }
    this.hooks[hookName].push(callback);
  }

  /**
   * Executa hooks registrados
   */
  _executeHook(hookName, data) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Erro ao executar hook ${hookName}:`, error);
        }
      });
    }
  }

  /**
   * Desinstala um plugin
   */
  uninstall(pluginName) {
    const index = this.plugins.findIndex(p => p.name === pluginName);
    if (index === -1) {
      throw new Error(`Plugin "${pluginName}" não encontrado`);
    }

    const plugin = this.plugins[index];
    this._executeHook('beforeUninstall', plugin);
    
    // Remover da lista
    this.plugins.splice(index, 1);
    
    // Remover do localStorage
    const idIndex = this.installedPluginIds.indexOf(plugin.id);
    if (idIndex > -1) {
      this.installedPluginIds.splice(idIndex, 1);
      this._saveInstalled();
    }
    
    console.log(`🗑️ Plugin desinstalado: ${pluginName}`);
    this._executeHook('afterUninstall', { name: pluginName });
  }
}

// Instância global do sistema de plugins
export const pluginSystem = new PluginSystem();

// Factory function alternativa
export function createApp() {
  return pluginSystem;
}