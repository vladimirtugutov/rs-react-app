import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('Card component', () => {
  it('renders card data correctly', () => {
    render(
      <table>
        <tbody>
          <Card
            id="1"
            name="Luke Skywalker"
            description="Jedi Knight"
            onClick={() => {}}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Jedi Knight')).toBeInTheDocument();
  });

  it('triggers onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <table>
        <tbody>
          <Card
            id="1"
            name="Yoda"
            description="Master Jedi"
            onClick={handleClick}
          />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByTestId('card'));
    expect(handleClick).toHaveBeenCalledWith('1');
  });
});
