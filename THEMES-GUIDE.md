# 🎨 Guia Completo: Criando Temas Customizados

Este guia mostra como criar e instalar temas personalizados no GMF Framework para cada cliente.

## 📁 Estrutura de Arquivos

```
src/
├── themes/
│   ├── cliente-xyz.js          # Tema do cliente
│   └── examples/               # Exemplos de temas
├── modules/
│   └── theme-installer/        # Módulo que instala o tema
│       ├── index.jsx
│       └── ThemeInstallerPage.jsx
```

## 🚀 Implementação Passo a Passo

### 1. Criar o Arquivo de Tema

```javascript
// src/themes/cliente-xyz.js
export default {
  name: 'cliente-xyz',
  displayName: 'Cliente XYZ',
  description: 'Tema personalizado para o Cliente XYZ',

  colors: {
    // Defina todas as cores da identidade visual
    primary: '#8b5cf6',      // Roxo institucional
    secondary: '#06b6d4',    // Ciano
    accent: '#f59e0b',       // Âmbar

    // Backgrounds
    bg: '#0a0a0a',
    'bg-secondary': '#1a1a1a',
    'bg-tertiary': '#2a2a2a',

    // Componentes
    panel: 'rgba(139, 92, 246, 0.08)',
    text: '#f0f0f0',
    border: 'rgba(139, 92, 246, 0.2)',

    // Estados
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },

  fonts: {
    family: '"Inter", system-ui, -apple-system, sans-serif'
  },

  images: {
    logo: {
      type: 'emoji',
      content: '🏢'
    },
    background: '/images/cliente-xyz-bg.jpg'
  }
};
```

### 2. Criar Módulo Instalador

```javascript
// src/modules/theme-cliente-xyz/index.jsx
import { createModule } from "../../core/modules/createModule";
import clienteXyzTheme from "../../themes/cliente-xyz.js";

export default createModule({
  name: "Tema Cliente XYZ",
  version: "1.0.0",
  description: "Instala o tema personalizado do Cliente XYZ",

  // Opcional: adicionar ao menu se quiser gerenciar
  menu: {
    label: "Meu Tema",
    path: "/meu-tema",
    icon: "🎨",
    order: 100
  },

  routes: [
    {
      path: "/meu-tema",
      element: <div>Tema personalizado ativo!</div>
    }
  ],

  // Instalar tema quando o módulo carregar
  onLoad: () => {
    console.log("🎨 Instalando tema do Cliente XYZ...");

    // Registrar o tema
    if (typeof window !== 'undefined' && window.gmfThemeManager) {
      window.gmfThemeManager.registerTheme(clienteXyzTheme.name, clienteXyzTheme);
      console.log("✅ Tema 'cliente-xyz' instalado!");
    }
  },

  onUnload: () => {
    console.log("🎨 Removendo tema do Cliente XYZ...");
    // Opcional: cleanup se necessário
  }
});
```

### 3. Configurar Imagens (Opcional)

Coloque imagens em `public/images/`:
```
public/
├── images/
│   ├── cliente-xyz-bg.jpg
│   └── cliente-xyz-logo.png
```

### 4. Testar a Implementação

1. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

2. **Acesse o gerenciador de temas:**
   - Vá para `http://localhost:5180/themes`
   - Verifique se o tema aparece na lista
   - Clique para aplicar

3. **Verifique o console:**
   - Deve mostrar "Tema 'cliente-xyz' instalado!"

## 🎨 Personalização Avançada

### Usando Imagens Customizadas

```javascript
images: {
  logo: {
    type: 'image',
    content: '/images/minha-logo.png'
  },
  background: '/images/meu-background.jpg',
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}
```

### Aplicando Tema Programaticamente

```javascript
import { useContext } from 'react';
import { FrameworkContext } from './core/FrameworkProvider';

function MeuComponente() {
  const framework = useContext(FrameworkContext);

  const aplicarTemaCliente = () => {
    framework.applyTheme('cliente-xyz');
  };

  return (
    <button onClick={aplicarTemaCliente}>
      Aplicar Tema do Cliente
    </button>
  );
}
```

### Tema com Múltiplas Variações

```javascript
// Tema com variações (claro/escuro)
export default {
  name: 'cliente-xyz',
  variants: {
    light: {
      colors: { /* cores claras */ }
    },
    dark: {
      colors: { /* cores escuras */ }
    }
  }
};
```

## 📦 Distribuição para Clientes

### Opção 1: Arquivo Único
Envie apenas o arquivo `cliente-xyz.js` e instruções de instalação.

### Opção 2: Módulo Completo
Envie o módulo completo em `modules/theme-cliente-xyz/`.

### Opção 3: Tema como Plugin
Crie um arquivo separado que pode ser importado dinamicamente.

## 🔧 Troubleshooting

### Tema não aparece
- Verifique se o módulo está sendo carregado
- Confirme que `onLoad` está sendo executado
- Verifique erros no console

### Cores não aplicam
- Certifique-se que todas as propriedades obrigatórias estão definidas
- Verifique se os nomes das variáveis CSS estão corretos
- Use o inspetor para ver se as variáveis estão sendo aplicadas

### Imagens não carregam
- Coloque imagens em `public/images/`
- Use caminhos absolutos: `/images/minha-imagem.jpg`
- Verifique se os arquivos existem

## 📋 Checklist de Tema

- [ ] `name`: único e descritivo
- [ ] `displayName`: nome amigável
- [ ] `description`: breve descrição
- [ ] `colors`: todas as cores necessárias
- [ ] `fonts`: família de fontes
- [ ] `images`: logo e background (opcional)
- [ ] Testado no gerenciador de temas
- [ ] Compatível com todos os componentes
- [ ] Documentação incluída

## 🎯 Exemplos de Temas por Setor

- **Financeiro**: Cores sóbrias, fontes serifadas
- **Tecnologia**: Cores vibrantes, fontes modernas
- **Saúde**: Cores calmantes, alta legibilidade
- **E-commerce**: Cores chamativas, foco em conversão
- **Educação**: Cores amigáveis, fontes claras

## 📞 Suporte

Para dúvidas sobre criação de temas:
1. Consulte este guia
2. Verifique os exemplos em `src/core/themes/examples/`
3. Teste no gerenciador de temas (`/themes`)
4. Abra uma issue no repositório