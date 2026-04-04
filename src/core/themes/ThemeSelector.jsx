// src/core/themes/ThemeSelector.jsx
import { useContext } from "react";
import { FrameworkContext } from "../FrameworkProvider";

export default function ThemeSelector({ isOpen, onClose }) {
  const framework = useContext(FrameworkContext);

  const currentTheme = framework?.currentTheme;
  const availableThemes = framework?.getThemes() || [];

  const handleThemeSelect = (themeName) => {
    if (window.themeManager) {
      window.themeManager.setTheme(themeName);
    } else {
      framework?.applyTheme(themeName);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="theme-selector-overlay" onClick={onClose}>
      <div
        className="theme-selector-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="theme-selector-header">
          <h3>Selecionar Tema</h3>
          <button className="theme-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="theme-grid">
          {availableThemes.map((themeName) => {
            const isActive = currentTheme?.name === themeName;

            return (
              <div
                key={themeName}
                className={`theme-card ${isActive ? "active" : ""}`}
                onClick={() => handleThemeSelect(themeName)}
              >
                <div className="theme-preview">
                  <div className="theme-colors">
                    <div
                      className="color-primary"
                      style={{ background: "var(--accent)" }}
                    />
                    <div
                      className="color-secondary"
                      style={{ background: "var(--accent-2)" }}
                    />
                    <div
                      className="color-accent"
                      style={{ background: "var(--bg-secondary)" }}
                    />
                  </div>

                  <div className="theme-name">{themeName}</div>
                </div>

                {isActive && (
                  <div className="theme-active-indicator">✓</div>
                )}
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