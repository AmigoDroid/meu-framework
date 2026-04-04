import { createModule } from "../../core/modules/createModule";
import PlaceholderPage from "../../core/pages/PlaceholderPage";

export default createModule({
  name: "Alarmes",
  menu: {
    label: "Alarmes",
    path: "/alarmes",
    icon: "🚨",
    order: 14
  },
  routes: [
    {
      path: "/alarmes",
      element: <PlaceholderPage title="Alarmes" description="Página de alarmes em desenvolvimento." icon="🚨" />
    }
  ]
});
