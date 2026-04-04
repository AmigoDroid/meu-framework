import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Automações",
  menu: {
    label: "Automações",
    path: "/automacoes",
    icon: "⚙️",
    order: 15
  },
  routes: [
    {
      path: "/automacoes",
      element: <PlaceholderPage title="Automações" description="Página de automações em desenvolvimento." icon="⚙️" />
    }
  ]
});
