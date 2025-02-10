import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../ErrorBoundary';
import NotFound from '../NotFound';

describe('Main routing', () => {
  it("redirects from '/' to '/search/1'", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
  });

  it('renders App component on /search/1', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/search/1']}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
  });

  it('renders NotFound component on unknown route', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/unknown']}>
          <ErrorBoundary>
            <Routes>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </MemoryRouter>
      );
    });

    // 👀 Выведем текущий DOM для дебага
    screen.debug();

    // ✅ Ожидание загрузки компонента 404
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /404 - page not found/i })
      ).toBeInTheDocument();
    });
  });
});
