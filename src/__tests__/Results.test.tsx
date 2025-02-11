import { render, screen, fireEvent } from '@testing-library/react';
import Results from '../Results';

describe('Results component', () => {
  it('renders the correct number of cards', () => {
    const mockResults = [
      {
        url: 'https://swapi.dev/api/people/1/',
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
      },
      {
        url: 'https://swapi.dev/api/people/2/',
        name: 'Darth Vader',
        gender: 'male',
        birth_year: '41.9BBY',
      },
    ];

    render(
      <Results results={mockResults} onItemClick={() => {}} error={null} />
    );
    expect(screen.getAllByTestId('card')).toHaveLength(2);
  });

  it("displays an error message if there's an error", () => {
    render(<Results results={[]} onItemClick={() => {}} error="API error" />);
    expect(screen.getByText('API error')).toBeInTheDocument();
  });

  it("displays 'No results found' when there are no cards", () => {
    render(<Results results={[]} onItemClick={() => {}} error={null} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('opens details when a card is clicked', () => {
    const mockResults = [
      {
        url: 'https://swapi.dev/api/people/1/',
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
      },
    ];
    const mockOnItemClick = jest.fn();

    render(
      <Results
        results={mockResults}
        onItemClick={mockOnItemClick}
        error={null}
      />
    );

    fireEvent.click(screen.getByTestId('card'));
    expect(mockOnItemClick).toHaveBeenCalledWith('1');
  });
});
