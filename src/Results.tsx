import React from 'react';

interface Character {
  name: string;
  gender: string;
  birth_year: string;
}

interface ResultsProps {
  results: Character[];
  error: string | null;
}

const Results: React.FC<ResultsProps> = ({ results, error }) => {
  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Item Description</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan={2} className="error-message">
              {error}
            </td>
          </tr>
        ) : results.length === 0 ? (
          <tr>
            <td colSpan={2} className="no-results">
              No results found
            </td>
          </tr>
        ) : (
          results.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>
                {item.gender}, {item.birth_year}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Results;
