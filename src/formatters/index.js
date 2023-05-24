import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (diff, format) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    default:
      return stylish(diff);
  }
};

export default formatter;
