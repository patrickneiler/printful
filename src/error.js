import Promise from 'bluebird';
import PrintfulError from './printful-error';

export default (error) => {
  return Promise.reject(new PrintfulError(error.response.data.result));
}
