import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FrameworkContext } from "./FrameworkProvider";
import { useAuth } from "./auth/AuthProvider";

export default function Menu({ modules }) {
  const location = useLocation();
  const navigate = useNavigate();
  const framework = useContext(FrameworkContext);
  const { user, logout } = useAuth();

  const menus = modules
    .filter((m) => m.menu)
    .map((m) => m.menu)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-badge">GM</div>
        <div className="logo-text">
          <h3>{framework?.name || "Framework"}</h3>
          <span>{framework?.version ? `v${framework.version}` : "Console"}</span>
        </div>
      </div>

      <nav className="menu-group">
        {menus.map((menu) => {
          const active =
            location.pathname === menu.path ||
            (menu.path !== "/" && location.pathname.startsWith(menu.path));

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`menu-link${active ? " active" : ""}`}
            >
              <span className="menu-icon" aria-hidden="true">
                {menu.icon || "•"}
              </span>
              <span className="menu-label">{menu.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {user && (
          <div className="user-profile" onClick={handleLogout}>
            <span className="user-icon">👤</span>
            <span className="user-label">{user.name || user.email || 'Usuário'}</span>
          </div>
        )}
        <div className="pill">Pronto para hoje</div>
        <p className="footer-note">
          Atalhos rapidos para navegar entre modulos e manter o fluxo.
        </p>
      </div>
    </aside>
  );
}
