import { createModule } from "../../core/modules/createModule";
import CustomThemePage from "./CustomThemePage";

export default createModule({
  name: "Custom Theme Creator",
  version: "1.0.0",
  description: "Crie temas customizados para seu site",

  menu: {
    label: "Criar Tema",
    path: "/create-theme",
    icon: "🎨",
    order: 98
  },

  routes: [
    {
      path: "/create-theme",
      element: <CustomThemePage />
    }
  ]
});
