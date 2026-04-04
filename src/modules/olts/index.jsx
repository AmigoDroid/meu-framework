import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "OLTs",
  menu: {
    label: "OLTs",
    path: "/olts",
    icon: "📡",
    order: 8
  },
  routes: [
    {
      path: "/olts",
      element: <PlaceholderPage title="OLTs" description="Página de OLTs em desenvolvimento." icon="📡" />
    }
  ]
});
