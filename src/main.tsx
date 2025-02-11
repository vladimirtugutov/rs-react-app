import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './NotFound';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/search/1" replace />} />
            <Route path="/search/:page" element={<App />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
