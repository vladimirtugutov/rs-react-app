import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import Details from '../Details';
import { MemoryRouter } from 'react-router-dom';

describe('Details component', () => {
  const mockData = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
  };

  beforeEach(() => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              new Response(JSON.stringify(mockData), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              })
            );
          }, 100);
        })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('displays a loading indicator while fetching data', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Details itemId="1" onClose={() => {}} />
        </MemoryRouter>
      );
    });

    screen.debug();

    // Проверяем, что спиннер загрузки присутствует в DOM
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Ожидаем исчезновение спиннера после загрузки данных
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('displays detailed card data correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Details itemId="1" onClose={() => {}} />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(mockData.name)).toBeInTheDocument();
    });

    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText(mockData.height)).toBeInTheDocument();
    expect(screen.getByText(/Mass:/)).toBeInTheDocument();
    expect(screen.getByText(mockData.mass)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color:/)).toBeInTheDocument();
    expect(screen.getByText(mockData.hair_color)).toBeInTheDocument();
    expect(screen.getByText(/Skin Color:/)).toBeInTheDocument();
    expect(screen.getByText(mockData.skin_color)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color:/)).toBeInTheDocument();
    expect(screen.getByText(mockData.eye_color)).toBeInTheDocument();
  });

  it('closes the component when the close button is clicked', async () => {
    const onCloseMock = jest.fn();

    await act(async () => {
      render(
        <MemoryRouter>
          <Details itemId="1" onClose={onCloseMock} />
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByText(mockData.name)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole('button', { name: /x/i }));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
