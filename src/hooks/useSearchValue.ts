import { useState, useEffect } from 'react';

const useSearchValue = () => {
  const [searchValue, setSearchValue] = useState(
    () => localStorage.getItem('prevSearchValue') || ''
  );

  useEffect(() => {
    localStorage.setItem('prevSearchValue', searchValue);
  }, [searchValue]);

  return [searchValue, setSearchValue] as const;
};

export default useSearchValue;
