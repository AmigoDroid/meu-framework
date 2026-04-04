import { createModule } from "../../core/modules/createModule";
import PluginManagerPage from "./PluginManagerPage";

export default createModule({
  name: "Plugin Manager",
  version: "1.0.0",
  description: "Gerenciador de plugins do framework",

  menu: {
    label: "Gerenciador de Plugins",
    path: "/plugin-manager",
    icon: "🔌",
    order: 100
  },

  routes: [
    {
      path: "/plugin-manager",
      element: <PluginManagerPage />
    }
  ],

  permissions: ["admin.plugins"]
});
