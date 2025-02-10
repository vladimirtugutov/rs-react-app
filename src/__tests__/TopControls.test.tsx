import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TopControls from '../TopControls';

describe('TopControls', () => {
  it('renders the input field and search button', () => {
    render(
      <TopControls
        searchValue=""
        setSearchValue={() => {}}
        onSearch={() => {}}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });

  it('calls onSearch when clicking the button', () => {
    const mockSearch = jest.fn();

    render(
      <TopControls
        searchValue="test"
        setSearchValue={() => {}}
        onSearch={mockSearch}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockSearch).toHaveBeenCalled();
  });

  it('updates the search value when typing', () => {
    const mockSetSearchValue = jest.fn();

    render(
      <TopControls
        searchValue=""
        setSearchValue={mockSetSearchValue}
        onSearch={() => {}}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Luke' },
    });
    expect(mockSetSearchValue).toHaveBeenCalledWith('Luke');
  });
});
