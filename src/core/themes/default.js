// Tema padrão do framework
export default {
  name: 'default',
  displayName: 'GMF Padrão',
  description: 'Tema padrão do GMF Framework',

  colors: {
    primary: '#10b981',
    secondary: '#22d3ee',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    bg: '#020617',
    'bg-secondary': '#0f172a',
    'bg-tertiary': '#1e293b',

    panel: 'rgba(255, 255, 255, 0.04)',
    'panel-strong': 'rgba(255, 255, 255, 0.08)',
    'panel-hover': 'rgba(255, 255, 255, 0.06)',

    text: '#e5e7eb',
    'text-secondary': '#9ca3af',
    'text-muted': '#6b7280',

    border: 'rgba(255, 255, 255, 0.08)',
    'border-hover': 'rgba(255, 255, 255, 0.12)',

    shadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
    'shadow-hover': '0 25px 80px rgba(0, 0, 0, 0.45)'
  },

  fonts: {
    family: '"Space Grotesk", "Manrope", system-ui, -apple-system, sans-serif',
    'family-heading': '"Space Grotesk", system-ui, -apple-system, sans-serif',
    'family-body': '"Manrope", system-ui, -apple-system, sans-serif'
  },

  images: {
    logo: {
      type: 'emoji',
      content: 'GM'
    }
  }
};