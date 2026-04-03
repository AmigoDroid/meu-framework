// src/modules/login/index.jsx
import { createModule } from "../../core/modules/createModule";
import LoginPage from "./LoginPage";

export default createModule({
  name: "login",

  routes: [
    {
      path: "/login",
      element: <LoginPage />
    }
  ]
});