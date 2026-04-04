import { useContext } from "react";
import { FrameworkContext } from "./FrameworkProvider";
import "./Header.css";

export default function Header() {
  const framework = useContext(FrameworkContext);

  return (
    <header className="app-header">
      <div className="app-brand">
        <div className="brand-logo">FL</div>
        <div>
          <p className="brand-label">{framework?.name || "FiberLink"}</p>
          <span className="brand-subtitle">{framework?.description || "Sistema FTTH"}</span>
        </div>
      </div>

      <div className="header-actions">
        <div className="header-search">
          <span>🔎</span>
          <input type="search" placeholder="Buscar cliente, ONU, CTO, OLT..." />
        </div>

        <div className="header-tools">
          <button className="icon-btn" aria-label="Notificações">🔔</button>
          <button className="icon-btn" aria-label="Ajuda">❓</button>
          <div className="user-pill">
            <strong>Admin</strong>
            <span>Super Administrador</span>
          </div>
        </div>
      </div>
    </header>
  );
}
