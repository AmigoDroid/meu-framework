// src/modules/home/index.jsx
import { createModule } from "../../core/createModule";
import App from "../../App";

export default createModule({
  name: "Home Page",

  menu: {
    label: "Home",
    path: "/",
    icon: "🏠",
    order: 0
  },
  routes: [
    {
      path: "/",
      element: <App />
    }
  ]
});