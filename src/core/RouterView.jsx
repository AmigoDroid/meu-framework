import { buildRoutes } from "./router";

export default function RouterView({ modules }) {
  return buildRoutes(modules);
}