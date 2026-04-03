// src/modules/login/index.jsx
import LoginPage from "./LoginPage";

export default {
  name: "login",

  routes: [
    {
      path: "/login",
      element: <LoginPage />
    }
  ]
};