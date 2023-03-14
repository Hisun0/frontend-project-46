import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const checkFormat = (diff, format) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error('Unknown format!');
  }
};

export default checkFormat;
