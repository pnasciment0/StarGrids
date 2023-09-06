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