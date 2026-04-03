import { useLocation, Navigate, Link } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { canAccess } from "./security/permissions";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute:', {
    path: location.pathname,
    user: user ? 'autenticado' : 'não autenticado',
    isLoading
  });

  if (isLoading) {
    console.log('⏳ ProtectedRoute: Carregando...');
    return (
      <div className="page">
        <div className="card">
          <p className="eyebrow">Carregando</p>
          <h1 className="page-title">Verificando acesso...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('🚫 ProtectedRoute: Usuário não autenticado, redirecionando para /login');
    return <Navigate to="/login" replace />;
  }

  // Passar o usuário do contexto para garantir dados atualizados
  if (!canAccess(location.pathname, user)) {
    console.log('🚫 ProtectedRoute: Sem permissão para', location.pathname);
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

  console.log('✅ ProtectedRoute: Acesso permitido para', location.pathname);
  return children;
}
