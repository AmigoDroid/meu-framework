// Tema para empresas financeiras
export default {
  name: 'finance-pro',
  displayName: 'Finance Pro',
  description: 'Tema profissional para instituições financeiras',

  colors: {
    primary: '#059669', // Emerald
    secondary: '#0d9488', // Teal
    accent: '#f59e0b', // Amber
    success: '#10b981',
    warning: '#f59e0b',
    error: '#dc2626',
    info: '#2563eb',

    bg: '#0a0a0a', // Pure black
    'bg-secondary': '#111111',
    'bg-tertiary': '#1a1a1a',

    panel: 'rgba(255, 255, 255, 0.03)',
    'panel-strong': 'rgba(255, 255, 255, 0.06)',
    'panel-hover': 'rgba(255, 255, 255, 0.05)',

    text: '#f5f5f5',
    'text-secondary': '#e5e5e5',
    'text-muted': '#a3a3a3',

    border: 'rgba(255, 255, 255, 0.06)',
    'border-hover': 'rgba(255, 255, 255, 0.1)',

    shadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
    'shadow-hover': '0 25px 80px rgba(0, 0, 0, 0.7)'
  },

  fonts: {
    family: '"Geist", "SF Pro Text", system-ui, -apple-system, sans-serif',
    'family-heading': '"Geist", system-ui, -apple-system, sans-serif',
    'family-body': '"Geist", system-ui, -apple-system, sans-serif'
  },

  images: {
    logo: {
      type: 'emoji',
      content: '💰'
    }
  }
};