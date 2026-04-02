import { getUser } from "./auth";

export default function ProtectedRoute({ children, permission }) {
  const user = getUser();

  if (!user) {
    return <h1>🚫 Não logado</h1>;
  }

  if (permission && user.role !== permission) {
    return <h1>🚫 Sem acesso</h1>;
  }

  return children;
}