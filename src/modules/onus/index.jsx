import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "ONUs",
  menu: {
    label: "ONUs",
    path: "/onus",
    icon: "🔌",
    order: 12
  },
  routes: [
    {
      path: "/onus",
      element: <PlaceholderPage title="ONUs" description="Página de ONUs em desenvolvimento." icon="🔌" />
    }
  ]
});
