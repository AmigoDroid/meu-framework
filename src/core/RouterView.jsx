import { useEffect, useMemo, useState } from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { resolveTitle } from "./tools/resolveTitle";
import { pluginSystem } from "./plugin/pluginSystem";

export default function RouterView({ modules }) {
  const [update, setUpdate] = useState(0);

  // Forçar atualização das rotas a cada segundo para incluir plugins dinâmicos
  useEffect(() => {
    const interval = setInterval(() => setUpdate(u => u + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Usar useEffect para atualizar o título apenas quando necessário
  useEffect(() => {
    document.title = resolveTitle(modules);
  }, [modules]);

  const routes = useMemo(() => {
    let routes = [];

    modules.forEach((m) => {
      m.routes.forEach((route) => {
        const isErrorRoute = route.path === "*";
        
        routes.push({
          path: route.path, 
          element: isErrorRoute
            ? route.element  // Sem proteção para página de erro
            : route.path === "/login"
              ? route.element
              : (
                <ProtectedRoute>
                  {route.element}
                </ProtectedRoute>
              )
        });
      });
    });

    // Adicionar rotas dos plugins
    pluginSystem.getRoutes().forEach((route) => {
      const isErrorRoute = route.path === "*";
      
      routes.push({
        path: route.path, 
        element: isErrorRoute
          ? route.element  // Sem proteção para página de erro
          : route.path === "/login"
            ? route.element
            : (
              <ProtectedRoute>
                {route.element}
              </ProtectedRoute>
            )
      });
    });

    return routes;
  }, [modules, update]);

  return useRoutes(routes);
} 