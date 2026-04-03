import { createContext, useEffect } from "react";
import { getConfig } from "./config";
import { themeManager, registerTheme } from "./themes/themeManager";

// Importar temas padrão
import defaultTheme from "./themes/default.js";
import techCorpTheme from "./themes/tech-corp.js";
import financeProTheme from "./themes/finance-pro.js";
import creativeStudioTheme from "./themes/creative-studio.js";

export const FrameworkContext = createContext();

export function FrameworkProvider({ children, config = {} }) {
  // Mesclar configuração padrão com configuração passada
  const frameworkConfig = { ...getConfig(), ...config };

  // Inicializar temas
  useEffect(() => {
    // Registrar temas padrão
    registerTheme(defaultTheme.name, defaultTheme);
    registerTheme(techCorpTheme.name, techCorpTheme);
    registerTheme(financeProTheme.name, financeProTheme);
    registerTheme(creativeStudioTheme.name, creativeStudioTheme);

    // Carregar e registrar temas customizados do localStorage
    try {
      const customThemes = JSON.parse(localStorage.getItem('gmf-custom-themes') || '{}');
      Object.entries(customThemes).forEach(([name, themeConfig]) => {
        registerTheme(name, themeConfig);
        console.log(`🎨 Tema customizado carregado: ${name}`);
      });
    } catch (error) {
      console.warn('Erro ao carregar temas customizados:', error);
    }

    // Aplicar tema salvo ou padrão
    themeManager.loadSavedTheme();

    // Salvar tema quando mudar
    const handleThemeChange = () => {
      themeManager.saveCurrentTheme();
    };

    window.addEventListener('theme:changed', handleThemeChange);
    return () => window.removeEventListener('theme:changed', handleThemeChange);
  }, []);

  const value = {
    ...frameworkConfig,
    // Métodos utilitários
    getVersion: () => frameworkConfig.version,
    getName: () => frameworkConfig.name,
    isDevelopment: () => import.meta.env.DEV,
    // Sistema de temas
    themeManager,
    applyTheme: (themeName) => themeManager.applyTheme(themeName),
    registerTheme: (name, config) => themeManager.registerTheme(name, config),
    getCurrentTheme: () => themeManager.getCurrentTheme(),
    getAvailableThemes: () => themeManager.getAvailableThemes()
  };

  return (
    <FrameworkContext.Provider value={value}>
      {children}
    </FrameworkContext.Provider>
  );
}