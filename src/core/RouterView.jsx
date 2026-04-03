import { useEffect } from "react";
import { resolveTitle } from "./tools/resolveTitle";
import { buildRoutes } from "./router";

export default function RouterView({ modules }) {
  // Usar useEffect para atualizar o título apenas quando necessário
  useEffect(() => {
    document.title = resolveTitle(modules);
  }, [modules]);

  return buildRoutes(modules);
} 