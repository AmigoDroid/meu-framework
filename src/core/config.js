// src/core/config.js
export const defaultConfig = {
  name: 'GMF ',
  version: '2.3.1',
  description: 'Sistema FTTH para gerenciamento de rede.',
  theme: {
    primary: '#10b981',
    secondary: '#22d3ee',
    dark: '#020617',
    panel: 'rgba(255, 255, 255, 0.04)'
  },
  auth: {
    tokenKey: 'token',
    loginRoute: '/login',
    homeRoute: '/'
  },
  modules: {
    autoLoad: true, //carrega automaticamente os módulos encontrados na pasta src/modules
    hotReload: false //recarrega os módulos automaticamente ao detectar mudanças (recomendo deixar false durante o desenvolvimento para evitar recarregamentos excessivos)
  },
  security: {
    enablePermissions: false,//deixe true para ativar o sistema de permissões baseado em rotas
    enableRoles: false //deixe true para ativar o sistema de controle de acesso baseado em papéis (roles)
  }
};

let currentConfig = { ...defaultConfig };

export function getConfig() {
  return { ...currentConfig };
}

export function setConfig(newConfig) {
  currentConfig = { ...defaultConfig, ...newConfig };
  return currentConfig;
}

export function mergeConfig(partialConfig) {
  currentConfig = { ...currentConfig, ...partialConfig };
  return currentConfig;
}