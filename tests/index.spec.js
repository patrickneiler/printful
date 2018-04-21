import Printful, {PrintfulError} from '../src';

describe('Printful Export API', () => {
  test('it should export Printful class as default', () => {
    expect(typeof Printful === 'function').toBe(true);
    expect(Printful.name).toBe('Printful');
  });

  test('it should export PrintfulError as named export', () => {
    expect(typeof PrintfulError === 'function').toBe(true);
    expect(PrintfulError.name).toBe('PrintfulError');
  });
});
