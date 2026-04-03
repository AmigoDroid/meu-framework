// src/core/themes/themeManager.js
import { useState, useEffect } from 'react';

class ThemeManager {
  constructor() {
    this.themes = new Map();
    this.currentTheme = null;
    this.defaultTheme = 'default';
  }

  // Registrar um tema
  registerTheme(name, themeConfig) {
    console.log(`🎨 Registrando tema: ${name}`);
    
    const colors = { ...this.getDefaultColors(), ...themeConfig.colors };
    
    // Gerar cores derivadas automaticamente a partir das cores primárias
    // Se o tema define 'primary', calcular as variações alpha
    if (colors.primary) {
      const rgbPrimary = this.hexToRgb(colors.primary);
      if (rgbPrimary) {
        colors['primary-alpha-05'] = colors['primary-alpha-05'] || `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.05)`;
        colors['primary-alpha-09'] = colors['primary-alpha-09'] || `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.09)`;
        colors['primary-alpha-10'] = colors['primary-alpha-10'] || `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.1)`;
        colors['primary-alpha-14'] = colors['primary-alpha-14'] || `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.14)`;
        colors['primary-alpha-35'] = colors['primary-alpha-35'] || `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.35)`;
      }
    }
    
    // Se o tema define 'secondary', calcular as variações alpha
    if (colors.secondary) {
      const rgbSecondary = this.hexToRgb(colors.secondary);
      if (rgbSecondary) {
        colors['secondary-alpha-10'] = colors['secondary-alpha-10'] || `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.1)`;
        colors['secondary-alpha-11'] = colors['secondary-alpha-11'] || `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.11)`;
        colors['secondary-alpha-16'] = colors['secondary-alpha-16'] || `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.16)`;
        colors['secondary-alpha-25'] = colors['secondary-alpha-25'] || `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.25)`;
      }
    }
    
    this.themes.set(name, {
      name,
      ...themeConfig,
      colors,
      fonts: { ...this.getDefaultFonts(), ...themeConfig.fonts },
      images: { ...themeConfig.images || {} },
      spacing: { ...this.getDefaultSpacing(), ...themeConfig.spacing }
    });
  }

  // Converter cor hex para RGB
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Aplicar um tema
  applyTheme(themeName) {
    const theme = this.themes.get(themeName);
    if (!theme) {
      console.warn(`Tema "${themeName}" não encontrado. Usando tema padrão.`);
      return this.applyTheme(this.defaultTheme);
    }

    console.log(`🎨 Aplicando tema: ${themeName}`);
    this.currentTheme = theme;

    // Aplicar variáveis CSS
    this.applyCSSVariables(theme);

    // Aplicar imagens de fundo
    this.applyBackgroundImages(theme);

    // Disparar evento de mudança de tema
    window.dispatchEvent(new CustomEvent('theme:changed', {
      detail: { themeName, theme }
    }));

    return theme;
  }

  // Aplicar variáveis CSS do tema
  applyCSSVariables(theme) {
    const root = document.documentElement;

    // Cores - mapeamento para as variáveis CSS esperadas
    const colorMap = {
      'bg': '--bg',
      'bg-secondary': '--bg-secondary',
      'bg-tertiary': '--bg-tertiary',
      'primary': '--accent',
      'secondary': '--accent-2',
      'text': '--text',
      'text-secondary': '--text-secondary',
      'text-muted': '--text-muted',
      'muted': '--muted',
      'panel': '--panel',
      'panel-strong': '--panel-strong',
      'panel-hover': '--panel-hover',
      'border': '--border',
      'border-hover': '--border-hover',
      'shadow': '--shadow',
      'shadow-hover': '--shadow-hover',
      // Cores derivadas e variações
      'primary-alpha-05': '--primary-alpha-05',
      'primary-alpha-09': '--primary-alpha-09',
      'primary-alpha-10': '--primary-alpha-10',
      'primary-alpha-14': '--primary-alpha-14',
      'primary-alpha-35': '--primary-alpha-35',
      'secondary-alpha-10': '--secondary-alpha-10',
      'secondary-alpha-11': '--secondary-alpha-11',
      'secondary-alpha-16': '--secondary-alpha-16',
      'secondary-alpha-25': '--secondary-alpha-25',
      'sidebar-dark-1': '--sidebar-dark-1',
      'sidebar-dark-2': '--sidebar-dark-2',
      'text-bright': '--text-bright',
      'accent-bright': '--accent-bright',
      'dark-text': '--dark-text'
    };

    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = colorMap[key] || `--color-${key}`;
      root.style.setProperty(cssVar, value);
    });

    // Fontes
    if (theme.fonts) {
      Object.entries(theme.fonts).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--font-${key}`, value);
        }
      });
    }

    // Espaçamento
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
    }
  }

  // Aplicar imagens de fundo
  applyBackgroundImages(theme) {
    const body = document.body;

    if (theme.images?.background) {
      body.style.backgroundImage = `url(${theme.images.background})`;
      body.style.backgroundSize = theme.images.backgroundSize || 'cover';
      body.style.backgroundPosition = theme.images.backgroundPosition || 'center';
      body.style.backgroundRepeat = theme.images.backgroundRepeat || 'no-repeat';
      body.style.backgroundAttachment = theme.images.backgroundAttachment || 'fixed';
    } else {
      // Reset para padrão
      body.style.backgroundImage = '';
    }

    if (theme.images?.logo) {
      // Atualizar logo se existir
      const logoElements = document.querySelectorAll('.logo-badge');
      logoElements.forEach(el => {
        if (theme.images.logo.type === 'emoji') {
          el.textContent = theme.images.logo.content;
        } else if (theme.images.logo.type === 'image') {
          el.style.backgroundImage = `url(${theme.images.logo.content})`;
          el.style.backgroundSize = 'contain';
          el.textContent = '';
        }
      });
    }
  }

  // Obter tema atual
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Listar temas disponíveis
  getAvailableThemes() {
    return Array.from(this.themes.keys());
  }

  // Obter configuração de um tema
  getTheme(name) {
    return this.themes.get(name);
  }

  // Cores padrão
  getDefaultColors() {
    return {
      primary: '#10b981',
      secondary: '#22d3ee',
      accent: '#f59e0b',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',

      // Backgrounds
      bg: '#020617',
      'bg-secondary': '#0f172a',
      'bg-tertiary': '#1e293b',

      // Panels
      panel: 'rgba(255, 255, 255, 0.04)',
      'panel-strong': 'rgba(255, 255, 255, 0.08)',
      'panel-hover': 'rgba(255, 255, 255, 0.06)',

      // Text
      text: '#e5e7eb',
      'text-secondary': '#9ca3af',
      'text-muted': '#6b7280',
      muted: '#9ca3af',

      // Borders
      border: 'rgba(255, 255, 255, 0.08)',
      'border-hover': 'rgba(255, 255, 255, 0.12)',

      // Shadows
      shadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
      'shadow-hover': '0 25px 80px rgba(0, 0, 0, 0.45)',

      // Gradientes e variações - derivadas da cor primária (#10b981)
      'primary-alpha-05': 'rgba(16, 185, 129, 0.05)',
      'primary-alpha-09': 'rgba(16, 185, 129, 0.09)',
      'primary-alpha-10': 'rgba(16, 185, 129, 0.1)',
      'primary-alpha-14': 'rgba(16, 185, 129, 0.14)',
      'primary-alpha-35': 'rgba(16, 185, 129, 0.35)',
      
      // Gradientes e variações - derivadas da cor secundária (#22d3ee)
      'secondary-alpha-10': 'rgba(34, 211, 238, 0.1)',
      'secondary-alpha-11': 'rgba(34, 211, 238, 0.11)',
      'secondary-alpha-16': 'rgba(34, 211, 238, 0.16)',
      'secondary-alpha-25': 'rgba(34, 211, 238, 0.25)',
      
      // Cores da sidebar
      'sidebar-dark-1': 'rgba(10, 12, 26, 0.85)',
      'sidebar-dark-2': 'rgba(7, 10, 21, 0.92)',
      
      // Outras variações
      'text-bright': '#eafff6',
      'accent-bright': '#b0f4ff',
      'dark-text': '#02111a'
    };
  }

  // Fontes padrão
  getDefaultFonts() {
    return {
      family: '"Space Grotesk", "Manrope", system-ui, -apple-system, sans-serif',
      'family-heading': '"Space Grotesk", system-ui, -apple-system, sans-serif',
      'family-body': '"Manrope", system-ui, -apple-system, sans-serif',

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
    };
  }

  // Espaçamento padrão
  getDefaultSpacing() {
    return {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px'
    };
  }

  // Salvar tema atual no localStorage
  saveCurrentTheme() {
    if (this.currentTheme) {
      localStorage.setItem('gmf-theme', this.currentTheme.name);
    }
  }

  // Carregar tema salvo do localStorage
  loadSavedTheme() {
    const savedTheme = localStorage.getItem('gmf-theme');
    if (savedTheme && this.themes.has(savedTheme)) {
      return this.applyTheme(savedTheme);
    }
    return this.applyTheme(this.defaultTheme);
  }
}

// Instância global do gerenciador de temas
export const themeManager = new ThemeManager();

// Hook para usar temas em componentes React
export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(themeManager.getCurrentTheme());

  useEffect(() => {
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
    };

    window.addEventListener('theme:changed', handleThemeChange);
    return () => window.removeEventListener('theme:changed', handleThemeChange);
  }, []);

  return {
    currentTheme,
    applyTheme: (themeName) => themeManager.applyTheme(themeName),
    getAvailableThemes: () => themeManager.getAvailableThemes(),
    registerTheme: (name, config) => themeManager.registerTheme(name, config)
  };
}

// Funções de conveniência
export function registerTheme(name, config) {
  return themeManager.registerTheme(name, config);
}

export function applyTheme(name) {
  return themeManager.applyTheme(name);
}

export function getCurrentTheme() {
  return themeManager.getCurrentTheme();
}

export function getAvailableThemes() {
  return themeManager.getAvailableThemes();
}