import moxios from 'moxios';
import errorInterceptor from '../src/error';
import Printful, {PrintfulError} from '../src';

const printful = new Printful(process.env.PRINTFUL_API_KEY);

describe('Error Interceptor', () => {
  beforeEach(() => moxios.install(printful.client));
  afterEach(() => moxios.uninstall(printful.client));

  test('it should be a function', () => {
    expect(typeof errorInterceptor === 'function').toBe(true);
  });

  test('it should handle an error and return a PrintfulError', async () => {
    moxios.stubRequest(`${Printful.API_URL}/products`, {
      status: 400,
      response: {code: 400, result: 'error'},
    });

    try {
      await printful.get('/products');
    } catch (err) {
      expect(err instanceof PrintfulError).toBe(true);
      expect(err.message).toBe('error');
    }
  });
});
