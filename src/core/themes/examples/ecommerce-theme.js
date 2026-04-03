// Exemplo: Tema personalizado para uma empresa de e-commerce
// Salve este arquivo como: themes/ecommerce-theme.js

export default {
  name: 'ecommerce-vitrine',
  displayName: 'E-commerce Vitrine',
  description: 'Tema vibrante para loja online',

  colors: {
    // Paleta de cores da marca
    primary: '#ff6b6b',        // Vermelho coral (cor principal da marca)
    secondary: '#4ecdc4',      // Verde menta (cor secundária)
    accent: '#ffe66d',         // Amarelo claro (destaque)

    // Estados padrão
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Backgrounds com tons quentes
    bg: '#fef7f0',             // Fundo creme claro
    'bg-secondary': '#fff8f2', // Fundo creme mais claro
    'bg-tertiary': '#ffedd5',  // Fundo laranja muito claro

    // Painéis com transparência
    panel: 'rgba(255, 255, 255, 0.9)',
    'panel-strong': 'rgba(255, 255, 255, 0.95)',
    'panel-hover': 'rgba(255, 255, 255, 0.98)',

    // Textos em tons escuros para contraste
    text: '#1f2937',           // Cinza escuro
    'text-secondary': '#4b5563', // Cinza médio
    'text-muted': '#6b7280',   // Cinza claro

    // Bordas suaves
    border: 'rgba(255, 107, 107, 0.2)',
    'border-hover': 'rgba(255, 107, 107, 0.3)',

    // Sombras coloridas
    shadow: '0 20px 60px rgba(255, 107, 107, 0.15)',
    'shadow-hover': '0 25px 80px rgba(255, 107, 107, 0.2)'
  },

  fonts: {
    // Fontes modernas e legíveis
    family: '"Poppins", "SF Pro Text", system-ui, -apple-system, sans-serif',
    'family-heading': '"Poppins", system-ui, -apple-system, sans-serif',
    'family-body': '"Poppins", system-ui, -apple-system, sans-serif',

    size: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    },

    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },

  spacing: {
    // Espaçamentos generosos para layout arejado
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  },

  images: {
    // Logo da empresa
    logo: {
      type: 'emoji',
      content: '🛍️'  // Ou use 'image' com URL
    },

    // Imagem de fundo sutil
    background: '/images/ecommerce-bg.jpg',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }
};

// Como usar este tema:
//
// 1. Salve este arquivo em: src/themes/ecommerce-theme.js
//
// 2. Importe no seu módulo:
//    import ecommerceTheme from "../../themes/ecommerce-theme.js";
//
// 3. Registre no onLoad do módulo:
//    onLoad: () => {
//      if (window.gmfThemeManager) {
//        window.gmfThemeManager.registerTheme(ecommerceTheme.name, ecommerceTheme);
//      }
//    }
//
// 4. Acesse /themes no sistema para aplicar o tema
//
// 5. Ou aplique programaticamente:
//    framework.applyTheme('ecommerce-vitrine');