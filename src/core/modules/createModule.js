export function createModule(config) {
  // Validação básica da configuração
  if (!config.name) {
    throw new Error('Module must have a name');
  }

  if (!config.routes || !Array.isArray(config.routes)) {
    throw new Error('Module must have routes array');
  }

  // Estrutura padrão do módulo
  return {
    name: config.name,
    version: config.version || '1.0.0',
    description: config.description || '',
    author: config.author || '',
    routes: config.routes,
    menu: config.menu || null,
    permissions: config.permissions || [],
    dependencies: config.dependencies || [],
    // Lifecycle hooks
    onLoad: config.onLoad || (() => {}),
    onUnload: config.onUnload || (() => {}),
    // Metadata
    enabled: config.enabled !== false,
    ...config
  };
} 