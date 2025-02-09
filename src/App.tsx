import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopControls from './TopControls';
import Results from './Results';
import Spinner from './Spinner';
import NotFound from './NotFound';
import { getResults } from './services/ApiService';
import './App.css';

const Home: React.FC = () => {
  return <h2>Welcome to the Star Wars Database</h2>;
};

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/results"
          element={
            <div className="results-wrapper">
              {loading ? (
                <Spinner />
              ) : (
                <Results results={results} error={error} />
              )}
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="error-button-container">
        <button onClick={handleErrorButtonClick}>Error Button</button>
      </div>
    </div>
  );
};

export default App;
