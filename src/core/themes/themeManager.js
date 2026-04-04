import { useState, useEffect } from 'react';

class ThemeManager {
  constructor() {
    this.themes = new Map();
    this.currentTheme = null;
    this.defaultTheme = 'default';

    // 🔥 sistema interno de eventos
    this.listeners = new Set();
  }

  /* ================= EVENTOS ================= */

  onChange(callback) {
    this.listeners.add(callback);

    return () => {
      this.listeners.delete(callback);
    };
  }

  emitChange(theme) {
    this.listeners.forEach(cb => cb(theme));
  }

  /* ================= REGISTRO ================= */

  registerTheme(name, themeConfig) {
    console.log(`🎨 Registrando tema: ${name}`);

    const colors = { ...this.getDefaultColors(), ...themeConfig.colors };

    // 🔥 gerar cores alpha automaticamente
    if (colors.primary) {
      const rgb = this.hexToRgb(colors.primary);
      if (rgb) {
        colors['primary-alpha-05'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`;
        colors['primary-alpha-09'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.09)`;
        colors['primary-alpha-10'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
        colors['primary-alpha-14'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.14)`;
        colors['primary-alpha-35'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`;
      }
    }

    if (colors.secondary) {
      const rgb = this.hexToRgb(colors.secondary);
      if (rgb) {
        colors['secondary-alpha-10'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
        colors['secondary-alpha-11'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.11)`;
        colors['secondary-alpha-16'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.16)`;
        colors['secondary-alpha-25'] ??= `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`;
      }
    }

    this.themes.set(name, {
      name,
      ...themeConfig,
      colors,
      fonts: { ...this.getDefaultFonts(), ...themeConfig.fonts },
      images: { ...(themeConfig.images || {}) },
      spacing: { ...this.getDefaultSpacing(), ...themeConfig.spacing }
    });
  }

  /* ================= APLICAÇÃO ================= */

  applyTheme(themeName) {
    const theme = this.themes.get(themeName);

    if (!theme) {
      console.warn(`Tema "${themeName}" não encontrado`);
      return this.applyTheme(this.defaultTheme);
    }

    if (this.currentTheme?.name === theme.name) return theme;

    console.log(`🎨 Aplicando tema: ${themeName}`);

    this.currentTheme = theme;

    this.applyCSSVariables(theme);
    this.applyBackgroundImages(theme);

    // 🔥 dispara evento interno
    this.emitChange(theme);

    return theme;
  }

  /* ================= CSS ================= */

  applyCSSVariables(theme) {
    const root = document.documentElement;

    const colorMap = {
      'bg': '--bg',
      'bg-secondary': '--bg-secondary',
      'bg-tertiary': '--bg-tertiary',
      'primary': '--accent',
      'secondary': '--accent-2',
      'text': '--text',
      'text-secondary': '--text-secondary',
      'text-muted': '--text-muted',
      'panel': '--panel',
      'panel-strong': '--panel-strong',
      'panel-hover': '--panel-hover',
      'border': '--border',
      'border-hover': '--border-hover'
    };

    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = colorMap[key] || `--color-${key}`;
      root.style.setProperty(cssVar, value);
    });

    if (theme.fonts) {
      Object.entries(theme.fonts).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--font-${key}`, value);
        }
      });
    }

    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
    }
  }

  applyBackgroundImages(theme) {
    const body = document.body;

    if (theme.images?.background) {
      body.style.backgroundImage = `url(${theme.images.background})`;
      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = 'center';
    } else {
      body.style.backgroundImage = '';
    }
  }

  /* ================= UTIL ================= */

  hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r
      ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }
      : null;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  getAvailableThemes() {
    return Array.from(this.themes.keys());
  }

  saveCurrentTheme() {
    if (this.currentTheme) {
      localStorage.setItem('gmf-theme', this.currentTheme.name);
    }
  }

  loadSavedTheme() {
    const saved = localStorage.getItem('gmf-theme');

    if (saved && this.themes.has(saved)) {
      return this.applyTheme(saved);
    }

    return this.applyTheme(this.defaultTheme);
  }

  getDefaultColors() {
    return {
      primary: '#10b981',
      secondary: '#22d3ee',
      bg: '#020617',
      text: '#e5e7eb',
      border: 'rgba(255,255,255,0.08)'
    };
  }

  getDefaultFonts() {
    return {
      family: 'system-ui'
    };
  }

  getDefaultSpacing() {
    return {
      md: '16px'
    };
  }
}

export const themeManager = new ThemeManager();