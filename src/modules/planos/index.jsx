import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Planos",
  menu: {
    label: "Planos",
    path: "/planos",
    icon: "📝",
    order: 7
  },
  routes: [
    {
      path: "/planos",
      element: <PlaceholderPage title="Planos" description="Página de planos em desenvolvimento." icon="📝" />
    }
  ]
});
