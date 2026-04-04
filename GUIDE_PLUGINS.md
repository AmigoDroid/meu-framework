/**
 * GUIA COMPLETO: Sistema de Plugins
 * 
 * Este arquivo mostra como usar o sistema de plugins de forma prática
 */

// ============================================
// PASSO 1: Entender a Estrutura
// ============================================

/*
Um plugin é um objeto JavaScript com a seguinte estrutura:

{
  name: "Nome do Plugin",
  version: "1.0.0",
  description: "O que o plugin faz",
  install(app) {
    // Função chamada quando o plugin é registrado
    // O parâmetro 'app' é a instância do pluginSystem
  }
}
*/

// ============================================
// PASSO 2: Criar um Plugin Simples
// ============================================

/*
Exemplo: Plugin que adiciona uma página de Status

export const statusPlugin = {
  name: "Status Plugin",
  version: "1.0.0",
  install(app) {
    // Adicionar uma nova rota
    app.addRoutes({
      path: "/status",
      element: <StatusPage />
    });

    // Adicionar item de menu
    app.addMenu({
      label: "Status",
      path: "/status",
      icon: "🟢"
    });
  }
};
*/

// ============================================
// PASSO 3: Registrar Plugins no main.jsx
// ============================================

/*
// main.jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { FrameworkProvider } from "./core/FrameworkProvider";
import { AuthProvider } from "./core/auth/AuthProvider";
import RouterView from "./core/RouterView";
import { pluginSystem } from "./core/plugin/pluginSystem";

import { loadModules } from "./core/modules/loadModules";
import { resolveModules } from "./core/modules/resolveModules";
import Layout from "./core/Layout";
import "./styles.css";

// ✅ Importar seus plugins
import { statusPlugin, analyticsPlugin, notificationPlugin } from "./plugins/custom";

// Carregar módulos nativos
const modules = loadModules();
const resolvedModules = await resolveModules(modules);

// ✅ Registrar plugins ANTES de render
pluginSystem.use(statusPlugin);
pluginSystem.use(analyticsPlugin);
pluginSystem.use(notificationPlugin);

// Obter rotas e menus dos plugins
const pluginRoutes = pluginSystem.getRoutes();
const pluginMenus = pluginSystem.getMenus();

createRoot(document.getElementById('root')).render(
  <FrameworkProvider>
    <AuthProvider>
      <BrowserRouter>
        <Layout modules={resolvedModules} extraMenus={pluginMenus}>
          <RouterView modules={resolvedModules} extraRoutes={pluginRoutes} />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  </FrameworkProvider>
);
*/

// ============================================
// PASSO 4: Métodos Disponíveis do pluginSystem
// ============================================

/*
app.use(plugin)                    // Registra um plugin
app.addRoutes(route)               // Adiciona uma rota
app.addMenu(menu)                  // Adiciona item de menu
app.getRoutes()                    // Retorna todas as rotas dos plugins
app.getMenus()                     // Retorna todos os menus dos plugins
app.getInstalledPlugins()          // Retorna lista de plugins instalados
app.on(hookName, callback)         // Registra um hook customizado
app.uninstall(pluginName)          // Desinstal um plugin

// Hooks disponíveis
app.on('beforeInstall', (plugin) => {})   // Antes de instalar
app.on('afterInstall', (plugin) => {})    // Depois de instalar
app.on('beforeUninstall', (plugin) => {}) // Antes de desinstalar
app.on('afterUninstall', (plugin) => {})  // Depois de desinstalar
*/

// ============================================
// PASSO 5: Exemplo Completo de Plugin
// ============================================

/*
// plugins/myCustomPlugin.js
import MyCustomPage from '../modules/custom/MyCustomPage';

export const myCustomPlugin = {
  name: "My Custom Plugin",
  version: "1.0.0",
  description: "Um plugin personalizado",
  
  install(app) {
    console.log('🚀 Instalando meu plugin...');

    // Adicionar rota
    app.addRoutes({
      path: "/my-custom-page",
      element: <MyCustomPage />
    });

    // Adicionar menu
    app.addMenu({
      label: "Minha Página",
      path: "/my-custom-page",
      icon: "✨",
      section: "CUSTOM" // Seção do menu
    });

    // Inicializar funcionalidade
    window.myFeature = {
      doSomething() {
        console.log('Fazendo algo!');
      }
    };

    console.log('✅ Plugin instalado com sucesso');
  }
};

// No main.jsx:
// import { myCustomPlugin } from './plugins/myCustomPlugin';
// pluginSystem.use(myCustomPlugin);
*/

// ============================================
// PASSO 6: Monitorar Plugins
// ============================================

/*
// main.jsx
import { pluginSystem } from "./core/plugin/pluginSystem";

// Monitorar quando plugins são instalados
pluginSystem.on('afterInstall', (plugin) => {
  console.log(`Plugin "${plugin.name}" foi instalado!`);
});

// Monitorar quando plugins são desinstalados
pluginSystem.on('afterUninstall', (data) => {
  console.log(`Plugin "${data.name}" foi removido!`);
});

// Ver todos os plugins instalados
console.log('Plugins instalados:', pluginSystem.getInstalledPlugins());
*/

// ============================================
// PASSO 7: Desativar um Plugin em Tempo de Execução
// ============================================

/*
// Em qualquer página/componente
import { pluginSystem } from './core/plugin/pluginSystem';

// Desinstalar um plugin
pluginSystem.uninstall("My Custom Plugin");

// Nota: Isso remove da lista, mas não remove a rota/menu já renderizado
// Para melhor controle, use flags de ativação no plugin
*/

// ============================================
// DICAS E BOAS PRÁTICAS
// ============================================

/*
✅ FAÇA:
  - Use nomes criativosúnicos para seus plugins
  - Documente o que seu plugin faz
  - Teste antes de adicionar comentários de erro bons
  - Use pattern {name, version, description, install}
  - Adicione console.log para debugging

❌ NÃO FAÇA:
  - Não modifique modules carregadas dinamicamente
  - Não sobreescreva rotas/menus existentes sem avisar
  - Não deixeCódigo de erro sem tratamento
  - Não crie dependências entre plugins
  - Não use setTimeout/setInterval sem limpeza
*/

export default {};
