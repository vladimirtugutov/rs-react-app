import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error!');
};

describe('ErrorBoundary component', () => {
  // Подавляем console.error, чтобы тест не прерывался на ошибке
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>Safe Content</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe Content')).toBeInTheDocument();
  });

  it('catches errors and displays an error message', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Error: Test error!/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refresh page/i })
    ).toBeInTheDocument();
  });

  it('logs error to services', () => {
    const logErrorSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(logErrorSpy).toHaveBeenCalledWith(
      'Error: Test error!',
      expect.any(String)
    );

    logErrorSpy.mockRestore();
  });

  it('refreshes the page when the refresh button is clicked', () => {
    const historySpy = jest
      .spyOn(global.history, 'go')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /refresh page/i }));
    expect(historySpy).toHaveBeenCalledWith(0);

    historySpy.mockRestore();
  });
});
