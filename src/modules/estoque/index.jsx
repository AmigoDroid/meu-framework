import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Estoque",
  menu: {
    label: "Estoque",
    path: "/estoque",
    icon: "📦",
    order: 6
  },
  routes: [
    {
      path: "/estoque",
      element: <PlaceholderPage title="Estoque" description="Página de estoque em desenvolvimento." icon="📦" />
    }
  ]
});
