import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import { FrameworkProvider } from './core/FrameworkProvider'
import RouterView from './core/RouterView'

import { loadModules } from './core/loadModules';
import { resolveModules } from './core/resolveModules';
import Layout from './core/Layout';

const modules = loadModules();
const resolvedModules = await resolveModules(modules);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FrameworkProvider>
      <BrowserRouter>
       <Layout modules={resolvedModules}>
          <RouterView modules={resolvedModules} />
       </Layout>
      </BrowserRouter>
    </FrameworkProvider>
  </StrictMode>
);