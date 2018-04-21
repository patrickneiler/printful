import axios from 'axios';
import {version} from '../package.json';
import response from './response';
import error from './error';

class Printful {
  static VERSION = version
  static API_URL = 'https://api.printful.com'

  apiKey = null

  client = null

  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: this.constructor.API_URL,
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
        'User-Agent': `Printful.js v${version} (https://github.com/aniftyco/printful)`,
      },
    });
    this.client.interceptors.response.use(response, error);
  }

  request(method, url, params = {}) {
    const options = {method, url};

    if (method === 'get') {
      options.params = params;
    }

    if (['put', 'post', 'patch'].includes(method)) {
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
