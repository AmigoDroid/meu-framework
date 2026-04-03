// src/core/router.js
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export function buildRoutes(modules) {

  let routes = [];

  modules.forEach((m) => {
  
    m.routes.forEach((route) => {
      
      routes.push({
        path: route.path, element : route.path === "/login"
    ? route.element :(
        <ProtectedRoute>
          {route.element}
        </ProtectedRoute>
      )
  });
    });
       });

  return useRoutes(routes);
}