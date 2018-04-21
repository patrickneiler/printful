import moxios from 'moxios';
import responseInterceptor from '../src/response';
import Printful, {PrintfulError} from '../src';

const printful = new Printful(process.env.PRINTFUL_API_KEY);

describe('Response Interceptor', () => {
  beforeEach(() => moxios.install(printful.client));
  afterEach(() => moxios.uninstall(printful.client));

  test('it should be a function', () => {
    expect(typeof responseInterceptor === 'function').toBe(true);
  });

  test('it should return only the results', async () => {
    const expectedResult = {id:1, type: 'POSTER'};

    moxios.stubRequest(`${Printful.API_URL}/products`, {
      status: 200,
      response: {code: 200, result: [expectedResult]},
    });

    const result = await printful.get('/products');

    expect(result[0]).toBe(expectedResult);
  });
});
