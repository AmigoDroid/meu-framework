// src/modules/dashboard/index.jsx
import { createModule } from "../../core/modules/createModule";
import DashboardPage from "./DashboardPage";

export default createModule({
  name: "Dashboard",
  version: "1.0.0",
  description: "Módulo principal do dashboard",

  menu: {
    label: "Dashboard",
    path: "/",
    icon: "📊",
    order: 0
  },

  routes: [
    {
      path: "/",
      element: <DashboardPage />
    }
  ],

  permissions: ["dashboard.view"]
});