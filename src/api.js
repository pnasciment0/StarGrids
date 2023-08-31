const axios = require('axios');
const config = require('../../config');

const getMovies = async () => {
  // console.log(config.tmdb);
  const response = await axios.get(`${config.tmdb.baseUrl}/discover/movie`, {
    params: {
      api_key: config.tmdb.apiKey,
    },
  });

  return response.data.results;
};

const getActors = async (movieId) => {
  console.log("TEST ACTORS");
  const response = await axios.get(`${config.tmdb.baseUrl}/movie/${movieId}/credits`, {
    params: {
      api_key: config.tmdb.apiKey,
    },
  });

  return response.data.cast;
};

const scrapeTMDB = async () => {
  const movies = await getMovies();

  for (let movie of movies) {
    await insertMovie(movie); // Adjust movie object based on TMDB data
  }
};

module.exports = {
  getMovies,
  getActors,
  scrapeTMDB
};

// scrapeTMDB().catch(console.error);
