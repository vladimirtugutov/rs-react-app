import React, { useState, useEffect } from 'react';
import TopControls from './TopControls';
import Results from './Results';
import Spinner from './Spinner';
import { getResults } from './services/ApiService.ts';
import './App.css';

const App: React.FC = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSimulatedError, setHasSimulatedError] = useState(false);

  useEffect(() => {
    fetchResults(localStorage.getItem('prevSearchValue') || '');
  }, []);

  const fetchResults = async (searchTerm = '') => {
    setLoading(true);
    setError(null);

    try {
      const data = await getResults(searchTerm);
      setResults(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleErrorButtonClick = () => {
    setHasSimulatedError(true);
  };

  if (hasSimulatedError) {
    throw new Error('Simulated error by Error Button click.');
  }

  return (
    <div className="app-container">
      <TopControls onSearch={fetchResults} />

      <div className="results-wrapper">
        {loading ? <Spinner /> : <Results results={results} error={error} />}
      </div>

      <div className="error-button-container">
        <button onClick={handleErrorButtonClick}>Error Button</button>
      </div>
    </div>
  );
};

export default App;
