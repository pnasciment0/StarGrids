require('dotenv').config({ path: '../.env' });

import axios, { Method } from 'axios';
import config from '../config';

interface ApiCallOptions {
  method: Method;
  url: string;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

const apiCall = async ({ method, url, params, data }: ApiCallOptions) => {
  const bearerToken = process.env.TMDB_BEARER_TOKEN;
  console.log(`API Token is: ${process.env.TMDB_BEARER_TOKEN}`);
  const options = {
    method,
    url: `${config.tmdb.baseUrl}${url}`,
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'accept': 'application/json'
    },
    params: { language: 'en-US', page: 1, ...params },
    data
  };
  const response = await axios(options);
  return response.data;
};

export { apiCall };
