// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopControls from '../TopControls';

describe('TopControls Component', () => {
  it('renders input and button', () => {
    render(
      <BrowserRouter>
        <TopControls onSearch={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Search Button');
  });

  it('calls onSearch when clicking the button', () => {
    const mockSearch = jest.fn();
    render(
      <BrowserRouter>
        <TopControls onSearch={mockSearch} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockSearch).toHaveBeenCalled();
  });
});
