import React from 'react';
import Card from './Card';

interface Character {
  name: string;
  gender: string;
  birth_year: string;
  url: string;
}

interface ResultsProps {
  results: Character[];
  onItemClick: (id: string) => void;
  error: string | null;
}

const Results: React.FC<ResultsProps> = ({ results, onItemClick, error }) => {
  if (error) {
    return (
      <table className="results-table">
        <tbody>
          <tr>
            <td colSpan={2} className="error-message">
              {error}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (results.length === 0) {
    return (
      <table className="results-table">
        <tbody>
          <tr>
            <td colSpan={2} className="no-results">
              No results found
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Item Description</th>
        </tr>
      </thead>
      <tbody>
        {results.map((item) => {
          const id = item.url.split('/').slice(-2, -1)[0];
          return (
            <Card
              key={id}
              id={id}
              name={item.name}
              description={`${item.gender}, ${item.birth_year}`}
              onClick={onItemClick}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Results;
