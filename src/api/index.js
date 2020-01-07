import axios from 'axios';

const instance = axios.create({
  baseURL: ``,
  withCredentials: true,
  timeout: 10 * 1000
});

const api = {};

instance.interceptors.response.use(
  res => {
    const { data, config } = res;
    if (data && !data.ok) {
      const { url, baseURL, method } = config;
      const msg = `${method}:${url.replace(baseURL, '')}=>${data.message}`;
      // error modal
      return Promise.reject(Error(msg));
    }
    return Promise.resolve(data);
  },
  err => {
    // error modal
    return Promise.reject(err);
  }
);

export default api;
