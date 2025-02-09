import React from 'react';
import useSearchValue from './hooks/useSearchValue';

interface TopControlsProps {
  onSearch: (searchTerm: string) => void;
}

const TopControls: React.FC<TopControlsProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useSearchValue();

  const handleSearchButtonClick = () => {
    onSearch(searchValue);
  };

  return (
    <div className="top-controls">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearchButtonClick}>Search Button</button>
    </div>
  );
};

export default TopControls;
