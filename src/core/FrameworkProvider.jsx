import { createContext, useEffect, useState } from "react";
import { getConfig } from "./config";
import { themeManager } from "./themes/themeManager";

// temas
import defaultTheme from "./themes/default.js";
import techCorpTheme from "./themes/tech-corp.js";
import financeProTheme from "./themes/finance-pro.js";
import creativeStudioTheme from "./themes/creative-studio.js";
//api
import { apiManager } from "./api/apiManager.js";
import "./api/endpoints.js"


export const FrameworkContext = createContext();

export function FrameworkProvider({ children, config = {} }) {

  const frameworkConfig = { ...getConfig(), ...config };

  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {

    // registrar temas
    [
      defaultTheme,
      techCorpTheme,
      financeProTheme,
      creativeStudioTheme
    ].forEach(t => themeManager.registerTheme(t.name, t));

    // carregar custom
    try {
      const customThemes = JSON.parse(localStorage.getItem('gmf-custom-themes') || '{}');

      Object.entries(customThemes).forEach(([name, themeConfig]) => {
        themeManager.registerTheme(name, themeConfig);
      });

    } catch {}

    // aplicar tema inicial
    const theme = themeManager.loadSavedTheme();
    setCurrentTheme(theme);

    // listener interno
    const unsubscribe = themeManager.onChange((newTheme) => {
      setCurrentTheme(newTheme);
      themeManager.saveCurrentTheme();
    });

    return () => unsubscribe();

  }, []);

  const value = {
    ...frameworkConfig,

    getVersion: () => frameworkConfig.version,
    getName: () => frameworkConfig.name,
    isDevelopment: () => import.meta.env.DEV,

    currentTheme,
    applyTheme: (name) => themeManager.applyTheme(name),
    registerTheme: (name, config) => themeManager.registerTheme(name, config),
    getThemes: () => themeManager.getAvailableThemes(),
    //api
    request: (name, pathOrData, maybeData) => apiManager.request(name, pathOrData, maybeData),
    onRequest: (cb) => apiManager.on("request", cb),
    onResponse: (cb) => apiManager.on("response", cb),
    onError: (cb) => apiManager.on("error", cb),
    registerEndpoint: (name, config) => apiManager.register(name, config)
  };

  return (
    <FrameworkContext.Provider value={value}>
      {children}
    </FrameworkContext.Provider>
  );
}