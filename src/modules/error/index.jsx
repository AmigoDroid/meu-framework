import { createModule } from "../../core/modules/createModule";
import ErrorPage from "./ErrorPage";

export default createModule({
  name: "Error Handler",
  version: "1.0.0",
  description: "Página de erro para rotas não encontradas e erros HTTP",

  // Este módulo não tem menu, apenas renderiza quando há erro
  routes: [
    {
      path: "*",
      element: <ErrorPage />
    }
  ],

  onLoad: () => {
    console.log("🔴 Error Handler: Módulo carregado - capturando rotas não tratadas");
  },

  onUnload: () => {
    console.log("🔴 Error Handler: Módulo descarregado");
  }
});
