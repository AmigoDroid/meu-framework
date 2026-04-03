import { useState, useContext } from 'react';
import { FrameworkContext } from '../../core/FrameworkProvider';

export default function CustomThemePage() {
  const framework = useContext(FrameworkContext);
  const [themeName, setThemeName] = useState('');
  const [colors, setColors] = useState({
    primary: '#10b981',
    secondary: '#22d3ee',
    bg: '#020617',
    'bg-secondary': '#0f172a',
    'bg-tertiary': '#1e293b',
    panel: 'rgba(255, 255, 255, 0.04)',
    'panel-strong': 'rgba(255, 255, 255, 0.08)',
    'panel-hover': 'rgba(255, 255, 255, 0.06)',
    text: '#e5e7eb',
    'text-secondary': '#9ca3af',
    'text-muted': '#6b7280',
    border: 'rgba(255, 255, 255, 0.08)',
    'border-hover': 'rgba(255, 255, 255, 0.12)',
    shadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
    'shadow-hover': '0 25px 80px rgba(0, 0, 0, 0.45)'
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleColorChange = (key, value) => {
    setColors({
      ...colors,
      [key]: value
    });
  };

  const handleCreateTheme = () => {
    if (!themeName.trim()) {
      setMessage('❌ Nome do tema é obrigatório');
      setMessageType('error');
      return;
    }

    // Validar se não há espaços ou caracteres especiais
    if (!/^[a-z0-9\-_]+$/i.test(themeName)) {
      setMessage('❌ Nome do tema deve conter apenas letras, números, hífen e underscore');
      setMessageType('error');
      return;
    }

    // Criar objeto do tema
    const newTheme = {
      name: themeName.toLowerCase().replace(/\s+/g, '-'),
      displayName: themeName,
      description: `Tema customizado: ${themeName}`,
      colors,
      fonts: {
        family: '"Space Grotesk", "Manrope", system-ui, -apple-system, sans-serif',
        'family-heading': '"Space Grotesk", system-ui, -apple-system, sans-serif',
        'family-body': '"Manrope", system-ui, -apple-system, sans-serif'
      },
      images: {
        logo: {
          type: 'emoji',
          content: '✨'
        }
      }
    };

    // Registrar o tema
    framework.registerTheme(newTheme.name, newTheme);
    
    // Salvar no localStorage para persistência
    const customThemes = JSON.parse(localStorage.getItem('gmf-custom-themes') || '{}');
    customThemes[newTheme.name] = newTheme;
    localStorage.setItem('gmf-custom-themes', JSON.stringify(customThemes));

    setMessage(`✅ Tema "${themeName}" criado com sucesso! Aplicando...`);
    setMessageType('success');

    // Aplicar o tema
    setTimeout(() => {
      framework.applyTheme(newTheme.name);
      setThemeName('');
      setColors({
        primary: '#10b981',
        secondary: '#22d3ee',
        bg: '#020617',
        'bg-secondary': '#0f172a',
        'bg-tertiary': '#1e293b',
        panel: 'rgba(255, 255, 255, 0.04)',
        'panel-strong': 'rgba(255, 255, 255, 0.08)',
        'panel-hover': 'rgba(255, 255, 255, 0.06)',
        text: '#e5e7eb',
        'text-secondary': '#9ca3af',
        'text-muted': '#6b7280',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-hover': 'rgba(255, 255, 255, 0.12)',
        shadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
        'shadow-hover': '0 25px 80px rgba(0, 0, 0, 0.45)'
      });
      setMessage('');
    }, 1000);
  };

  const handleResetColors = () => {
    setColors({
      primary: '#10b981',
      secondary: '#22d3ee',
      bg: '#020617',
      'bg-secondary': '#0f172a',
      'bg-tertiary': '#1e293b',
      panel: 'rgba(255, 255, 255, 0.04)',
      'panel-strong': 'rgba(255, 255, 255, 0.08)',
      'panel-hover': 'rgba(255, 255, 255, 0.06)',
      text: '#e5e7eb',
      'text-secondary': '#9ca3af',
      'text-muted': '#6b7280',
      border: 'rgba(255, 255, 255, 0.08)',
      'border-hover': 'rgba(255, 255, 255, 0.12)',
      shadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
      'shadow-hover': '0 25px 80px rgba(0, 0, 0, 0.45)'
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Personalização</p>
          <h1 className="page-title">Criar Tema Customizado</h1>
          <p className="page-lead">
            Crie um novo tema ajustando as cores de acordo com sua marca
          </p>
        </div>
      </div>

      <div className="panel-grid">
        {/* Formulário */}
        <div className="card">
          <div className="card-header">
            <h2>Configuração do Tema</h2>
          </div>

          <div className="form-grid">
            <div>
              <label className="input-label">Nome do Tema</label>
              <input
                type="text"
                className="input-field"
                placeholder="ex: Tema Corporativo"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
              />
              <p className="input-note">
                Use apenas letras, números, hífen e underscore
              </p>
            </div>

            <div>
              <h3 style={{ marginTop: '20px', marginBottom: '12px' }}>Cores Principais</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['primary', 'secondary'].map((key) => (
                  <div key={key}>
                    <label className="input-label" style={{ textTransform: 'capitalize' }}>
                      {key}
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="color"
                        value={colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        style={{ width: '60px', height: '40px', borderRadius: '8px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="input-field"
                        value={colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ marginTop: '20px', marginBottom: '12px' }}>Background</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['bg', 'bg-secondary'].map((key) => (
                  <div key={key}>
                    <label className="input-label">{key}</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="color"
                        value={colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        style={{ width: '60px', height: '40px', borderRadius: '8px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="input-field"
                        value={colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ marginTop: '20px', marginBottom: '12px' }}>Texto</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['text', 'text-secondary'].map((key) => (
                  <div key={key}>
                    <label className="input-label">{key}</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="color"
                        value={colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        style={{ width: '60px', height: '40px', borderRadius: '8px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="input-field"
                        value={colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ marginTop: '20px', marginBottom: '12px' }}>Painéis</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['panel', 'panel-strong'].map((key) => (
                  <div key={key}>
                    <label className="input-label">{key}</label>
                    <input
                      type="text"
                      className="input-field"
                      value={colors[key]}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="actions" style={{ marginTop: '24px' }}>
            <button className="btn primary" onClick={handleCreateTheme}>
              ✨ Criar e Aplicar Tema
            </button>
            <button className="btn ghost" onClick={handleResetColors}>
              ↻ Resetar Cores
            </button>
          </div>

          {message && (
            <div className={`alert ${messageType}`} style={{ marginTop: '16px' }}>
              {message}
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="card">
          <div className="card-header">
            <h2>Preview</h2>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.text
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 8px', color: colors['text-muted'], fontSize: '12px' }}>
                TÍTULO
              </p>
              <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '600' }}>
                Preview do Tema
              </h3>
              <p style={{ margin: 0, color: colors['text-secondary'], fontSize: '14px' }}>
                Visualize como seu tema ficará
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: colors.panel,
                  border: `1px solid ${colors.border}`
                }}
              >
                <p style={{ margin: 0, fontSize: '12px' }}>Panel</p>
              </div>
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: colors['panel-strong'],
                  border: `1px solid ${colors['border-hover']}`
                }}
              >
                <p style={{ margin: 0, fontSize: '12px' }}>Panel Strong</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  background: colors.primary
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  background: colors.secondary
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  background: colors['bg-tertiary'],
                  border: `2px solid ${colors.border}`
                }}
              />
            </div>

            <div style={{ marginTop: '16px' }}>
              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: '#fff',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Botão de Ação
              </button>
            </div>
          </div>

          <div style={{ marginTop: '16px', padding: '12px', background: 'var(--panel-strong)', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
              💡 Dica: Use o preview para ver como o tema fica em tempo real
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
