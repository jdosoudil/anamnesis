import React from 'react';
import ReactDOM from 'react-dom/client';

import { IntlProvider } from 'react-intl';
import App from './App.tsx';
import locales from './locales/locales.ts';

import './css/index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const rootElement = document.getElementById('root');

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <IntlProvider messages={locales.en} locale="en" defaultLocale="en">
        <App />
      </IntlProvider>
    )
  },
  {
    path: '/en',
    element: (
      <IntlProvider messages={locales.en} locale="en" defaultLocale="en">
        <App />
      </IntlProvider>
    )
  },
  {
    path: '/fr',
    element: (
      <IntlProvider messages={locales.fr} locale="fr" defaultLocale="en">
        <App />
      </IntlProvider>
    )
  },
  {
    path: '/it',
    element: (
      <IntlProvider messages={locales.it} locale="it" defaultLocale="en">
        <App />
      </IntlProvider>
    )
  },
  {
    path: '/cs',
    element: (
      <IntlProvider messages={locales.cs} locale="cs" defaultLocale="en">
        <App />
      </IntlProvider>
    )
  },
]);

if (!rootElement)
  throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={router} />);