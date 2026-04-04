import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Usuários",
  menu: {
    label: "Usuários",
    path: "/usuarios",
    icon: "👤",
    order: 18
  },
  routes: [
    {
      path: "/usuarios",
      element: <PlaceholderPage title="Usuários" description="Página de usuários em desenvolvimento." icon="👤" />
    }
  ]
});
