import MockAdapter from 'axios-mock-adapter';
import responses from './mockData';

function mock(ax) {
  const mo = new MockAdapter(ax, {
    delayResponse: 2500
  });
  mo.onAny().reply(config => {
    const method = config.method.toUpperCase();
    const url = config.url;
    const response = responses[`${method}:${url}`];
    if (!response) return [500, {}];
    return typeof response === 'function' ? response(config.data) : response;
  });
}
export default mock;
