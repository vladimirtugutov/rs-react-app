import React from 'react';
import { Link } from 'react-router-dom';
import useSearchValue from './hooks/useSearchValue';

interface TopControlsProps {
  onSearch: (searchTerm: string) => void;
}

const TopControls: React.FC<TopControlsProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useSearchValue();

  return (
    <div className="top-controls">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Link to="/results">
        <button onClick={() => onSearch(searchValue)}>Search Button</button>
      </Link>
    </div>
  );
};

export default TopControls;
