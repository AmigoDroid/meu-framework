// src/core/Layout.jsx
import { useLocation } from "react-router-dom";
import Menu from "./Menu";

export default function Layout({ modules, children }) {
  const location = useLocation();
  
  // Verificar se é uma rota válida registrada nos módulos
  const isValidRoute = () => {
    // Login é sempre válido
    if (location.pathname === "/login") return true;
    
    // Pegar todas as rotas dos módulos EXCETO a rota catch-all (*)
    const allValidRoutes = modules
      .flatMap(m => m.routes || [])
      .filter(r => r.path !== "*")
      .map(r => r.path);
    
    // Verificar se a rota atual existe nas rotas válidas
    for (const validRoute of allValidRoutes) {
      if (validRoute === "/") {
        // Rota raiz só matcheia exatamente "/"
        if (location.pathname === "/") return true;
      } else {
        // Outras rotas: match exato ou subrota
        if (location.pathname === validRoute || location.pathname.startsWith(validRoute + "/")) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  const hideMenu = location.pathname === "/login" || !isValidRoute();
 
  return (
    <div className={`app-shell ${hideMenu ? 'no-menu' : ''}`}>
      {!hideMenu && <Menu modules={modules} />}
      <main className="content">
        <div className="bg-shape bg-shape-1" />
        <div className="bg-shape bg-shape-2" />
        <div className="content-inner">{children}</div>
      </main>
    </div>
  );
}
