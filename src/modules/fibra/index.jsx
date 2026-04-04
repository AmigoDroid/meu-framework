import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Fibra",
  menu: {
    label: "Fibra",
    path: "/fibra",
    icon: "🪄",
    order: 11
  },
  routes: [
    {
      path: "/fibra",
      element: <PlaceholderPage title="Fibra" description="Página de fibra em desenvolvimento." icon="🪄" />
    }
  ]
});
