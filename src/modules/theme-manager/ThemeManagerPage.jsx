// src/modules/theme-manager/ThemeManagerPage.jsx
import { useState, useContext } from "react";
import { FrameworkContext } from "../../core/FrameworkProvider";
import ThemeSelector from "../../core/themes/ThemeSelector";

export default function ThemeManagerPage() {
  const framework = useContext(FrameworkContext);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // 🔥 estado vindo direto do framework (reativo)
  const currentTheme = framework?.currentTheme;
  const availableThemes = framework?.getThemes() || [];

  const currentThemeName = currentTheme?.name || "default";

  const handleInstallTheme = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const themeConfig = JSON.parse(event.target.result);

          if (themeConfig.name && themeConfig.colors) {
            framework.registerTheme(themeConfig.name, themeConfig);
            alert(`Tema "${themeConfig.name}" instalado com sucesso!`);
          } else {
            alert("Tema inválido: precisa de 'name' e 'colors'");
          }
        } catch (err) {
          alert("Erro ao carregar tema: " + err.message);
        }
      };

      reader.readAsText(file);
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

          <button className="btn ghost" onClick={handleInstallTheme}>
            Instalar Tema
          </button>
        </div>
      </div>

      <div className="panel-grid">
        {/* 🔥 Tema atual */}
        <div className="card">
          <h3 className="card-title">Tema Atual</h3>

          <div className="current-theme-display">
            <div className="theme-colors-preview">
              <div
                className="color-swatch"
                style={{ background: "var(--accent)" }}
              />
              <div
                className="color-swatch"
                style={{ background: "var(--accent-2)" }}
              />
              <div
                className="color-swatch"
                style={{ background: "var(--bg-secondary)" }}
              />
            </div>

            <div className="theme-details">
              <h4>
                {currentTheme?.displayName ||
                  currentTheme?.name ||
                  "Tema Atual"}
              </h4>
              <p>{currentTheme?.description || "Tema ativo no sistema"}</p>
            </div>
          </div>
        </div>

        {/* 🔥 Lista de temas */}
        <div className="card">
          <h3 className="card-title">Temas Disponíveis</h3>

          <div className="theme-list">
            {availableThemes.map((themeName) => {
              const isActive = currentThemeName === themeName;

              return (
                <div
                  key={themeName}
                  className={`theme-list-item ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() => framework.applyTheme(themeName)}
                >
                  <span>{themeName}</span>
                  {isActive && <span className="badge">Ativo</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* 🔥 Como criar tema */}
        <div className="card">
          <h3 className="card-title">Como Criar um Tema</h3>

          <pre className="code-example">
{`{
  "name": "meu-tema",
  "displayName": "Meu Tema",
  "description": "Tema personalizado",

  "colors": {
    "primary": "#ff6b6b",
    "secondary": "#4ecdc4",
    "accent": "#ffe66d"
  },

  "fonts": {
    "family": "sans-serif"
  },

  "images": {
    "background": "/bg.jpg"
  }
}`}
          </pre>

          <p className="footer-note">
            Crie um JSON com essa estrutura e instale no sistema.
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