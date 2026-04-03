import { useLocation, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determinar tipo de erro pela URL ou estado
  const getErrorInfo = () => {
    const state = location.state?.error;
    const status = state?.status || 404;
    const message = state?.message || 'Página não encontrada';
    
    const errorInfo = {
      404: {
        title: 'Página Não Encontrada',
        message: 'A página que você está procurando não existe.',
        icon: '🔍'
      },
      403: {
        title: 'Acesso Proibido',
        message: 'Você não tem permissão para acessar este recurso.',
        icon: '🚫'
      },
      500: {
        title: 'Erro Interno do Servidor',
        message: 'Algo deu errado no servidor. Por favor, tente novamente mais tarde.',
        icon: '⚠️'
      },
      503: {
        title: 'Serviço Indisponível',
        message: 'O serviço está temporariamente indisponível. Por favor, tente novamente mais tarde.',
        icon: '🛠️'
      }
    };
    
    return errorInfo[status] || {
      title: `Erro ${status}`,
      message: message || 'Ocorreu um erro inesperado.',
      icon: '❌'
    };
  };

  const errorInfo = getErrorInfo();
  const status = location.state?.error?.status || 404;

  return (
    <div className="page">
      <div className="error-container">
        <div className="error-icon">{errorInfo.icon}</div>
        <div className="error-code">{status}</div>
        <h1 className="error-title">{errorInfo.title}</h1>
        <p className="error-message">{errorInfo.message}</p>
        
        <div className="error-actions">
          <button 
            className="btn primary" 
            onClick={() => navigate('/')}
          >
            🏠 Ir para Home
          </button>
          <button 
            className="btn ghost" 
            onClick={() => navigate(-1)}
          >
            ← Voltar
          </button>
        </div>

        <div className="error-details">
          <p className="error-path">Rota: <code>{location.pathname}</code></p>
        </div>
      </div>
    </div>
  );
}
