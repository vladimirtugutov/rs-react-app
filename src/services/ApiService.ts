const BASE_URL = 'https://swapi.dev/api';

export const getResults = async (searchTerm = '') => {
  try {
    const searchQuery = searchTerm.trim() ? `&search=${searchTerm.trim()}` : '';
    const response = await fetch(`${BASE_URL}/people/?page=1${searchQuery}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
