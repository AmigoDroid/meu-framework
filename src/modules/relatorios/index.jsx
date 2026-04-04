import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Relatórios",
  menu: {
    label: "Relatórios",
    path: "/relatorios",
    icon: "📊",
    order: 16
  },
  routes: [
    {
      path: "/relatorios",
      element: <PlaceholderPage title="Relatórios" description="Página de relatórios em desenvolvimento." icon="📊" />
    }
  ]
});
