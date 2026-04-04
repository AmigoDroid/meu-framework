import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Ordens de Serviço",
  menu: {
    label: "Ordens de Serviço",
    path: "/ordens-de-servico",
    icon: "🧾",
    order: 5
  },
  routes: [
    {
      path: "/ordens-de-servico",
      element: <PlaceholderPage title="Ordens de Serviço" description="Página de ordens de serviço em desenvolvimento." icon="🧾" />
    }
  ]
});
