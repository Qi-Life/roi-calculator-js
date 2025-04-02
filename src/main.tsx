import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';
import { LayoutConfigProvider } from './provider/theme-config-provider.tsx';
import Routes from './routes/index.tsx';
import { ToasterConfig } from '@/components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LayoutConfigProvider>
      <>
        <ToasterConfig />
        <Routes />
      </>
    </LayoutConfigProvider>
  </React.StrictMode>,
);
