import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Configurações",
  menu: {
    label: "Configurações",
    path: "/configuracoes",
    icon: "⚙️",
    order: 17
  },
  routes: [
    {
      path: "/configuracoes",
      element: <PlaceholderPage title="Configurações" description="Página de configurações em desenvolvimento." icon="⚙️" />
    }
  ]
});
