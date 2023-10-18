import { apiCall } from './apiHelper';

export const fetchPopularPeople = async () => {
  try {
    const data = await apiCall({
      method: 'GET',
      url: '/person/popular'
    });
    return data.results
      .filter((person: any) => person.known_for_department === 'Acting')
      .map((person: any) => ({
        id: person.id,
        name: person.name,
        profile_path: person.profile_path
      }));
  } catch (err) {
    console.error('Failed to fetch popular people:', err);
    throw err;
  }
};

export const fetchPopularPeoplePaginated = async (offset = 0, limit = 20) => {
  try {
    const data = await apiCall({
      method: 'GET',
      url: `/person/popular?offset=${offset}&limit=${limit}`
    });
    return data.results
      .filter((person: any) => person.known_for_department === 'Acting')
      .map((person: any) => ({
        id: person.id,
        name: person.name,
        profile_path: person.profile_path
      }));
  } catch (err) {
    console.error('Failed to fetch popular people:', err);
    throw err;
  }
};

export const fetchMovieCreditsForPerson = async (personId: number) => {
  try {
    const data = await apiCall({
      method: 'GET',
      url: `/person/${personId}/movie_credits`,
    });
    // Transform data if needed
    return data.cast;  // Assuming the API returns the data in a `cast` field
  } catch (err) {
    console.error(`Failed to fetch movie credits for person ${personId}:`, err);
    throw err;
  }
};
