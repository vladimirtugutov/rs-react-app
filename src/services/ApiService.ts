export const getResults = async (searchTerm = '', page = 1) => {
  try {
    const searchQuery = searchTerm ? `&search=${searchTerm}` : '';
    const res = await fetch(
      `https://swapi.dev/api/people/?page=${page}${searchQuery}`
    );
    const data = await res.json();

    return {
      results: data.results || [],
      totalPages: Math.ceil((data.count || 0) / 10),
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getCharacterDetails = async (id: string) => {
  try {
    const res = await fetch(`https://swapi.dev/api/people/${id}/`);
    if (!res.ok) {
      throw new Error(`Character not found (ID: ${id})`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error;
  }
};
