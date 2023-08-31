import axios, { Method } from 'axios';
import config from '../../config';

interface ApiCallOptions {
  method: Method;
  url: string;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

const apiCall = async ({ method, url, params, data }: ApiCallOptions) => {
  const options = {
    method,
    url: `${config.tmdb.baseUrl}${url}`,
    params: { api_key: config.tmdb.apiKey, ...params },
    data,
  };
  const response = await axios(options);
  return response.data;
};

export { apiCall };
