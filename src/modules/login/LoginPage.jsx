import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth/AuthProvider";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        setError("Nao foi possivel autenticar. Confira usuario e senha.");
        return;
      }

      const data = await res.json();
      // Usar o método login do AuthProvider ao invés de localStorage direto
      login(data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Falha na conexao com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-grid">
      <div className="auth-hero">
        <p className="eyebrow">Acesso</p>
        <h1>Entre no console</h1>
        <p>
          Centralize clientes, financeiro e permissoes em um unico login seguro.
        </p>
        <div className="tag-row">
          <span className="pill">SSO pronto</span>
          <span className="pill">Fluxo rapido</span>
          <span className="pill">Sem distracoes</span>
        </div>
      </div>

      <div className="auth-card">
        <div className="card-header">
          <h2>Autenticacao</h2>
          <p className="muted">Use as credenciais fornecidas pelo administrador.</p>
        </div>

        {error && <div className="alert">{error}</div>}

        <form className="form-grid" onSubmit={handleLogin}>
          <div>
            <label className="input-label" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              className="input-field"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ex: ana.silva"
              required
            />
          </div>

          <div>
            <label className="input-label" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="input-field"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <p className="input-note">As credenciais trafegam via HTTPS.</p>
          </div>

          <button className="btn primary full" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
