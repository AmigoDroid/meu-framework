// src/core/router.js
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export function buildRoutes(modules) {

  let routes = [];

  modules.forEach((m) => {
   
    m.routes.forEach((route) => {
      
      // Rota de erro (*) não deve estar protegida
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

  return useRoutes(routes);
}