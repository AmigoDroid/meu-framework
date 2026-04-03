// src/modules/theme-manager/ThemeManagerPage.jsx
import { useState, useContext, useEffect } from "react";
import { FrameworkContext } from "../../core/FrameworkProvider";
import ThemeSelector from "../../core/themes/ThemeSelector";

export default function ThemeManagerPage() {
  const framework = useContext(FrameworkContext);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [currentThemeName, setCurrentThemeName] = useState(() => {
    const theme = framework?.getCurrentTheme();
    return theme?.name || 'default';
  });
  const currentTheme = framework.getCurrentTheme();
  const availableThemes = framework.getAvailableThemes();

  useEffect(() => {
    // Atualizar estado quando o tema muda
    const handleThemeChange = () => {
      const theme = framework.getCurrentTheme();
      setCurrentThemeName(theme?.name || 'default');
    };

    window.addEventListener('theme:changed', handleThemeChange);
    return () => window.removeEventListener('theme:changed', handleThemeChange);
  }, [framework]);

  const handleInstallTheme = () => {
    // Simular instalação de tema via arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.js,.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            // Aqui você implementaria a lógica para carregar e validar o tema
            const themeConfig = JSON.parse(event.target.result);

            if (themeConfig.name && themeConfig.colors) {
              framework.registerTheme(themeConfig.name, themeConfig);
              alert(`Tema "${themeConfig.name}" instalado com sucesso!`);
            } else {
              alert('Arquivo de tema inválido. Deve conter propriedades "name" e "colors".');
            }
          } catch (error) {
            alert('Erro ao carregar tema: ' + error.message);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Personalização</p>
          <h1 className="page-title">Gerenciador de Temas</h1>
          <p className="page-lead">
            Personalize a aparência do seu sistema com temas customizados.
          </p>
        </div>
        <div className="actions">
          <button
            className="btn primary"
            onClick={() => setShowThemeSelector(true)}
          >
            Alterar Tema
          </button>
          <button
            className="btn ghost"
            onClick={handleInstallTheme}
          >
            Instalar Tema
          </button>
        </div>
      </div>

      <div className="panel-grid">
        <div className="card">
          <h3 className="card-title">Tema Atual</h3>
          <div className="theme-info">
            <div className="current-theme-display">
              <div className="theme-colors-preview">
                <div
                  className="color-swatch primary"
                  style={{ backgroundColor: `var(--color-primary)` }}
                />
                <div
                  className="color-swatch secondary"
                  style={{ backgroundColor: `var(--color-secondary)` }}
                />
                <div
                  className="color-swatch accent"
                  style={{ backgroundColor: `var(--color-accent)` }}
                />
              </div>
              <div className="theme-details">
                <h4>{currentTheme?.displayName || currentTheme?.name || 'Tema Atual'}</h4>
                <p>{currentTheme?.description || 'Tema ativo no sistema'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Temas Disponíveis</h3>
          <div className="theme-list">
            {availableThemes.map((themeName) => {
              const isActive = currentThemeName === themeName;
              return (
                <div
                  key={themeName}
                  className={`theme-list-item ${isActive ? 'active' : ''}`}
                  onClick={() => framework.applyTheme(themeName)}
                >
                  <span className="theme-list-name">{themeName}</span>
                  {isActive && <span className="theme-active-badge">Ativo</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Como Criar um Tema</h3>
          <div className="code-example">
            <pre>{`// theme-custom.js
export default {
  name: 'meu-tema',
  displayName: 'Meu Tema',
  description: 'Tema personalizado',

  colors: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#ffe66d',
    // ... outras cores
  },

  fonts: {
    family: '"MinhaFonte", sans-serif'
  },

  images: {
    logo: { type: 'emoji', content: '🚀' },
    background: '/images/meu-bg.jpg'
  }
};`}</pre>
          </div>
          <p className="footer-note">
            Crie um arquivo .js com esta estrutura e importe no seu módulo.
          </p>
        </div>
      </div>

      <ThemeSelector
        isOpen={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
      />
    </div>
  );
}