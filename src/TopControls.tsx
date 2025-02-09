import React, { useState } from 'react';

interface TopControlsProps {
  onSearch: (searchTerm: string) => void;
}

const TopControls: React.FC<TopControlsProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('prevSearchValue') || ''
  );

  const handleSearchButtonClick = () => {
    localStorage.setItem('prevSearchValue', searchValue);
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
