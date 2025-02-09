import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopControls from './TopControls';
import Results from './Results';
import Spinner from './Spinner';
import { getResults } from './services/ApiService';
import useSearchValue from './hooks/useSearchValue';
import './App.css';

const App: React.FC = () => {
  const { searchValue, setSearchValue } = useSearchValue();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const { page } = useParams<{ page?: string }>();
  const navigate = useNavigate();

  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    fetchResults(searchValue, currentPage);
  }, [searchValue, currentPage]);

  const fetchResults = async (searchTerm: string, page: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getResults(searchTerm, page);
      setResults(data.results);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButtonClick = () => {
    navigate(`/search/1`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      navigate(`/search/${newPage}`);
    }
  };

  return (
    <div className="app-container">
      <TopControls
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearchButtonClick}
      />

      <div className="results-wrapper">
        {loading ? <Spinner /> : <Results results={results} error={error} />}
      </div>

      {results.length > 0 && (
        <div className="pagination-controls">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
