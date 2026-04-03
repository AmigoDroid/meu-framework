# GMF - Framework React

Um framework modular para aplicações React com sistema de autenticação, permissões e roteamento automático.

## 🚀 Começando

### Instalação

```bash
npm install
npm run dev
```

### Estrutura Básica

```
src/
├── core/           # Núcleo do framework
├── modules/        # Módulos da aplicação
├── styles.css      # Estilos globais
└── main.jsx        # Ponto de entrada
```

## 📦 Criando Módulos

Módulos são a unidade básica do framework. Cada módulo pode conter rotas, menus e permissões.

```javascript
// modules/exemplo/index.jsx
import { createModule } from "../../core/modules/createModule";
import ExemploPage from "./ExemploPage";

export default createModule({
  name: "Exemplo",
  version: "1.0.0",
  description: "Módulo de exemplo",

  // Menu (opcional)
  menu: {
    label: "Exemplo",
    path: "/exemplo",
    icon: "📝",
    order: 1
  },

  // Rotas obrigatórias
  routes: [
    {
      path: "/exemplo",
      element: <ExemploPage />
    }
  ],

  // Permissões (opcional)
  permissions: ["exemplo.view", "exemplo.edit"]
});
```

## 🔐 Sistema de Autenticação

### Login
```javascript
import { useAuth } from "./core/auth/AuthProvider";

function LoginComponent() {
  const { login } = useAuth();

  const handleLogin = (token) => {
    login(token); // Salva token e atualiza estado
  };
}
```

### Verificar Autenticação
```javascript
import { useAuth } from "./core/auth/AuthProvider";

function ProtectedComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return <div>Não autenticado</div>;

  return (
    <div>
      Olá, {user.name}!
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## 🛡️ Sistema de Permissões

### Definindo Permissões
```javascript
// core/security/permissionMap.js
export const permissionMap = {
  "/clientes": "clientes.view",
  "/clientes/editar": "clientes.edit",
  "/admin": "admin.access"
};
```

### Verificando Permissões
```javascript
import { canAccess } from "./core/security/permissions";

if (canAccess("/clientes")) {
  // Usuário tem permissão
}
```

## 🎨 Tema e Configuração

### Personalizando o Framework
```javascript
// main.jsx
import { FrameworkProvider } from "./core/FrameworkProvider";

const config = {
  name: "Minha App",
  version: "2.0.0",
  theme: {
    primary: "#ff6b6b",
    secondary: "#4ecdc4"
  }
};

<FrameworkProvider config={config}>
  {/* ... */}
</FrameworkProvider>
```

## 🎨 Sistema de Temas

O framework inclui um sistema completo de temas personalizáveis, permitindo que cada cliente tenha sua própria identidade visual.

### Temas Incluídos

- **Default**: Tema padrão do GMF
- **Tech Corp**: Para empresas de tecnologia
- **Finance Pro**: Para instituições financeiras
- **Creative Studio**: Para estúdios criativos

### Criando um Tema Customizado

```javascript
// themes/meu-tema.js
export default {
  name: 'meu-tema',
  displayName: 'Meu Tema Personalizado',
  description: 'Tema customizado para minha empresa',

  colors: {
    primary: '#ff6b6b',      // Cor principal
    secondary: '#4ecdc4',    // Cor secundária
    accent: '#ffe66d',       // Cor de destaque
    success: '#10b981',      // Cor de sucesso
    warning: '#f59e0b',      // Cor de aviso
    error: '#ef4444',        // Cor de erro
    info: '#3b82f6',         // Cor de informação

    // Backgrounds
    bg: '#0f0f23',           // Fundo principal
    'bg-secondary': '#1a1a2e', // Fundo secundário
    'bg-tertiary': '#16213e',  // Fundo terciário

    // Painéis e componentes
    panel: 'rgba(255, 255, 255, 0.05)',
    'panel-strong': 'rgba(255, 255, 255, 0.1)',
    'panel-hover': 'rgba(255, 255, 255, 0.08)',

    // Textos
    text: '#e2e8f0',
    'text-secondary': '#cbd5e1',
    'text-muted': '#94a3b8',

    // Bordas
    border: 'rgba(255, 255, 255, 0.1)',
    'border-hover': 'rgba(255, 255, 255, 0.15)',

    // Sombras
    shadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    'shadow-hover': '0 25px 80px rgba(0, 0, 0, 0.6)'
  },

  fonts: {
    family: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    'family-heading': '"Inter", system-ui, -apple-system, sans-serif',
    'family-body': '"Inter", system-ui, -apple-system, sans-serif'
  },

  images: {
    logo: {
      type: 'emoji',        // 'emoji' ou 'image'
      content: '🚀'         // Emoji ou URL da imagem
    },
    background: '/images/meu-background.jpg', // URL da imagem de fundo
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }
};
```

### Instalando um Tema

#### Opção 1: Via Módulo
```javascript
// modules/meu-tema/index.jsx
import { createModule } from "../../core/modules/createModule";
import meuTema from "../../themes/meu-tema.js";

export default createModule({
  name: "Meu Tema",
  onLoad: () => {
    // Registrar o tema quando o módulo carregar
    if (window.gmfThemeManager) {
      window.gmfThemeManager.registerTheme(meuTema.name, meuTema);
    }
  }
});
```

#### Opção 2: Via FrameworkProvider
```javascript
// main.jsx
import { FrameworkProvider } from "./core/FrameworkProvider";
import meuTema from "./themes/meu-tema.js";

const config = {
  themes: [meuTema] // Registrar temas na inicialização
};

<FrameworkProvider config={config}>
  {/* ... */}
</FrameworkProvider>
```

### Usando Temas no Código

```javascript
import { useTheme } from "./core/themes/themeManager";

function MeuComponente() {
  const { currentTheme, applyTheme, getAvailableThemes } = useTheme();

  const handleChangeTheme = () => {
    applyTheme('meu-tema');
  };

  return (
    <div>
      <p>Tema atual: {currentTheme?.displayName}</p>
      <button onClick={handleChangeTheme}>
        Aplicar Meu Tema
      </button>
    </div>
  );
}
```

### Gerenciador de Temas

Acesse `/themes` para:
- Visualizar tema atual
- Alternar entre temas instalados
- Instalar novos temas via arquivo
- Ver exemplos de código

### API do Sistema de Temas

```javascript
import {
  registerTheme,
  applyTheme,
  getCurrentTheme,
  getAvailableThemes,
  themeManager
} from "./core/themes/themeManager";

// Registrar tema
registerTheme('nome-tema', configTema);

// Aplicar tema
applyTheme('nome-tema');

// Obter tema atual
const temaAtual = getCurrentTheme();

// Listar temas disponíveis
const temas = getAvailableThemes();
```

### Estrutura de Cores CSS

Os temas aplicam variáveis CSS automaticamente:
```css
:root {
  --color-primary: #ff6b6b;
  --color-bg: #0f0f23;
  --font-family: "Inter", sans-serif;
  /* ... */
}
```

Use essas variáveis no seu CSS:
```css
.meu-componente {
  background: var(--color-panel);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

## 🔧 Desenvolvimento

### Adicionando Novos Recursos

1. **Módulos**: Crie novos módulos em `src/modules/`
2. **Core**: Estenda funcionalidades em `src/core/`
3. **Estilos**: Modifique `src/styles.css` ou crie temas

### Boas Práticas

- Mantenha módulos independentes
- Use permissões granulares
- Documente suas APIs
- Escreva testes para módulos críticos

## 📝 Documentação

- **[Guia de Temas](THEMES-GUIDE.md)**: Como criar temas personalizados para clientes
- **API Reference**: Documentação completa da API (em breve)
- **Exemplos**: Ver `src/core/examples/` para códigos de exemplo
## 📝 TODO / Melhorias Futuras

- [x] **Sistema de temas personalizáveis** ✅
- [ ] Sistema de plugins
- [ ] Cache de módulos
- [ ] Internacionalização (i18n)
- [ ] Testes automatizados
- [ ] CLI para criação de módulos
- [ ] Sistema de notificações
- [ ] API REST integrada
- [ ] Tema com variações (claro/escuro)
- [ ] Instalação de temas via arquivo JSON