
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { FrameworkProvider } from "./core/FrameworkProvider";
import { AuthProvider } from "./core/auth/AuthProvider";
import RouterView from "./core/RouterView";

import { loadModules } from "./core/modules/loadModules";
import { resolveModules } from "./core/modules/resolveModules";
import Layout from "./core/Layout";
import "./styles.css";

const modules = loadModules();
const resolvedModules = await resolveModules(modules);

createRoot(document.getElementById('root')).render(
  <FrameworkProvider>
    <AuthProvider>
      <BrowserRouter>
        <Layout modules={resolvedModules}>
          <RouterView modules={resolvedModules} />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  </FrameworkProvider>
);
