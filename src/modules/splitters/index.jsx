import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Splitters",
  menu: {
    label: "Splitters",
    path: "/splitters",
    icon: "🧩",
    order: 10
  },
  routes: [
    {
      path: "/splitters",
      element: <PlaceholderPage title="Splitters" description="Página de splitters em desenvolvimento." icon="🧩" />
    }
  ]
});
