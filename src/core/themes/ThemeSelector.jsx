// src/core/themes/ThemeSelector.jsx
import { useState, useEffect, useContext } from 'react';
import { FrameworkContext } from '../FrameworkProvider';

export default function ThemeSelector({ isOpen, onClose }) {
  const framework = useContext(FrameworkContext);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [availableThemes, setAvailableThemes] = useState([]);

  useEffect(() => {
    if (!framework) return;
    
    // Obter temas disponíveis
    const themes = framework.getAvailableThemes();
    setAvailableThemes(themes);
    
    // Obter tema atual
    const current = framework.getCurrentTheme();
    setCurrentTheme(current);
  }, [framework]);

  useEffect(() => {
    // Escutar mudanças de tema
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail?.theme || framework?.getCurrentTheme());
    };

    window.addEventListener('theme:changed', handleThemeChange);
    return () => window.removeEventListener('theme:changed', handleThemeChange);
  }, [framework]);

  const handleThemeSelect = (themeName) => {
    if (framework) {
      framework.applyTheme(themeName);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="theme-selector-overlay" onClick={onClose}>
      <div className="theme-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="theme-selector-header">
          <h3>Selecionar Tema</h3>
          <button className="theme-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="theme-grid">
          {availableThemes.map((themeName) => {
            const isActive = currentTheme?.name === themeName;

            return (
              <div
                key={themeName}
                className={`theme-card ${isActive ? 'active' : ''}`}
                onClick={() => handleThemeSelect(themeName)}
              >
                <div className="theme-preview">
                  <div className="theme-colors">
                    <div
                      className="color-primary"
                      style={{ backgroundColor: `var(--color-primary, #10b981)` }}
                    />
                    <div
                      className="color-secondary"
                      style={{ backgroundColor: `var(--color-secondary, #22d3ee)` }}
                    />
                    <div
                      className="color-accent"
                      style={{ backgroundColor: `var(--color-accent, #f59e0b)` }}
                    />
                  </div>
                  <div className="theme-name">{themeName}</div>
                </div>
                {isActive && <div className="theme-active-indicator">✓</div>}
              </div>
            );
          })}
        </div>

        <div className="theme-selector-footer">
          <p className="theme-note">
            Temas customizados podem ser instalados como módulos separados.
          </p>
        </div>
      </div>
    </div>
  );
}