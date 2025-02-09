import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import TopControls from './TopControls';
import Results from './Results';
import Details from './Details';
import Spinner from './Spinner';
import Pagination from './Pagination';
import { getResults } from './services/ApiService';
import useSearchValue from './hooks/useSearchValue';
import './App.css';

const App: React.FC = () => {
  const { searchValue, setSearchValue } = useSearchValue();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams<{ page?: string }>();

  const currentPage = Number(page) || 1;
  const searchParams = new URLSearchParams(location.search);
  const selectedDetails = searchParams.get('details');

  useEffect(() => {
    fetchResults(searchValue, currentPage);
  }, [searchValue, currentPage]);

  const fetchResults = async (searchTerm: string, page: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getResults(searchTerm, page);
      setResults(data.results);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButtonClick = () => {
    navigate(`/search/${currentPage}`);
  };

  const handleItemClick = (id: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('details', id);

    navigate(`${window.location.pathname}?${newParams.toString()}`, {
      replace: true,
    });
  };

  const handleCloseDetails = () => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete('details');

    const newUrl = newParams.toString()
      ? `${window.location.pathname}?${newParams.toString()}`
      : window.location.pathname;

    navigate(newUrl, { replace: true });
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/search/${newPage}`);
  };

  return (
    <div className="app-container">
      <TopControls
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearchButtonClick}
      />

      <div className="content">
        <div className="left-section" onClick={handleCloseDetails}>
          {loading ? (
            <Spinner />
          ) : (
            <Results
              results={results}
              onItemClick={handleItemClick}
              error={error}
            />
          )}
        </div>

        {selectedDetails && (
          <div className="right-section">
            <Details itemId={selectedDetails} onClose={handleCloseDetails} />
          </div>
        )}
      </div>

      <div className="pagination-container">
        {results.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default App;
