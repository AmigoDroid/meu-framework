
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { FrameworkProvider } from "./core/FrameworkProvider";
import { AuthProvider } from "./core/auth/AuthProvider";
import RouterView from "./core/RouterView";

import { loadModules } from "./core/modules/loadModules";
import { resolveModules } from "./core/modules/resolveModules";
import Layout from "./core/Layout";
import "./styles.css";

// Importar e registrar plugins
import { pluginSystem } from "./core/plugin/pluginSystem";
import { notificationsPlugin, analyticsPlugin, themeSwitcherPlugin, auditPlugin, autoBackupPlugin } from "./plugins/examples";

pluginSystem.registerPlugin('notifications', notificationsPlugin);
pluginSystem.registerPlugin('analytics', analyticsPlugin);
pluginSystem.registerPlugin('theme-switcher', themeSwitcherPlugin);
pluginSystem.registerPlugin('audit', auditPlugin);
pluginSystem.registerPlugin('backup', autoBackupPlugin);

const modules = loadModules();
const resolvedModules = await resolveModules(modules);

createRoot(document.getElementById('root')).render(
  <FrameworkProvider>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout modules={resolvedModules}>
            <RouterView modules={resolvedModules} />
          </Layout>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </FrameworkProvider>
);
