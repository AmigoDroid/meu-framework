/**
 * EXEMPLOS DE PLUGINS PERSONALIZADOS
 * 
 * Copie e adapte esses exemplos para criar seus próprios plugins
 */

import { NotificationsPage, AnalyticsPage } from './pages';

// ============================================
// EXEMPLO 1: Plugin de Notificações
// ============================================
export const notificationsPlugin = {
  name: "Notifications Plugin",
  version: "1.0.0",
  description: "Sistema de notificações em tempo real",
  
  install(app) {
    console.log('🔔 Ativando plugin de notificações...');

    // Adicionar rota
    app.addRoutes({
      path: "/notifications",
      element: <NotificationsPage />
    });

    // Adicionar item no menu
    app.addMenu({
      label: "Notificações",
      path: "/notifications",
      icon: "🔔",
      section: "SISTEMA"
    });

    // Registrar hook (opcional)
    console.log('✅ Plugin Notificações pronto');
  }
};

// ============================================
// EXEMPLO 2: Plugin de Analytics
// ============================================
export const analyticsPlugin = {
  name: "Analytics Plugin",
  version: "1.0.0",
  description: "Dashboard de analytics avançado",
  
  install(app) {
    console.log('📊 Ativando plugin de analytics...');

    // Adicionar rota
    app.addRoutes({
      path: "/analytics",
      element: <AnalyticsPage />
    });

    app.addMenu({
      label: "Analytics",
      path: "/analytics",
      icon: "📈",
      section: "SISTEMA"
    });

    console.log('✅ Plugin Analytics pronto');
  }
};

// ============================================
// EXEMPLO 3: Plugin de Theme Switcher
// ============================================
export const themeSwitcherPlugin = {
  name: "Theme Switcher",
  version: "1.0.0",
  description: "Permite alternar temas da aplicação",
  
  install(app) {
    console.log('🎨 Ativando plugin de temas...');

    // Adiciona funcionalidade ao localStorage
    window.themeManager = {
      setTheme(name) {
        localStorage.setItem('gmf-current-theme', name);
        window.location.reload();
      },
      getTheme() {
        return localStorage.getItem('gmf-current-theme') || 'default';
      }
    };

    console.log('✅ Plugin Theme Switcher pronto');
  }
};

// ============================================
// EXEMPLO 4: Plugin de Auditoria
// ============================================
export const auditPlugin = {
  name: "Audit Plugin",
  version: "1.0.0",
  description: "Registra todas as ações importantes",
  
  install(app) {
    console.log('📝 Ativando plugin de auditoria...');

    // Criar sistema global de logs
    window.auditLog = {
      logs: [],
      log(action, details) {
        const entry = {
          timestamp: new Date().toISOString(),
          action,
          details,
          user: localStorage.getItem('user') || 'anônimo'
        };
        this.logs.push(entry);
        console.log('📋 Auditoria:', entry);
      },
      export() {
        return JSON.stringify(this.logs, null, 2);
      }
    };

    console.log('✅ Plugin Audit pronto');
  }
};

// ============================================
// EXEMPLO 5: Plugin de Backup Automático
// ============================================
export const autoBackupPlugin = {
  name: "Auto Backup",
  version: "1.0.0",
  description: "Realizar backups automáticos",
  
  install(app) {
    console.log('💾 Ativando plugin de backup...');

    window.backupManager = {
      interval: null,
      backups: [],
      
      start(intervalMs = 3600000) { // Padrão: 1 hora
        this.interval = setInterval(() => {
          const backup = {
            timestamp: new Date().toISOString(),
            data: localStorage.getItem('gmf-data') || '{}'
          };
          this.backups.push(backup);
          console.log('✅ Backup realizado');
        }, intervalMs);
      },
      
      stop() {
        clearInterval(this.interval);
        console.log('⏸️ Backups pausados');
      }
    };

    // Iniciar backups automaticamente
    window.backupManager.start();

    console.log('✅ Plugin Auto Backup pronto');
  }
};

// ============================================
// COMO USAR ESSES PLUGINS
// ============================================
/*

No seu main.jsx:

import { pluginSystem } from './core/plugin/pluginSystem';
import { 
  notificationsPlugin,
  analyticsPlugin,
  themeSwitcherPlugin,
  auditPlugin,
  autoBackupPlugin
} from './plugins/examples';

// ✅ Registrar plugins que deseja usar
pluginSystem.use(notificationsPlugin);
pluginSystem.use(analyticsPlugin);
pluginSystem.use(themeSwitcherPlugin);
pluginSystem.use(auditPlugin);
pluginSystem.use(autoBackupPlugin);

// Depois renderizar a app com as rotas e menus do sistema de plugins

*/

// Plugins são registrados em main.jsx
