import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Monitoramento",
  menu: {
    label: "Monitoramento",
    path: "/monitoramento",
    icon: "📈",
    order: 13
  },
  routes: [
    {
      path: "/monitoramento",
      element: <PlaceholderPage title="Monitoramento" description="Página de monitoramento em desenvolvimento." icon="📈" />
    }
  ]
});
