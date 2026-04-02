// src/core/Menu.jsx
import { Link, useLocation } from "react-router-dom";

export default function Menu({ modules }) {
  const location = useLocation();

  const menus = modules
    .filter((m) => m.menu)
    .map((m) => m.menu)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div style={{ padding: 20, background: "#111", color: "#fff", height: "100vh" }}>
      <h2>🚀 Framework</h2>

      {menus.map((menu) => {
        const active = location.pathname === menu.path;

        return (
          <div key={menu.path} style={{ margin: "10px 0" }}>
            <Link
              to={menu.path}
              style={{
                color: active ? "#00ff88" : "#fff",
                textDecoration: "none",
                fontWeight: active ? "bold" : "normal"
              }}
            >
              {menu.icon} {menu.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
}