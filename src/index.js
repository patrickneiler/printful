import axios from 'axios';
import {version} from '../package.json';

class Printful {
  static VERSION = version

  apiKey = null

  client = null

  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: 'https://api.printful.com/',
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
        'User-Agent': `Printful.js v${version} (https://github.com/aniftyco/printful)`,
      },
    });
  }

  request(method, url, params = {}) {
    const options = {method, url};
    const hasParams = Object.keys(params).length > 0;

    if (method === 'get' && hasParams) {
      options.params = params;
    }

    if (['put', 'post', 'patch'].includes(method) && hasParams) {
      options.data = params;
    }

    return this.client.request(options);
  }

  get(url, params = {}) {
    return this.request('get', url, params);
  }

  post(url, params = {}) {
    return this.request('post', url, params);
  }

  put(url, params = {}) {
    return this.request('put', url, params);
  }

  patch(url, params = {}) {
    return this.request('patch', url, params);
  }

  delete(url, params = {}) {
    return this.request('delete', url, params);
  }
}

export default Printful;
