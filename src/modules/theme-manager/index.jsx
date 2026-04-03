// src/modules/theme-manager/index.jsx
import { createModule } from "../../core/modules/createModule";
import ThemeManagerPage from "./ThemeManagerPage";

export default createModule({
  name: "Theme Manager",
  version: "1.0.0",
  description: "Gerenciador de temas do framework",

  menu: {
    label: "Temas",
    path: "/themes",
    icon: "🎨",
    order: 99 // Último item do menu
  },

  routes: [
    {
      path: "/themes",
      element: <ThemeManagerPage />
    }
  ],

  // Este módulo instala um tema customizado quando carregado
  onLoad: () => {
    console.log("🎨 Theme Manager: Instalando tema customizado...");

    // Exemplo de como instalar um tema customizado
    const customTheme = {
      name: 'cliente-xyz',
      displayName: 'Cliente XYZ',
      description: 'Tema personalizado para o Cliente XYZ',

      colors: {
        primary: '#8b5cf6', // Roxo personalizado
        secondary: '#06b6d4', // Ciano
        accent: '#f59e0b', // Âmbar
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',

        bg: '#0a0a0a',
        'bg-secondary': '#1a1a1a',
        'bg-tertiary': '#2a2a2a',

        panel: 'rgba(139, 92, 246, 0.08)',
        'panel-strong': 'rgba(139, 92, 246, 0.15)',
        'panel-hover': 'rgba(139, 92, 246, 0.12)',

        text: '#f0f0f0',
        'text-secondary': '#e0e0e0',
        'text-muted': '#a0a0a0',

        border: 'rgba(139, 92, 246, 0.2)',
        'border-hover': 'rgba(139, 92, 246, 0.3)',

        shadow: '0 20px 60px rgba(139, 92, 246, 0.15)',
        'shadow-hover': '0 25px 80px rgba(139, 92, 246, 0.2)'
      },

      fonts: {
        family: '"Inter", system-ui, -apple-system, sans-serif',
        'family-heading': '"Inter", system-ui, -apple-system, sans-serif',
        'family-body': '"Inter", system-ui, -apple-system, sans-serif'
      },

      images: {
        logo: {
          type: 'emoji',
          content: '🏢'
        },
        background: '/images/cliente-xyz-bg.jpg', // Caminho para imagem customizada
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }
    };

    // Registrar o tema customizado
    if (typeof window !== 'undefined' && window.gmfThemeManager) {
      window.gmfThemeManager.registerTheme(customTheme.name, customTheme);
      console.log("🎨 Tema 'cliente-xyz' instalado com sucesso!");
    }
  },

  onUnload: () => {
    console.log("🎨 Theme Manager: Removendo tema customizado...");
    // Aqui você poderia remover o tema se necessário
  }
});