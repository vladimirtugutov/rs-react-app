import React from 'react';

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
  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    id: string
  ) => {
    event.stopPropagation();
    onItemClick(id);
  };

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
          results.map((item) => {
            const id = item.url.split('/').slice(-2, -1)[0];
            return (
              <tr
                key={id}
                onClick={(event) => handleRowClick(event, id)}
                className="clickable"
              >
                <td>{item.name}</td>
                <td>
                  {item.gender}, {item.birth_year}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default Results;
