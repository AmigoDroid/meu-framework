import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "CTOs",
  menu: {
    label: "CTOs",
    path: "/ctos",
    icon: "🏢",
    order: 9
  },
  routes: [
    {
      path: "/ctos",
      element: <PlaceholderPage title="CTOs" description="Página de CTOs em desenvolvimento." icon="🏢" />
    }
  ]
});
