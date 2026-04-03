import { getUser } from "./auth";
import { useLocation, Navigate, Link } from "react-router-dom";
import { canAccess } from "./permissions";

export default function ProtectedRoute({ children }) {
  const user = getUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!canAccess(location.pathname)) {
    return (
      <div className="page">
        <div className="card">
          <p className="eyebrow">Permissao</p>
          <h1 className="page-title">Sem acesso</h1>
          <p className="page-lead">
            O usuario atual nao possui permissao para {location.pathname}. Tente voltar ou
            trocar de conta.
          </p>
          <div className="actions">
            <Link className="btn ghost" to="/">
              Voltar
            </Link>
            <Link className="btn primary" to="/login">
              Trocar usuario
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
