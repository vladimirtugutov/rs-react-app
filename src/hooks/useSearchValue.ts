import { useState, useEffect } from 'react';

const useSearchValue = (): {
  searchValue: string;
  setSearchValue: (value: string) => void;
} => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('prevSearchValue') || ''
  );

  useEffect(() => {
    localStorage.setItem('prevSearchValue', searchValue);
  }, [searchValue]);

  return { searchValue, setSearchValue };
};

export default useSearchValue;
