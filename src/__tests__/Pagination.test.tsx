import { render, screen, fireEvent } from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Pagination from '../Pagination';
import React, { useState } from 'react';

const PaginationTestWrapper: React.FC<{
  initialPage: number;
  totalPages: number;
}> = ({ initialPage, totalPages }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(initialPage);

  const hasMorePages = page < totalPages;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <>
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        hasMorePages={hasMorePages}
      />
      <p data-testid="current-url">{location.search}</p>
    </>
  );
};

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route
            path="/"
            element={<PaginationTestWrapper initialPage={1} totalPages={5} />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Проверяем, что начальный URL содержит ?page=1
    expect(screen.getByTestId('current-url')).toHaveTextContent('?page=1');

    // Кликаем "Next"
    fireEvent.click(screen.getByText('Next'));

    // Проверяем обновленный URL после клика на "Next"
    expect(screen.getByTestId('current-url')).toHaveTextContent('?page=2');

    // Кликаем "Prev"
    fireEvent.click(screen.getByText('Prev'));

    // Проверяем, что вернулись на страницу 1
    expect(screen.getByTestId('current-url')).toHaveTextContent('?page=1');
  });

  it("disables 'Prev' button on first page", () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          onPageChange={() => {}}
          hasMorePages={true}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeDisabled();
  });

  it('calls onPageChange with correct values', () => {
    const onPageChangeMock = jest.fn();

    render(
      <MemoryRouter>
        <Pagination
          currentPage={3}
          onPageChange={onPageChangeMock}
          hasMorePages={true}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText('Prev'));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it("disables 'Next' button when on the last page", () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={5}
          onPageChange={() => {}}
          hasMorePages={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Next')).toBeDisabled();
  });
});
