// src/core/config.js
export const defaultConfig = {
  name: 'GMF - GEO',
  version: '1.0.0',
  description: 'Um framework React personalizado.',
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
    autoLoad: true,
    hotReload: false
  },
  security: {
    enablePermissions: true,
    enableRoles: true
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