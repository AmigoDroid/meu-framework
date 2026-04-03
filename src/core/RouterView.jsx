import { resolveTitle } from "./resolveTitle";
import { buildRoutes } from "./router";

export default function RouterView({ modules }) {
  document.title = resolveTitle(modules);
  
  
  return buildRoutes(modules);
}