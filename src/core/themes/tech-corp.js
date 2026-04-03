// Tema para empresas de tecnologia
export default {
  name: 'tech-corp',
  displayName: 'Tech Corp',
  description: 'Tema moderno para empresas de tecnologia',

  colors: {
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Violet
    accent: '#06b6d4', // Cyan
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    bg: '#0f0f23', // Dark blue-black
    'bg-secondary': '#1a1a2e',
    'bg-tertiary': '#16213e',

    panel: 'rgba(255, 255, 255, 0.05)',
    'panel-strong': 'rgba(255, 255, 255, 0.1)',
    'panel-hover': 'rgba(255, 255, 255, 0.08)',

    text: '#e2e8f0',
    'text-secondary': '#cbd5e1',
    'text-muted': '#94a3b8',

    border: 'rgba(255, 255, 255, 0.1)',
    'border-hover': 'rgba(255, 255, 255, 0.15)',

    shadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    'shadow-hover': '0 25px 80px rgba(0, 0, 0, 0.6)'
  },

  fonts: {
    family: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    'family-heading': '"Inter", system-ui, -apple-system, sans-serif',
    'family-body': '"Inter", system-ui, -apple-system, sans-serif'
  },

  images: {
    logo: {
      type: 'emoji',
      content: '🚀'
    }
  }
};