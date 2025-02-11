import React from 'react';

interface TopControlsProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: () => void;
}

const TopControls: React.FC<TopControlsProps> = ({
  searchValue,
  setSearchValue,
  onSearch,
}) => {
  return (
    <div className="top-controls">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default TopControls;
