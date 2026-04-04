// src/core/Layout.jsx
import { useLocation } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";

export default function Layout({ modules, children }) {
  const location = useLocation();

  const isValidRoute = () => {
    if (location.pathname === "/login") return true;

    const allValidRoutes = modules
      .flatMap((m) => m.routes || [])
      .filter((r) => r.path !== "*")
      .map((r) => r.path);

    for (const validRoute of allValidRoutes) {
      if (validRoute === "/") {
        if (location.pathname === "/") return true;
      } else {
        if (
          location.pathname === validRoute ||
          location.pathname.startsWith(validRoute + "/")
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const hideMenu = location.pathname === "/login" || !isValidRoute();

  return (
    <div className={`app-shell ${hideMenu ? "no-menu" : ""}`}>
      {!hideMenu && <Menu modules={modules} />}
      <main className="content">
        <div className="bg-shape bg-shape-1" />
        <div className="bg-shape bg-shape-2" />
        <div className="content-inner">
          {!hideMenu && <Header />}
          {children}
        </div>
      </main>
    </div>
  );
}
