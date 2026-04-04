# 🔌 GERENCIADOR DE PLUGINS - GUIA DE USO

## 📍 Localização
O módulo está em: **Sidebar → SISTEMA → Gerenciador de Plugins**

URL: `/plugin-manager`

---

## ✨ Funcionalidades

### 1. **Dashboard de Plugins**
- Ver quantidade de plugins instalados
- Ver quantidade de rotas adicionadas
- Ver quantidade de menus adicionados

### 2. **Instalar Plugins**
- Selecionar plugins disponíveis
- Visualizar features de cada plugin
- Instalar múltiplos plugins de uma vez

### 3. **Gerenciar Plugins Instalados**
- Ver lista de todos os plugins instalados
- Ver versão de cada plugin
- Ver data e hora de instalação
- Desinstalar plugins individual

---

## 🚀 Como Usar

### **Passo 1: Acessar o Gerenciador**
1. Abra a aplicação
2. No menu lateral, vá para **SISTEMA**
3. Clique em **Gerenciador de Plugins**

### **Passo 2: Instalar um Plugin**
1. Clique no botão **"+ Instalar Plugin"**
2. Aparecerá a lista de plugins disponíveis:
   - ✅ Notifications Plugin (notificações)
   - 📊 Analytics Plugin (análises)
   - 🎨 Theme Switcher (temas)
   - 📝 Audit Plugin (auditoria)
   - 💾 Auto Backup (backups automáticos)

3. Marque os plugins que deseja
4. Clique em **"Instalar X Plugin(s)"**

### **Passo 3: Ver Plugins Instalados**
- Após instalar, você verá os cards com os plugins
- Cada card mostra:
  - Nome do plugin
  - Versão
  - Data de instalação
  - Status (Ativo ✓)
  - Botão de desinstalação (🗑️)

### **Passo 4: Desinstalar um Plugin**
1. Localize o plugin na lista
2. Clique no botão **🗑️** no canto direito do card
3. O plugin será removido imediatamente

---

## 📊 Exemplo de Plugins

### **Notifications Plugin 🔔**
- Adiciona item de menu "Notificações"
- Ideal para sistemas de alertas em tempo real

### **Analytics Plugin 📊**
- Adiciona item de menu "Analytics"
- Perfeito para dashboards de análise

### **Theme Switcher 🎨**
- Permite alternar temas da aplicação
- Salva preferência no localStorage

### **Audit Plugin 📝**
- Registra todas as ações importantes
- Cria histórico de eventos

### **Auto Backup 💾**
- Realiza backups automáticos
- Pode ser configurado com intervalo customizado

---

## 🔧 Criar Seus Próprios Plugins

### **Estrutura de um Plugin**

```javascript
export const meuPlugin = {
  name: "Meu Plugin",
  version: "1.0.0",
  description: "O que meu plugin faz",
  
  install(app) {
    // Adicionar rotas
    app.addRoutes({
      path: "/minha-pagina",
      element: <MinhaPage />
    });
    
    // Adicionar menus
    app.addMenu({
      label: "Minha Página",
      path: "/minha-pagina",
      icon: "⚡"
    });
    
    console.log('✅ Plugin instalado!');
  }
};
```

### **Registrar no Gerenciador**

1. Crie seu plugin em `src/plugins/meuPlugin.js`
2. Edite `src/modules/plugin-manager/components/PluginInstaller.jsx`
3. Adicione na lista `availablePlugins`:

```javascript
const availablePlugins = [
  // ... plugins existentes ...
  {
    id: 'meu-plugin',
    plugin: meuPlugin,
    description: 'Descrição do meu plugin',
    features: ['Feature 1', 'Feature 2']
  }
];
```

4. O plugin aparecerá no gerenciador!

---

## 📋 Métodos Disponíveis

Dentro do método `install(app)`, você pode usar:

```javascript
// Adicionar rota
app.addRoutes({
  path: "/nova-page",
  element: <NovaPage />
});

// Adicionar menu
app.addMenu({
  label: "Novo Item",
  path: "/nova-page",
  icon: "📌"
});

// Obter rotas adicionadas
const rotas = app.getRoutes();

// Obter menus adicionados
const menus = app.getMenus();

// Desinstalar um plugin
app.uninstall("Nome do Plugin");
```

---

## 💡 Dicas

✅ **Faça:**
- Use nomes únicos para seus plugins
- Documente o que cada plugin faz
- Teste antes de disponibilizar
- Use emojis para identificar plugins visualmente

❌ **Evite:**
- Não sobreescreva rotas/menus existentes
- Não deixe plugins sem tratamento de erros
- Não crie dependências entre plugins
- Não use setInterval sem limpeza

---

## 🎯 Casos de Uso

### **Sistema de E-commerce**
Criar plugins para:
- Gerenciamento de catálogo
- Sistema de pedidos
- Processamento de pagamentos

### **Sistema de RH**
Criar plugins para:
- Folha de pagamento
- Gestão de férias
- Avaliação de desempenho

### **Sistema de Suporte**
Criar plugins para:
- Tickets de suporte
- FAQ
- Base de conhecimento

---

## ⚡ Começar Agora

1. Abra o Gerenciador de Plugins
2. Instale o plugin de **Auditoria** para rastrear ações
3. Instale o **Auto Backup** para proteger dados
4. Explore os outros plugins!

---

**Dúvidas?** Consulte o arquivo `GUIDE_PLUGINS.md` para mais informações técnicas.
