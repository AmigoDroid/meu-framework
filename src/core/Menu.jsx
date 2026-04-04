import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FrameworkContext } from "./FrameworkProvider";
import { useAuth } from "./auth/AuthProvider";
import "./Menu.css";

const menuSections = [
  {
    title: "GESTÃO",
    items: [
      { label: "Dashboard", path: "/", icon: "🏠" },
      { label: "Clientes (CRM)", path: "/clientes", icon: "👥" },
      { label: "Financeiro", path: "/financeiro", icon: "💰" },
      { label: "Ordens de Serviço", path: "/ordens-de-servico", icon: "🧾" },
      { label: "Estoque", path: "/estoque", icon: "📦" },
      { label: "Planos", path: "/planos", icon: "📝" }
    ]
  },
  {
    title: "REDE",
    items: [
      { label: "Visão da Rede", path: "/visao-da-rede", icon: "🌐" },
      { label: "OLTs", path: "/olts", icon: "📡" },
      { label: "CTOs", path: "/ctos", icon: "🏢" },
      { label: "Splitters", path: "/splitters", icon: "🧩" },
      { label: "Fibra", path: "/fibra", icon: "🪄" },
      { label: "ONUs", path: "/onus", icon: "🔌" },
      { label: "Monitoramento", path: "/monitoramento", icon: "📈" },
      { label: "Alarmes", path: "/alarmes", icon: "🚨" }
    ]
  },
  {
    title: "SISTEMA",
    items: [
      { label: "Automações", path: "/automacoes", icon: "⚙️" },
      { label: "Relatórios", path: "/relatorios", icon: "📊" },
      { label: "Configurações", path: "/configuracoes", icon: "⚙️" },
       { label: "Themas", path: "/themes", icon: "🎨" },
      { label: "Usuários", path: "/usuarios", icon: "👤" },
      { label: "Logs", path: "/logs", icon: "🧾" }
    ]
  }
];

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const framework = useContext(FrameworkContext);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">FL</div>
        <div className="brand-text">
          <strong>FiberLink</strong>
          <span>Sistema FTTH</span>
        </div>
      </div>

      <div className="menu-sections">
        {menuSections.map((section) => (
          <div key={section.title} className="menu-section">
            <div className="menu-section-title">{section.title}</div>
            <nav className="menu-items">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`menu-item${isActive(item.path) ? " active" : ""}`}
                >
                  <span className="menu-item-icon">{item.icon}</span>
                  <span className="menu-item-label">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
