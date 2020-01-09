import axios from 'axios';
import query from '@/utils/Others/query';

if (process.env.VUE_APP_CDN !== 'true' && query.mock) {
  const mock = require('./mock/mock').default;
  mock(axios);
}

const instance = axios.create({
  baseURL: ``,
  withCredentials: true,
  timeout: 10 * 1000
});

function handleApi(promise) {
  return promise
    .then(res => [null, res])
    .catch(err => {
      // error modal
      console.log(err);
      return [err, null];
    });
}

const api = {
  postTest({ id, name }) {
    return handleApi(instance.post('/test', { id, name }));
  },
  getTest({ id }) {
    return handleApi(instance.get('/test', { params: { id } }));
  }
};

instance.interceptors.response.use(
  res => {
    const { data, config } = res;
    if (data && !data.ok) {
      const { url, baseURL, method } = config;
      const msg = `${method}:${url.replace(baseURL, '')}=>${data.message}`;
      return Promise.reject(Error(msg));
    }
    return Promise.resolve(data);
  },
  err => {
    return Promise.reject(err);
  }
);

export default api;
